import { getSearchParamsForHashRouting } from "./commons";

export const fetchData = async (path) => {
    const url = `${getAuthorHost()}/${path.split(":/")[1]}.infinity.json`;
    
    const token = process.env.NEXT_PUBLIC_AEM_ACCESS_TOKEN;
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
        return "/aem-proxy";
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
