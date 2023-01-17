const {REACT_APP_HOST_URI} = process.env;

export const fetchData = async (path) => {
	if (path.startsWith("local:")) {
		const url = path.replace("local:", "");
		const data = await fetch(url);
		const json = await data.json();
		return json.paths;
	} else {
		const url = `${REACT_APP_HOST_URI}/${path.split(":/")[1]}.model.json`;
		const data = await fetch(url);
		const json = await data.json();
		return json;
	}
};
