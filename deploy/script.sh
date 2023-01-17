# Prerequisites

# Install Netlify CLI
# npm install netlify-cli -g

# Set the following environment variables in your terminal settings
# NETLIFY_AUTH_TOKEN = <authentication token>
# NETLIFY_SITE_ID = <site id where to deploy>

# Run in project root:
# <npm run deploy> - If you want to deploy the app to a non-production link, e.g https://62ff59a019923a6f7aec439d--prismatic-panda-c194c0.netlify.app/.
# <npm run deploy prod> - If you want to deploy the app to the production link https://prismatic-panda-c194c0.netlify.app/.

# If case of permission issues, run <chmod +x deploy/script.sh> at the root of the project.

if npm run build; then
  echo "Build created successfully"
  netlify link
  if [ "$1" = "prod" ]; then
    netlify deploy --prod
  else
    netlify deploy
  fi
else
  echo "Build failed, cannot be deployed"
fi