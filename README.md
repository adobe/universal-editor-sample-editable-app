# Adobe Universal Editor Sample App (Next.js)

This is a sample Next.js application demonstrating how to integrate and use the Adobe Universal Editor with an AEM headless backend. 

## Local Development with Universal Editor

To run this application locally and edit it using the Universal Editor, follow these steps:

### Prerequisites

1. **AEM Local Instance**: An AEM 6.5 or AEM as a Cloud Service (AEMCS) local SDK instance running locally.
2. **HTTPS Configuration**: AEM must be configured to run on HTTPS (e.g., `https://localhost:8443`).
3. **Content**: Ensure you have the latest WKND Site or the appropriate headless models/content installed on your local AEM instance.
4. **Universal Editor CORS Proxy**: You must install the AEM Universal Editor CORS proxy package (bundle/jar) on your local AEM instance. You can download the latest Universal Editor local proxy package from the [Adobe Software Distribution portal](https://experience.adobe.com/#/downloads/content/software-distribution/en/aem.html). This is required to bypass CORS restrictions when the editor runs locally.

### Environment Configuration

For local development, the application uses the `.env.local` file. Ensure it contains the appropriate variables for your local setup. Example:

```env
NEXT_PUBLIC_AEM_ACCESS_TOKEN="admin:admin"
NEXT_PUBLIC_AEM_HOST="https://localhost:8443"
NEXT_PUBLIC_UE_SERVICE="https://localhost:8000"
NODE_TLS_REJECT_UNAUTHORIZED=0
```

- `NEXT_PUBLIC_AEM_HOST`: Points to your local AEM author instance.
- `NEXT_PUBLIC_AEM_ACCESS_TOKEN`: The credentials (e.g., Basic Auth or Bearer token) needed to fetch content from your local AEM instance.
- `NEXT_PUBLIC_UE_SERVICE`: Points to the local Universal Editor service if you are running it locally.

### Running the App Locally

To start the Next.js development server specifically configured for a local AEM instance:

```bash
npm run dev:local
```

**Note:** The `dev:local` script automatically includes a local CA certificate (`NODE_EXTRA_CA_CERTS=certificates/localhost.pem`) and enables experimental HTTPS in Next.js (`--experimental-https`). This is required to resolve local SSL certificate errors when fetching data from AEM over HTTPS on localhost.

The app will be available at [https://localhost:3000](https://localhost:3000).

### Local Universal Editor Service Proxy

If you are running the Universal Editor service proxy locally, you must create and trust a local certificate before starting the service:

1. **Generate a local certificate:**
   ```bash
   openssl req -x509 -newkey rsa:2048 -keyout key.pem -out certificate.pem -days 365 -nodes -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
   ```
2. **Trust the certificate on your system (macOS):**
   ```bash
   sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain certificate.pem
   ```
3. **Start the local Universal Editor service:**
   ```bash
   node universal-editor-service.cjs
   ```

### Opening in Universal Editor

1. Open the Universal Editor. Ensure your local Universal Editor service proxy is running (e.g., at `https://localhost:8000`).
2. Point the Universal Editor to your local Next.js app URL: `https://localhost:3000`.
3. You can now edit the Next.js application in context. The changes will be pushed back to your local AEM instance at `https://localhost:8443`.

## Available Scripts

In the project directory, you can run:

### `npm run dev:local`
Runs the app in development mode, tailored for localhost. It injects local certificates to bypass SSL connection errors when communicating with local AEM over HTTPS.

### `npm run dev:sandbox`
Runs the app using configurations defined in `.env.sandbox`. Useful when connecting to a remote sandbox AEM environment instead of localhost.

### `npm run build`
Builds the Next.js app for production to the `.next` folder.

### `npm run start`
Starts the built Next.js application in production mode.

### `npm run deploy`
Builds the application and deploys it to GitHub Pages.