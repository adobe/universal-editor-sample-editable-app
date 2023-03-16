# Adobe Sparkle

Thank you for your interest in Adobe’s products and services! The images in this demo website are from [Adobe Stock](https://stock.adobe.com/) and are Third Party Material as defined in the Demo Asset Additional Terms at [https://www.adobe.com/legal/terms.html](https://www.adobe.com/legal/terms.html).  If you want to use an Adobe Stock image for other purposes beyond viewing this demo website, such as featuring it on a website, or in marketing materials, you can purchase a license on [Adobe Stock](https://stock.adobe.com/).

By default the app will connect to https://publish-p7452-e12433.adobeaemcloud.com. If you wish to connect to another AEM instance you can do so by setting the following query parameters:
```
?authorHost=https://author-p7452-e12433.adobeaemcloud.com
&publishHost=https://publish-p7452-e12433.adobeaemcloud.com
&endpoint=graphql/execute.json/sample-wknd-app/homepage
```

>Note that for an author host to work, you must first login to the AEM environment within another tab.

If connecting to the author host and publish host fails, the app will fallback to: https://publish-p7452-e12433.adobeaemcloud.com.

## Content Fragment Structure

### *Pages*
Pages contain an array of Panels

### *Panels*
Panels contain an array called layers, within you can have image layers, text layers, or shoppable moments.

Panels also have a background, this can contain an image, video or just a solid color.

Panels also have a dark-mode setting, an ID and an active menu item. (this should match the ID of a menu item, this will control which one isn't clickable & is active on the current panel.)

> IDs are important to add as they are the best way to apply animations to something, additionally they are needed for menu navigation

Finally panels also have an animation JSON object that contains two properties: `timelineAnimationSettings` that contains a few options, and `timelineAnimations`, an array that contains slightly altered GSAP animation objects.

### *Image Layer / Background Layer*
Image layers contain an image, along with some style options like the anchor point or the fit setting.
```JSONC
"altText": {
  "plaintext": "rocks1"
},
"id": "rocks1", // ID for the <img />
"layerId": "layer-rocks1",  // ID for the layer
"basePosition": "bottom-left",
"fit": "contain",
"overflow": false,  // allows image to overflow over the panel
"forceLoad": false  // won't allow image to be lazy loaded
```
> Using layerID is usually more intuitive for creating animations, because the image layer will have the same dimensions as the panel.

> Any panel images beyond the first on a page are set to lazy load, this can be overwritten.

### *Text Layer*
Text layers have two ways to place text. In a column or on the left or right side. Menus can also be put inside the L/R content arrays.

Each text layer can have `text items` in all three content arrays at the same time (column, left, right).

```JSONC
// example text item
"type": "h3",
"id": null,
"content": {
  "plaintext": "get in gear"
},
"styles": [
  "yellowBox",
  "uppercase"
]
```
The text layer has a few settings options. `textPosition` and `noPadding` only applies to the column
```JSONC
// text layer options
"id": "layer-button",
"textPosition": "bottom-center",
"noPadding": true,
```





## Getting Started

This is a next js app that will render panels that allow for [animation timelines](https://greensock.com/docs/v3/GSAP/Timeline) powered by [GSAP](https://greensock.com/gsap/). The app is setup to work entirely on the client-side with the ability to specify your own author publish URLs along with a custom endpoint. As long as you are using the correct Content Fragments and graphql call.

To get started install all dependencies
```
npm i
```

Afterward you can run the app with:
```
npm run dev
```

Without any queryparams our app will default to the following fallback URL: https://publish-p7452-e12433.adobeaemcloud.com
<!-- ```json
"authorHost": "https://author-p7452-e12433.adobeaemcloud.com"
"publishHost": "https://publish-p7452-e12433.adobeaemcloud.com"
"endpoint": "sample-wknd-app/homepage"
``` -->

To use custom URLs simply set these queryparams with your URL, if there are any missing parameters the default will be used in its place.

example URL: http://localhost:3000/?authorHost=https://author-pYOUR-eHOST.adobeaemcloud.com&publishHost=https://publish-p7452-e12433.adobeaemcloud.com&endpoint=graphql/execute.json/GRAPHQL/ENDPOINT

## Host priority

In order for the **author host** to work, you must login as an author within another tab first, otherwise it will not work.

The app will first try to use the author host, if it could not fetch data from it, it will try using the publish host.

When both hosts fail to work, the app will fallback to https://publish-p7452-e12433.adobeaemcloud.com. 

## Visual Regression Testing

The config files for adjusting the visual regression testing is in the `./tests/visual-regression/` folder. We use [BackstopJS](https://github.com/garris/BackstopJS) to take screenshots of the panels created in out app

### Running Tests
Make sure all dev dependencies are installed
```
npm i
```

We did not include the reference images into this git repository. To create a set of reference images run the following command:

```
npx backstop reference --config=./tests/visual-regression/local.test.config.js
```

Once we have a reference run a test with the following command:
```
npx backstop test --config=./tests/visual-regression/local.test.config.js
```

If you want to create/update the reference images with the results of the last test use:
```
npx backstop approve --config=./tests/visual-regression/local.test.config.js
```

### Adjusting Tests

Most of what you will want to adjust can be found in `test.config.js` and `local.test.config.js`. In `test.config.js` you will find global [BackstopJS Settings](https://github.com/garris/BackstopJS#using-backstopjs), most scenario-level settings can also be added here, and they will be used for every scenario including viewports.

> A `Scenario` is the browser instance that is created for the test.

> For help with debugging, you can change the `debugWindow` in `test.config.js` to `true`, this will open the browser as a window so you can see what is going wrong! **Caution! Make sure you have `asyncCaptureLimit` set to `1` so only one browser instance opens at a time.**

`local.test.config.js` has the individual scenario settings and creates them. 

Here you can change base URL & queryparams. Make sure you have the `debugAnim` param set to `instant` to make sure animations happen instantly for the screenshots!

```js
const baseURL = "http://localhost:3000/";

const queryParams = "?" + new URLSearchParams({
    debugAnim: "instant",
    publishHost: "https://publish-p7452-e12433.adobeaemcloud.com",
    endpoint: "graphql/execute.json/sample-wknd-app/homepage",
  }).toString();
```

To add more pages/paths to run the test on, add them to the `pagesToTest` array 
```js
const pagesToTest = [
  "",
  // "desktop",
  // "mobile",
];
```

With the `selectorToCapture` array you can specify what to capture, in our case we capture every panel in the page, as well as the `.pin-spacer-reference`, created to capture the 2nd half of the last panel. 

You can also use `viewport` and `document`. Document will screenshot the entire page, this can be great for reducing the amount of images, but **it is not recommended with advanced animations!**

The `scenario-builder` function will then create a scenario for every page and default viewport. These scenarios, along with any advanced scenarios you created will then be used by BackstopJS to create screenshots and test them.
```js
const selectorsToCapture = [
  "#intro",
  "#intro2",
  "#outdoorPassion",
  "#intoTheNature",
  "#intoTheNature2",
  "#upToTheSky",
  ".pin-spacer-reference"
];
```

> A `.pin-spacer-reference` is created automatically when there are any `.pin-spacers` created by GSAP animations using the [Scrolltrigger Pin feature](https://greensock.com/docs/v3/Plugins/ScrollTrigger), this allows you to easily screenshot the end of a pinned animation!

If you need to create a unique scenario, you can use the `advancedScenarios` array to add them. These are often used for testing click or hover actions. **Remember to have a `postIneractionWait` property that at least as long as any CSS animations that will occur**

```js
const advancedScenarios = [
  {
    label: "mobile-menu",
    url: baseURL + queryParams,
    // wait for this long after clicking menu button
    postInteractionWait: 400,
    readySelector: "#upToTheSky",
    selectors: ["viewport"],
    viewports: [
      {
        label: "mobile",
        width: 540,
        height: 1200,
      },
      {
        label: "ipad-air",
        width: 820,
        height: 1180,
      },
    ],
    clickSelectors: ["#mobile-menu-button"],
  },
];
```

For more information on how BackstopJS configs can be configured check out the [GitHub Page](https://github.com/garris/BackstopJS#using-backstopjs).
