import AEMHeadless from "@adobe/aem-headless-client-js";

export const scrollToId = id => {
  if (!id.startsWith("#")) {
    return;
  }
  const element = document.getElementById(id.substring(1));
  if (!element) {
    return null;
  }
  const boundingBox = element.getBoundingClientRect();
  window.scrollBy({
    top: boundingBox.top,
    behavior: "smooth",
  });
};

const tryFetch = async (AEMHeadless, host, endpoint, variation, setState, isAuthor) => {
  try {
    AEMHeadless.serviceURL = host + "/";

    // get data from AEM graphql call at endpoint, causes error if fetch fails
    const response = await AEMHeadless.runPersistedQuery(
      endpoint,
      isAuthor ? { variation: variation, timestamp: Date.now() } : { variation: variation },
      { credentials: "include" }
    );

    setState(response.data.pageByPath.item);
    return isAuthor ? "author" : true;
  } catch (error) {
    // returns false if the fetch fails, will try next host
    return false;
  }
};

const getData = async (variation, setStates, hostConfig, AEMHeadless) => {
  const { setData, setIsAuthorVersion, setFetchError, setCustomHost } = setStates;
  // tryFetch() will return a truthy value if the fetch is successful
  let fetchWasSuccessful = null;

  const arr = [
    { host: hostConfig.authorHost, isAuthor: true },
    { host: hostConfig.publishHost, isAuthor: false },
    { host: hostConfig.fallbackHost, isAuthor: false },
  ];

  for (let i = 0; i < arr.length; i++) {
    const { host, isAuthor } = arr[i];
    if (!host) {
      continue;
    }
    setCustomHost(host);
    fetchWasSuccessful = await tryFetch(AEMHeadless, host, hostConfig.endpoint, variation, setData, isAuthor);
    if (fetchWasSuccessful) {
      break;
    }
  }

  // if no fetch was successful, set error state
  if (fetchWasSuccessful === false) {
    setFetchError({ type: "publish", url: hostConfig.publishPath });
  }
  // if the author host was successful change the state to render the page in author view
  if (fetchWasSuccessful === "author") {
    setIsAuthorVersion(true);
  }
};

export const fetchAndSetData = (hostConfig, setStates, fetchVariations) => {
  // initializing AEM headless here for later
  const aemHeadlessClient = new AEMHeadless({ serviceUrl: "" });

  // get queryparams and replace with default if it's not present
  const searchParams = new URLSearchParams(window.location.search);
  const author = searchParams.get("authorHost");
  if (author) {
    const authorHost = new URL(author);
    hostConfig.authorHost = `${authorHost.protocol}//${authorHost.host}${authorHost.port ? ":" + authorHost.port : ""}`;
  }

  const publish = searchParams.get("publishHost");
  if (publish) {
    const publishHost = new URL(publish);
    hostConfig.publishHost = `${publishHost.protocol}//${publishHost.host}${
      publishHost.port ? ":" + publishHost.port : ""
    }`;
  }

  let endpoint = searchParams.get("endpoint");
  if (endpoint) {
    if (endpoint.startsWith("/")) {
      endpoint = endpoint.slice(1);
    }
    if (endpoint.endsWith("/")) {
      endpoint = endpoint.slice(0, -1);
    }
    hostConfig.endpoint = endpoint;
  }

  fetchVariations.forEach(fetchVariation => {
    getData(
      fetchVariation.variationName,
      { setData: fetchVariation.setData, ...setStates },
      hostConfig,
      aemHeadlessClient
    );
  });
};

export const getWkndAppUrl = (queryParams) => {
  const wkndAppBaseUrl = "https://ue-remote-app.adobe.net/"
  if (Object.keys(queryParams).length) {
    const params = [];
    for (let param in queryParams) {
      params.push([param, queryParams[param]]);
    }
    let allQueryParams = params.reduce(
        (accumulator, currentValue, currentIndex) =>
            accumulator + `${currentValue[0]}=${currentValue[1]}${currentIndex !== params.length - 1 ? "&" : ""}`,
        `?`,
    );
    return `${wkndAppBaseUrl}${allQueryParams}`;
  }
  return `${wkndAppBaseUrl}`;
}

