# Deploying the Food Menu theme to Hostinger

The GitHub Actions workflow at `.github/workflows/deploy-hostinger.yml` syncs this theme to the existing WordPress theme directory over SSH/rsync. It runs on pushes to `main`. A manual workflow run defaults to a dry run. The workflow does not delete remote files.

## 1. Enable SSH access in Hostinger

In hPanel, open the website dashboard, find **SSH Access**, and enable it. Copy the SSH host/IP, username, and host-key fingerprint shown there. Hostinger shared/cloud SSH commonly uses port `65002`; this workflow uses that port.

SSH access depends on the hosting plan. If the SSH Access page is unavailable on your plan, this workflow cannot connect until you enable SSH or switch to another deployment method.

## 2. Add a deploy key

Generate a dedicated Ed25519 key pair on your computer:

```sh
ssh-keygen -t ed25519 -C "github-actions-foodmenu" -f foodmenu-hostinger-deploy
```

Add the contents of `foodmenu-hostinger-deploy.pub` as an SSH key in Hostinger. Never add the private key to the repository.

Add these repository secrets in GitHub under **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `HOSTINGER_SSH_HOST` | Hostinger SSH host/IP from hPanel |
| `HOSTINGER_SSH_USER` | SSH username from hPanel |
| `HOSTINGER_SSH_PRIVATE_KEY` | Full contents of `foodmenu-hostinger-deploy` (private key) |
| `HOSTINGER_KNOWN_HOSTS` | Verified known-hosts line for Hostinger |
| `HOSTINGER_DEPLOY_PATH` | Absolute path to this theme, ending in `/wp-content/themes/foodmenu` |

To create the `HOSTINGER_KNOWN_HOSTS` value, run `ssh-keyscan -p 65002 HOSTINGER_HOST` on your computer, then verify its fingerprint against the fingerprint displayed in hPanel before saving its output as the secret. If your SSH port differs, update `HOSTINGER_SSH_PORT` in the workflow.

To find `HOSTINGER_DEPLOY_PATH`, connect to Hostinger over SSH and run `pwd` from the existing `foodmenu` theme directory. The path must end with `/wp-content/themes/foodmenu`; the workflow rejects other target paths.

## 3. Push and deploy

Push the repository to GitHub and add the secrets above. A push to `main` uploads changed and new theme files. To preview a deployment, open **Actions → Deploy WordPress theme to Hostinger → Run workflow** and leave **dry_run** enabled. Turn it off for an actual manual deployment.

This workflow deploys theme files only. It does not migrate the WordPress database, media library, plugins, or settings.
