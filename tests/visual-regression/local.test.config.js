const config = require("./test.config");

const baseURL = `http://localhost:3000/`;

const queryParams =
  "?" +
  new URLSearchParams({
    debugAnim: "instant",
    publishHost: "https://publish-p81252-e700817.adobeaemcloud.com",
    endpoint: "graphql/execute.json/sample-wknd-app/homepage",
  }).toString();

// add pages you want tested here:
const pagesToTest = [
  "",
  // "desktop",
  // "mobile",
  // "externalDev",
];
const selectorsToCapture = [
  "#intro",
  "#intro2",
  "#outdoorPassion",
  "#intoTheNature",
  "#intoTheNature2",
  "#upToTheSky",
  ".pin-spacer-reference",
];

const scenarioBuilder = (config, simpleScenarios, advancedScenarios) => {
  const output = advancedScenarios;

  simpleScenarios.forEach(url => {
    const name = url || "index";

    output.push({
      label: name,
      url: config.baseURL + url + config.queryParams,
      readySelector: "#upToTheSky",
      selectors: selectorsToCapture,
      selectorExpansion: true,
    });
  });

  return output;
};

// add advanced tests here:
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
  {
    label: "mobile-nav",
    url: baseURL + queryParams,
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
    clickSelectors: ["#mobile-nav-button"],
  },
  // possible values
  // {
  //   label: "",
  //   url: ``,
  //   cookiePath: "",
  //   referenceUrl: "",
  //   readyEvent: "",
  //   readySelector: "",
  //   delay: 0,
  //   hideSelectors: [],
  //   removeSelectors: [],
  //   hoverSelector: "",
  //   clickSelector: "",
  //   postInteractionWait: 0,
  //   selectors: [],
  //   selectorExpansion: true,
  //   expect: 0,
  // },
];
const scenarios = scenarioBuilder({ config, baseURL, queryParams }, pagesToTest, advancedScenarios);
module.exports = {
  ...config,
  scenarios,
};
