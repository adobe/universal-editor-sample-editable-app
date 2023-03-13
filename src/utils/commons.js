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

export { getArticle };