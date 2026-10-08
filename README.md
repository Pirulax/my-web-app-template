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
