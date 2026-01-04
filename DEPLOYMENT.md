# YooVee Automated Deployment Guide

This repository is configured for **automatic deployment** to CrazyDomains hosting via GitHub Actions.

## How It Works

Every time you push to the `main` or `master` branch, GitHub Actions automatically:
1. Checks out your code
2. Uploads changed files to CrazyDomains via FTP
3. Your live site updates within 1-2 minutes

## Setup Instructions

### 1. Get Your FTP Credentials from CrazyDomains

1. **Login**: Go to https://www.crazydomains.com.au/members/
2. **Access cPanel**: Navigate to your hosting control panel for yoovee.com.au
3. **Find FTP Details**: Look for "FTP Accounts" or "FTP Access" in cPanel
4. **Note these details**:
   - **FTP Server**: Usually `ftp.yoovee.com.au` or similar
   - **FTP Username**: Your cPanel username or FTP account username
   - **FTP Password**: Your FTP password
   - **Server Directory**: Usually `/public_html` or `/public_html/yoovee.com.au`

### 2. Add Secrets to GitHub

1. **Go to your GitHub repository**: https://github.com/m4cd4r4/yoovee-store
2. **Click Settings** (top menu)
3. **Navigate to**: `Secrets and variables` → `Actions` (left sidebar)
4. **Click "New repository secret"** and add these 4 secrets:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `FTP_SERVER` | Your FTP hostname | `ftp.yoovee.com.au` |
| `FTP_USERNAME` | Your FTP username | `yoovee@yoovee.com.au` |
| `FTP_PASSWORD` | Your FTP password | `YourSecurePassword123` |
| `FTP_SERVER_DIR` | Remote directory path | `/public_html/` |

**Important Notes:**
- The `FTP_SERVER_DIR` should end with a `/` (e.g., `/public_html/`)
- If yoovee.com.au is in a subdirectory, use `/public_html/subdirectory/`
- Never commit these credentials to your code - they're stored securely in GitHub

### 3. Test the Deployment

Once secrets are configured:

1. **Make a small change** to test (e.g., edit README.md)
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```
3. **Watch the deployment**:
   - Go to: https://github.com/m4cd4r4/yoovee-store/actions
   - You'll see the workflow running
   - Click on it to see live progress
   - Should complete in 1-3 minutes

4. **Check your live site**: https://yoovee.com.au (refresh, clear cache if needed)

## Workflow Details

**File**: `.github/workflows/deploy.yml`

**What gets deployed**:
- All HTML, CSS, JS files
- Images, fonts, and other assets
- `server.js` (if you have Node.js hosting)

**What doesn't get deployed** (excluded):
- `.git` files and folders
- `node_modules/`
- `.env` (secrets)
- `package.json`, `package-lock.json`
- README and documentation
- `.github/` workflow files

## Deploying the Current Redesign

To deploy the Minimalist Scandinavian redesign that's currently in your repo:

1. **Set up the GitHub Secrets** (step 2 above)
2. **Push a commit** (or just re-push):
   ```bash
   git commit --allow-empty -m "Deploy redesign to production"
   git push origin main
   ```
3. **Watch it deploy** at https://github.com/m4cd4r4/yoovee-store/actions
4. **Live site updates** at https://yoovee.com.au

## Troubleshooting

### Deployment fails with "Authentication failed"
- Double-check your `FTP_USERNAME` and `FTP_PASSWORD` in GitHub Secrets
- Verify FTP access works by testing with FileZilla or another FTP client

### Deployment succeeds but site doesn't update
- Check the `FTP_SERVER_DIR` is correct (try `/public_html/` vs `/public_html`)
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Cloudflare cache may need clearing (if using Cloudflare CDN)

### Files uploaded to wrong location
- Adjust `FTP_SERVER_DIR` in GitHub Secrets
- Common paths: `/public_html/`, `/httpdocs/`, `/www/`, `/domains/yoovee.com.au/public_html/`

## Backend (Node.js) Hosting

**Note**: The `server.js` file (Stripe backend) requires **Node.js hosting** on CrazyDomains.

- **Check if CrazyDomains supports Node.js**: Not all shared hosting plans do
- **If not supported**: You may need to:
  - Upgrade to a VPS plan, OR
  - Move the backend to a free Node.js host (Vercel, Railway, Render)
  - Keep frontend on CrazyDomains, backend elsewhere (requires CORS setup)

## Questions?

See the main [README.md](README.md) for project documentation.

---

**Status**: ✅ Automated deployment configured
**Last Updated**: January 2026
