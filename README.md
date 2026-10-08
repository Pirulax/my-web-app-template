### Setup

##### Git Config

Include the `.gitconfig` file to your git config (Run in project root directory):

```sh
git config --local include.path ../.gitconfig
```

##### Env files

Create the appropriate `.env` files in the project root, eg.:

- `.env.dev.local`
- `.env.prod.local`

#### Compose files

- Find & replace all instances of `my-web-app-template` to your project's name

#### Create images & run

Use this command to run docker-compose to create & run the (dev) containers

```sh
./compose.sh dev build && ./compose.sh dev watch
```

Use `prod` instead of `dev` to run the `prod`(uction) version

### Setup Komodo environment and deployment webhook

This template is meant to be used with Komodo to allow for CD (continous deployment).
To add this project to Komodo do the following:

- Repos -> Add Repository
- Syncs -> Add Sync with file `stack.toml`
- Stacks -> Check force deploy & copy Webhook URL
- GitHub -> Settings -> Secrets and variables -> Actions:
  - Add webhook secret as SECRET (copied from Komodo config) as `DEPLOY_WEBHOOK_SECRET`
  - Add the webhook URL as VARIABLE as `DEPLOY_WEBHOOK_URL`
- Profit

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

### Updating

To update run: `./update.sh minor && ./update.sh latest`
