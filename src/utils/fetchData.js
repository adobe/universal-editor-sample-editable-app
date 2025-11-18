const {REACT_APP_DEFAULT_AUTHOR_HOST} = process.env;

export const fetchData = async (path) => {
    const url = `${getAuthorHost()}/${path.split(":/")[1]}.infinity.json`;
    const data = await fetch(url, {headers: {"X-Aem-Affinity-Type": "api"}, credentials: "include"});
    const json = await data.json();
    return json;
};
export const getAuthorHost = () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    if (searchParams.has("authorHost")) {
        return searchParams.get("authorHost");
    } else {
        return REACT_APP_DEFAULT_AUTHOR_HOST;
    }
}

export const getImageURL = (obj) => {
    if (obj === null || obj === undefined) {
        return undefined;
    }

    if (typeof obj  === "string") {
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
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    if (searchParams.has("protocol")) {
        return searchParams.get("protocol");
    } else {
        return "aem";
    }
}

export const getService = () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    if (searchParams.has("service")) {
        return searchParams.get("service");
    }
    return null;
}

