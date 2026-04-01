/**
 * Helper function to get the first adventure from the response
 * @param {*} response
 */
function getArticle(data) {
	if (data && data.articleList && data.articleList.items) {
		// expect there only to be a single adventure in the array
		if (data.articleList.items.length === 1) {
			return data.articleList.items[0];
		}
	}
	return undefined;
}

/**
 * Returns the query string to use when building hash-routed links.
 * Prefers the query string from the hash (e.g. #/path?foo=bar) so params
 * are not duplicated when they also appear on the main URL.
 */
function getQueryStringForHashRouting() {
	const hash = window.location.hash || "";
	const qIndex = hash.indexOf("?");
	if (qIndex >= 0) {
		return hash.slice(qIndex);
	}
	return window.location.search;
}

/**
 * Same source of truth as {@link getQueryStringForHashRouting}: document search
 * until params live in the hash (HashRouter), then parse the hash query.
 */
function getSearchParamsForHashRouting() {
	return new URLSearchParams(getQueryStringForHashRouting());
}

export { getArticle, getQueryStringForHashRouting, getSearchParamsForHashRouting };