#!/bin/bash
set -e

# Valid values:
# greatest	Upgrade to the highest version number published, regardless of release date or tag. Includes prereleases.
# latest	Upgrade to whatever the package's "latest" dist-tag points to. When used with --cooldown, falls back to the greatest version that passes the cooldown threshold if the latest is too recent. Use --target "@latest" for strict behaviour that skips the package instead. Excludes prereleases unless --pre is specified.
# minor	Upgrade to the highest minor version without bumping the major version.
# newest	Upgrade to the version with the most recent publish date, even if there are other version numbers that are higher. Includes prereleases.
# patch	Upgrade to the highest patch version without bumping the minor or major versions.
# semver	Upgrade to the highest version within the semver range specified in your package.json.
# @[tag]	Upgrade to the version published to a specific tag, e.g. 'next' or 'beta'.
UPDATE_TARGET=${1:-minor}  # Default to minor updates if no argument is provided

# Constants
COMMIT_MSG_PREFIX="chore(web):"

# Load package.json into memory to avoid multiple reads
PACKAGE_JSON=$(cat package.json 2>/dev/null)

if [ -z "$PACKAGE_JSON" ]; then
    echo "Error: package.json not found or couldn't be read in the current directory."
    exit 1
fi

# Get the current version of a package from package.json, checking all dependency types
get_current_version() {
    local pkg_name="$1"
    echo "$PACKAGE_JSON" | jq -r --arg pkg "$pkg_name" '
        .dependencies[$pkg]
        // .devDependencies[$pkg]
        // .peerDependencies[$pkg]
        // .optionalDependencies[$pkg]
        // .resolutions[$pkg]
        // "(unknown)"
    '
}

# Format a package change (<package name> <from_version> -> <to_version>) for logging and commit messages
format_pkg_change() {
    local pkg_name="$1"
    local to_version="$2"
    local from_version
    from_version="$(get_current_version "$pkg_name")"
    echo "$pkg_name $from_version -> $to_version"
}

# Pre-flight check for clean git tree
if [ -n "$(git status --porcelain)" ]; then
    echo "Error: Git working directory is not clean. Please commit or stash changes."
    exit 1
fi

echo "Scanning for minor and patch updates..."
UPDATES_JSON=$(npx npm-check-updates --target "$UPDATE_TARGET" --jsonUpgraded)

if [ "$UPDATES_JSON" = "{}" ] || [ -z "$UPDATES_JSON" ]; then
    echo "All packages are already up to date!"
    exit 0
fi

# Make sure we're running the latest yarn version
echo "Checking for Yarn package manager updates..."
OLD_YARN_VER=$(yarn --version)
corepack up
NEW_YARN_VER=$(yarn --version)

if [ "$OLD_YARN_VER" != "$NEW_YARN_VER" ]; then
    echo "Upgraded Yarn from $OLD_YARN_VER to $NEW_YARN_VER!"
    git add package.json yarn.lock
    git commit -m "$COMMIT_MSG_PREFIX upgrade Yarn ($OLD_YARN_VER -> $NEW_YARN_VER)"
else
    echo "Yarn is already up to date ($OLD_YARN_VER)."
fi

# Extract unique scopes (e.g., "@mantine", "@babel") from the updates
SCOPES=$(echo "$UPDATES_JSON" | jq -r 'keys[] | select(startswith("@")) | split("/")[0]' | sort -u)

# Track processed packages to avoid double-updating
PROCESSED_PKGS=" "

# Process grouped scoped packages first
for scope in $SCOPES; do
    echo "------------------------------------------------"
    echo "Processing grouped updates for scope: $scope"
    echo "------------------------------------------------"
    
    # Filter JSON for only packages inside this specific scope
    SCOPE_DATA=$(echo "$UPDATES_JSON" | jq --arg scope "$scope" 'with_entries(select(.key | startswith($scope + "/")))')
    
    # Build the Yarn install arguments list (pkg1@ver pkg2@ver ...)
    INSTALL_ARGS=$(echo "$SCOPE_DATA" | jq -r 'to_entries | map("\(.key)@\(.value)") | join(" ")')
    
    if [ -n "$INSTALL_ARGS" ]; then
        # Generate a nicely formatted list of package changes for logging and commit messages, separated by newlines
        CHANGES_MSG=$(echo "$SCOPE_DATA" | jq -r 'to_entries[] | "\(.key)\t\(.value)"' | while IFS=$'\t' read -r pkg ver; do
            [ -n "$pkg" ] && format_pkg_change "$pkg" "$ver"
        done)

        # Print visual log rows formatted nicely with dashes
        echo "$CHANGES_MSG" | sed 's/^/ - /'

        echo "Installing group: $INSTALL_ARGS"
        yarn up $INSTALL_ARGS
        
        git add package.json yarn.lock
        git commit -m "$COMMIT_MSG_PREFIX upgrade ($UPDATE_TARGET) $scope group" -m "$CHANGES_MSG"

        # Mark these packages as processed
        FOR_PROCESSED=$(echo "$SCOPE_DATA" | jq -r 'keys | join(" ")')
        PROCESSED_PKGS="$PROCESSED_PKGS$FOR_PROCESSED "
    fi
done

# Process all remaining standalone/unscoped packages individually
echo "------------------------------------------------"
echo "Processing remaining individual packages..."
echo "------------------------------------------------"
while read -r pkg_string; do
    [ -z "$pkg_string" ] && continue
    pkg_name="${pkg_string%@*}"
    pkg_version="${pkg_string##*@}"
    
    # Skip if this package was already updated in a scope group
    if [[ "$PROCESSED_PKGS" =~ " $pkg_name " ]]; then
        continue
    fi
    
    CHANGE_MSG="$(format_pkg_change "$pkg_name" "$pkg_version")"
    echo "Upgrading standalone package: $CHANGE_MSG..."
    yarn up "$pkg_name@$pkg_version"
    
    git add package.json yarn.lock
    git commit -m "$COMMIT_MSG_PREFIX upgrade ($UPDATE_TARGET) $CHANGE_MSG"
done < <(echo "$UPDATES_JSON" | jq -r 'to_entries[] | "\(.key)@\(.value)"')

echo "🎉 All packages successfully updated and committed!"
