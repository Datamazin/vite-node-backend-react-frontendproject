# Azure Static Web Apps Deployment

This project is configured for Azure Static Web Apps deployment with:

## Project Structure
- `/client` - React frontend (Vite)
- `/api` - Azure Functions backend (Node.js)
- `/server` - Legacy Express server (for local dev reference only)

## Local Development

### Option 1: Using Azure Functions (Recommended for testing production setup)

1. **Install Azure Functions Core Tools**
   ```powershell
   npm install -g azure-functions-core-tools@4
   ```

2. **Start the API**
   ```powershell
   cd api
   func start
   ```
   API runs on: http://localhost:7071

3. **Start the frontend** (in another terminal)
   ```powershell
   cd client
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

### Option 2: Using Express Server (Legacy)
Use the old setup with the Express server in `/server` folder.

## Deployment to Azure

1. **Create an Azure Static Web App** in the Azure Portal

2. **Add the deployment token** to your GitHub repository secrets:
   - Go to your repo Settings → Secrets and variables → Actions
   - Add a new secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Paste the deployment token from Azure

3. **Push to main branch** - The GitHub Actions workflow will automatically deploy

## API Endpoints

- `/api/fruits` - GET - Returns a list of fruits

## Configuration Files

- `staticwebapp.config.json` - Azure Static Web Apps configuration
- `.github/workflows/azure-static-web-apps.yml` - GitHub Actions deployment workflow
- `api/host.json` - Azure Functions host configuration
- `api/local.settings.json` - Local development settings
