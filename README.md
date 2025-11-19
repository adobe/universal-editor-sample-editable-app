# Adobe Universal Editor Sample App

## Using the Sample App
The Sample App is hosted at https://ue-remote-app.adobe.net.
Per Default the content is retrieved and written back to the Adobe Experience Manager as a Cloud Service ( Production ) Demo Environment:

The default settings from [.env](.env) can be overwritten using Query parameters:
* `authorHost`: host to retrieve data from and update content to; default=https://author-p7452-e12433.adobeaemcloud.com
* `service`: Universal Editor Service endpoint; default Universal Editor default
* `protocol`: protocol to use with backend, can be `aem`, `aem65`, `aemcsLegacy`; default: `aem`
* `cors`: defining which cors.js - connection between Universal Editor and application shall be used. Can be `stage` or empty; default `null/empty`. `stage` will use the cors library hosted on stage, else it will use the production version

To retrieve content from another environment add `authorHost` as query parameters, e.g.

[https://ue-remote-app.adobe.net?authorHost=https://author-p7452-e12433.adobeaemcloud.com](https://ue-remote-app.adobe.net?authorHost=https://author-p7452-e12433.adobeaemcloud.com)

Similarly, if running the Universal Editor App on local dev environment, add `authorHost` as query parameters like this:

[https://localhost:3000?authorHost=https://localhost:8443&service=https://localhost:8443/universal-editor](https://localhost:3000?authorHost=https://localhost:8443&service=https://localhost:8443/universal-editor)

## Run locally 

- AEM 6.5 or AEMCS instance
- Latest WKND Content installed on the AEM instance[https://github.com/adobe/aem-guides-wknd/releases/latest](https://github.com/adobe/aem-guides-wknd/releases/latest)
- AEM configured to run on HTTPS [https://experienceleague.adobe.com/en/docs/experience-manager-learn/foundation/security/use-the-ssl-wizard](https://experienceleague.adobe.com/en/docs/experience-manager-learn/foundation/security/use-the-ssl-wizard)
- `Adobe Granite Token Authentication Handler` configured to set `token.samesite.cookie.attr=Partitioned`
- Remove `X-FRAME-Options=SAMEORIGIN` from `Apache Sling Main Servlet`'s `sling.additional.response.headers` attribute if run locally
- Add policy for `https://localhost:3000` to `Adobe Granite Cross-Origin Resource Sharing Policy`. The default `adobe` configuraiton can be used as blueprint if run local copy of the app
- Follow configuration on [https://github.com/maximilianvoss/universal-editor-service-proxy](https://github.com/maximilianvoss/universal-editor-service-proxy) for local development set up
- Open Universal Editor either 
    - under AEM domain for AEMCS, e.g. [https://author-p7452-e12433.adobeaemcloud.com/ui#/aem/universal-editor/canvas/](https://author-p7452-e12433.adobeaemcloud.com/ui#/aem/universal-editor/canvas/) 
    - or on [https://experience.adobe.com/#/aem/editor/canvas/](https://experience.adobe.com/#/aem/editor/canvas/)
- For experience.adobe.com use the `Local Developer Login` to authenticate against your local AEM instance when using a local SDK or AEM 6.5

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [https://localhost:3000](https://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.
Utilize a gulp task to bundle all the JS and CSS files in the static build folder into the single main `index.html` file.
This is useful for having the `index.html` bundle file automatically deployed on `https://ue-remote-app.adobe.net` when pushing new changes on the `main` branch.

This command is executed automatically before each commit by the `pre-commit` script.

## Automatic deployment flow

The application uses the husky package (https://www.npmjs.com/package/husky), for adding a pre-commit script, located in the  `.husky` folder.
The `pre-commit` script will be run before each commit. It will build the project and will add the build bundle from `build/index.html` to the commit.
We expose this bundle to GitHub. This is happening due to the usage of internal artifactory packages (we cannot build the project on a deployment environment).

The flow is that we build the application locally and deploy the bundle through GitHub workflow to https://ue-remote-app.adobe.net, on each PR merged to the `main` branch.

## Manual deployments


 ### Deploy commands
Run in project root:

`npm run deploy` - deploy the app at any point to a non-production link, e.g https://62ff59a019923a6f7aec439d--prismatic-panda-c194c0.netlify.app/.

`npm run deploy prod` - deploy the app to the production link https://ue-remote-app.adobe.net (this is usually not needed, the application is automatically deployed on every PR merged to the `main` branch).
 
