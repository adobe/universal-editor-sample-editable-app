module.exports = {
  id: "test_default",
  fileNameTemplate: "{scenarioLabel}_{selectorLabel}_{selectorIndex}_{viewportLabel}",
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
    {
      label: "ipad-pro",
      width: 1024,
      height: 1366,
    },
    {
      label: "laptop",
      width: 1600,
      height: 900,
    },
    {
      label: "desktop",
      width: 1920,
      height: 1080,
    },
  ],
  onBeforeScript: "playwright/onBefore.js",
  onReadyScript: "playwright/onReady.js",
  scenarioLogsInReports: false,
  misMatchThreshold: 0.0,
  requireSameDimensions: false,
  paths: {
    bitmaps_reference: "tests/visual-regression/test_data/bitmaps_reference",
    bitmaps_test: "tests/visual-regression/test_data/bitmaps_test",
    engine_scripts: "tests/visual-regression/test_scripts/engine_scripts",
    html_report: "tests/visual-regression/test_data/html_report",
    ci_report: "tests/visual-regression/test_data/ci_report",
  },
  report: ["browser"],
  engine: "playwright",
  engineOptions: {
    args: ["--no-sandbox"],
  },
  asyncCaptureLimit: 5,
  // asyncCaptureLimit: 1,
  asyncCompareLimit: 50,
  resembleOutputOptions: {
    errorColor: {
      red: 255,
      green: 0,
      blue: 255,
    },
    errorType: "movement",
    transparency: 0.3,
    ignoreAntialiasing: true,
    usePreciseMatching: true,
  },
  debug: false,
  // Headless / Headed mode, caution: snapshots will be slightly different
  debugWindow: false,
  // debugWindow: true,
};
