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

### Setup Portainer environment
This template is meant to be used with Portainer to allow for CD (continous deployment)
So, first of all, the repo must be imported:
- 1. The compose file you want to use is `docker-compose/base.yml` + `docker-compose/deployment.yml` (or `local` when running locally)
- 2. Enable `GitOps updates`, and select the `Webhook` option, and copy the URL [And possibly forward it with nginx]
- 3. Set the Portainer webhook URL secret in the repo's secerts (Settings->Security->Secrets and variables, key is `PORTAINER_WEBHOOK_URL`)
- 4. After importing it make sure to set the environment variables properly

### Set up CI/CD
To properly setup ci/cd you must:
- Change the image names from `my-web-app-template` to your app's name in `.github/workflows/docker-ci.yml` and in `docker-compose/deployment.yml`
