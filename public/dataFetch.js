import fetchConfig from "./initializeQueries.js";

function fallbackFetch(fetchConfig, variation, resolve) {
  fetch(`${fetchConfig.fallbackHost}/${fetchConfig.endpoint};variation=${variation}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      window.customHost = fetchConfig.fallbackHost;
      resolve(data);
    })
    .catch(error => {
      console.log("fallback host fetch failed");
      resolve(null);
    });
}

function publishFetch(fetchConfig, variation, resolve) {
  if (!fetchConfig.publishHost) {
    console.log("No publish host specified, using fallback.")
    fallbackFetch(fetchConfig, variation, resolve)
    return
  }
  fetch(`${fetchConfig.publishHost}/${fetchConfig.endpoint};variation=${variation}`)
    .then(response => response.json())
    .then(data => {
      window.customHost = fetchConfig.publishHost;
      resolve(data);
    })
    .catch(error => {
      console.log("Publish host failed, using fallback.");
      fallbackFetch(fetchConfig, variation, resolve);
    });
}

function attemptFetch(fetchConfig, variation, sparkleFetch = false, delay) {
  if (window[variation + "Data"]) {
    return;
  }
  window[variation + "Data"] = new Promise(async (resolve, reject) => {
    if (delay) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    if (!fetchConfig.authorHost && !fetchConfig.publishHost) {
      console.log("No author or publish host specified, using fallback.");
      return fallbackFetch(fetchConfig, variation, resolve);
    }
    if (fetchConfig.authorHost) {
      fetch(
        `${fetchConfig.authorHost}/${fetchConfig.endpoint}${
          sparkleFetch ? `/${variation}.json` : `;variation=${variation}`
        }`,
        !sparkleFetch ? { credentials: "include" } : null
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          window.customHost = fetchConfig.authorHost;
          window.isAuthorHost = true;
          resolve(data);
        })
        .catch(error => {
          console.log("Author host failed, attempting publish host.");
          publishFetch(fetchConfig, variation, resolve);
        });
      } else {
      console.log("No author host specified, using publish host.");
      publishFetch(fetchConfig, variation, resolve);
    }
  });
}

if (window.innerWidth <= 820) {
  attemptFetch(fetchConfig, "mobile");
  attemptFetch(fetchConfig, "desktop", null, 3000);
} else {
  attemptFetch(fetchConfig, "desktop");
  attemptFetch(fetchConfig, "mobile", null, 3000);
}

let preFetchUrl = fetchConfig.fallbackHost;

if (fetchConfig.publishHost) {
  preFetchUrl = fetchConfig.publishHost;
}
if (fetchConfig.authorHost) {
  preFetchUrl = fetchConfig.authorHost;
}

const preconnectLink = document.createElement("link");

preconnectLink.rel = "preconnect";
preconnectLink.crossOrigin = "true";
preconnectLink.href = preFetchUrl;

document.head.appendChild(preconnectLink);

const preconnectBiker = document.createElement("link");

preconnectBiker.rel = "preload";
preconnectBiker.fetchPriority = "high";
preconnectBiker.as = "image";
preconnectBiker.id = "preload-biker";
preconnectBiker.type = "image/webp";
preconnectBiker.href = `${preFetchUrl}/content/dam/sample-wknd-app/en/image-files/biker${
  window.innerWidth <= 820 ? "_m" : ""
}.png/_jcr_content/renditions/${window.innerWidth <= 820 ? "mobile-vertical" : "desktop"}.webp`;

document.head.appendChild(preconnectBiker);
