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

### Setup Portainer environment
This template is meant to be used with Portainer to allow for CD (continous deployment)
So, first of all, the repo must be imported:
- 1. The compose file you want to use is `docker-compose/base.yml` + `docker-compose/deployment.yml` (or `local` when running locally)
- 2. Enable `GitOps updates`, and select the `Webhook` option, and copy the URL [And possibly forward it with nginx]
- 3. Set `Compose path` to `docker-compose/base.yml`, and add an additional path (Under `Additional paths`): `docker-compose/deployment.yml`
- 4. After importing it make sure to set the environment variables properly

### Set up CI/CD
To properly setup ci/cd you must:
- Make sure `image` in `docker-compose/base.yml` (and others) is correct, eg.: change `ghcr.io/pirulax/my-web-app-template-web:latest` to `ghcr.io/your-name/my-awesome-app-web:latest`
- Set the Portainer webhook URL secret in the repo's secerts (Settings->Security->Secrets and variables, key is `PORTAINER_WEBHOOK_URL`)
