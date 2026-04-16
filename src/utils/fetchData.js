import { getSearchParamsForHashRouting } from "./commons";

export const fetchData = async (path) => {
    const url = `${getAuthorHost()}/${path.split(":/")[1]}.infinity.json`;
    
    const token = import.meta.env.VITE_AEM_ACCESS_TOKEN;
    const headers = {
        "X-Aem-Affinity-Type": "api"
    };
    
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const data = await fetch(url, { 
        headers, 
        credentials: "include" 
    });
    const json = await data.json();
    return json;
};

export const getAuthorHost = () => {
    const searchParams = getSearchParamsForHashRouting();
    if (searchParams.has("authorHost")) {
        return searchParams.get("authorHost");
    } else {
        // return "https://localhost:8443";
        return "https://author-p117303-e1695777.adobeaemcloud.com";
        // return "https://author-p7452-e12433.adobeaemcloud.com";
    }
}

export const getImageURL = (obj) => {
    if (obj === null || obj === undefined) {
        return undefined;
    }

    if (typeof obj === "string") {
        if (obj.startsWith("https://")) {
            return obj;
        }
        return `${getAuthorHost()}${obj}`;
    }

    if (obj._authorUrl !== undefined) {
        return obj._authorUrl;
    }

    if (obj.repositoryId !== undefined && obj.assetId !== undefined) {
        return `https://${obj.repositoryId}/adobe/assets/${obj.assetId}`;
    }

    if (obj._path !== undefined) {
        return `${getAuthorHost()}${obj._path}`;
    }

    return undefined;
}

export const getProtocol = () => {
    const searchParams = getSearchParamsForHashRouting();
    if (searchParams.has("protocol")) {
        return searchParams.get("protocol");
    } else {
        return "aem";
    }
}

export const getService = () => {
    const searchParams = getSearchParamsForHashRouting();
    if (searchParams.has("service")) {
        return searchParams.get("service");
    }
    // return "https://localhost:8000";
    return null;
}
