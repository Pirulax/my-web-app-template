### Set up CI/CD
To properly setup ci/cd you must:
- Change the image names from `my-web-app-template` to your app's name in `.github/workflows/docker-ci.yml`
- Set the Portainer webhook URL secret in the repo's secerts (Settings->Security->Secrets and variables) [This webhook URL must be registered through nginx to forward to portainer]
