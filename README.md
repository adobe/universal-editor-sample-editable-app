# Universal Editor Sample App

## Prerequisites 

- AEMCS instance is available
- WKND project is installed on the instance
- CORS enabled on AEM instance for the app
- For local development with editor, ensure app is using *https*


## Setup

- Include [.npmrc](https://github.com/comanV/react-sample-app/blob/prod/.npmrc)

- Install dependencies - ```yarn```

_Note: If facing issues with artifacts, ensure [artifact is accessible](https://artifactory.corp.adobe.com/ui/native/npm-aem-sites-release/@aem-sites/) and if yes, ensure you are authenticated._

```npm login --registry=https://artifactory.corp.adobe.com/artifactory/api/npm/npm-aem-sites-release/ --always-auth```


## Working with the editor

- [Include package](https://github.com/comanV/react-sample-app/blob/c8eb6ab997a926440493e0bf959dbc734203973a/src/index.js#L3) to enable communication between the app and the editor

- Add the AEM instance to be communicated with as a [meta property](https://github.com/comanV/react-sample-app/blob/c8eb6ab997a926440493e0bf959dbc734203973a/public/index.html#L8)

The syntax to be followed is -

```
name="urn:auecon:<name_of_the_mapping" content="<type_of_system>:<system_url>"
```

In this app, we are editing content on an AEM instance -
```
<meta name="urn:auecon:aemconnection" content="aem:https://author-p48068-e243163.adobeaemcloud.com">
```

- Now the fields to be made editable can be instrumented. Multiple samples can be seen across the app.

For eg: [here](https://ue-remote-app-prod.adobe.net/articles/article:aloha-spirits-in-northern-norway), we would like to make the `title` field within the article content fragment editable. For this -

- [Instrument the content fragment](https://github.com/comanV/react-sample-app/blob/c8eb6ab997a926440493e0bf959dbc734203973a/src/components/ArticleDetail.jsx#L65). For this, ensure following props are added to the corresponding element - 

    - `itemscope`
    - `itemtype`: Since this is a CF, you can provide the value `reference`
    - `itemid`: Path to the corresponding CF on AEM. This should also inform the editor of which system the data comes from _(eg: "urn:aemconnection:<path_to_node>" ) where aemconnection is the name given to the mapping on the meta tag_ 

- [Instrument the field to be edited](https://github.com/comanV/react-sample-app/blob/c8eb6ab997a926440493e0bf959dbc734203973a/src/components/ArticleDetail.jsx#L66). Props to be added - 

    - `itemtype`: Type of the field to be edited.For eg `text`
    - `itemprop`: When within a CF, name of the field in the CF to be edited


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

### Prerequisites
Install Netlify CLI

`npm install netlify-cli -g`

Set the following environment variables in your terminal settings (for https://ue-remote-app.adobe.net):

`NETLIFY_AUTH_TOKEN = <authentication token>`

`NETLIFY_SITE_ID = <site id where to deploy>`

 ### Deploy commands
Run in project root:

`npm run deploy` - deploy the app at any point to a non-production link, e.g https://62ff59a019923a6f7aec439d--prismatic-panda-c194c0.netlify.app/.

`npm run deploy prod` - deploy the app to the production link https://ue-remote-app.adobe.net (this is usually not needed, the application is automatically deployed on every PR merged to the `main` branch).
 
If case of permission issues, run `chmod +x deploy/script.sh` at the root of the project.

