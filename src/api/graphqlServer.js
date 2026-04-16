import AEMHeadless from '@adobe/aem-headless-client-nodejs';

// We fall back to a default since `getAuthorHost` used `window.location`.
// On the server, we must rely on env variables for the host.
const AEM_HOST = process.env.NEXT_PUBLIC_AEM_HOST || "https://author-p117303-e1695777.adobeaemcloud.com";
const AEM_TOKEN = process.env.NEXT_PUBLIC_AEM_ACCESS_TOKEN;

const sdk = new AEMHeadless({
  serviceURL: AEM_HOST,
  endpoint: "/content/graphql/global/endpoint.json",
  auth: AEM_TOKEN ? AEM_TOKEN : undefined,
  fetch: fetch
});

export async function fetchPersistedQuery(path, variables = {}) {
  try {
    const response = await sdk.runPersistedQuery(path, variables);
    return { data: response.data, errors: response.errors };
  } catch (error) {
    console.error("Error fetching GraphQL from server:", error);
    return { data: null, errors: [error] };
  }
}
