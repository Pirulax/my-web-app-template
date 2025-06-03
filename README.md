### Setup Portainer environment
This template is meant to be used with Portainer to allow for CD (continous deployment)
So, first of all, the repo must be imported:
- 1. The compose file you want to use is `docker-compose/prod.yml` for production, or `dev`
- 2. Enabvle `GitOps updates`, and select the `Webhook` option, and copy the URL [And possibly forward it with nginx]
- 3. Set the Portainer webhook URL secret in the repo's secerts (Settings->Security->Secrets and variables, key is `PORTAINER_WEBHOOK_URL`)
- 4. After importing it make sure to set the environment variables properly

### Set up CI/CD
To properly setup ci/cd you must:
- Change the image names from `my-web-app-template` to your app's name in `.github/workflows/docker-ci.yml`
