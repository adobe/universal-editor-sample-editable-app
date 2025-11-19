/*
Copyright 2020 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import {useState, useEffect} from 'react';
import {getAuthorHost} from "../utils/fetchData";
import {AEMHeadless} from '@adobe/aem-headless-client-js';


/**
 * Custom React Hook to perform a GraphQL query
 * @param path - Persistent query path
 */
function useGraphQL(path) {
	let [data, setData] = useState(null);
	let [errorMessage, setErrors] = useState(null);
	useEffect(() => {
		function makeRequest() {
			const sdk = new AEMHeadless({
				serviceURL: getAuthorHost(),
				endpoint: "/content/graphql/global/endpoint.json",
			});
			const request = sdk.runPersistedQuery.bind(sdk);

			request(path, {}, {credentials: "include"})
				.then(({data, errors}) => {
					//If there are errors in the response set the error message
					if (errors) {
						setErrors(mapErrors(errors));
					}
					//If data in the response set the data as the results
					if (data) {
						setData(data);
					}
				})
				.catch((error) => {
					setErrors(error);
					sessionStorage.removeItem('accessToken');
				});
		}

		makeRequest();
	}, [path]);


	return {data, errorMessage}
}

/**
 * concatenate error messages into a single string.
 * @param {*} errors
 */
function mapErrors(errors) {
	return errors.map((error) => error.message).join(",");
}

export default useGraphQL;
