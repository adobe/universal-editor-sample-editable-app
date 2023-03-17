const fetchConfig = {
  sparkle: "https://sparkle-data.vercel.app",
  fallbackHost: "https://publish-p7452-e12433.adobeaemcloud.com",
  authorHost: "https://author-p7452-e12433.adobeaemcloud.com",
  endpoint: "graphql/execute.json/sample-wknd-app/homepage",
};

const searchParams = new URLSearchParams(window.location.search);

const author = searchParams.get("authorHost");
if (author) {
  const authorUrl = new URL(author);
  fetchConfig.authorHost = `${authorUrl.protocol}//${authorUrl.host}${
    authorUrl.port ? ":" + authorUrl.port : ""
  }`;
}

const publish = searchParams.get("publishHost");
if (publish) {
  const publishUrl = new URL(publish);
  fetchConfig.publishHost = `${publishUrl.protocol}//${publishUrl.host}${
    publishUrl.port ? ":" + publishUrl.port : ""
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
  fetchConfig.endpoint = endpoint;
}

export default fetchConfig;
