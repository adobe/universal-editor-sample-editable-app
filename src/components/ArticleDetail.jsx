/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import backIcon from '../images/icon-close.svg';
import Error from './Error';
import Loading from './Loading';
import {mapJsonRichText} from '../utils/renderRichText';
import './AdventureDetail.scss';
import useGraphQL from '../api/useGraphQL';

const {REACT_APP_PUBLISH_URI} = process.env;

function ArticleDetail() {

	// params hook from React router
	const {slug} = useParams();
	const navigate = useNavigate();
	const articleSlug = slug.substring(1);

	const persistentQuery = `wknd-shared/article-by-slug;slug=${articleSlug}`;

	//Use a custom React Hook to execute the GraphQL query
	const {data, errorMessage} = useGraphQL('', persistentQuery);

	//If there is an error with the GraphQL query
	if (errorMessage) return <Error errorMessage={errorMessage}/>;

	//If query response is null then return a loading icon...
	if (!data) return <Loading/>;

	//Set adventure properties variable based on graphQL response
	const currentArticle = getArticle(data);

	//Must have title, path, and image
	if (!currentArticle) {
		return <NoArticleFound/>;
	}

	const editorProps = {
		itemID: "urn:aemconnection:" + currentArticle._path + "/jcr:content/data/master",
		itemType: "reference",
		itemfilter: "cf"
	};

	return (<div {...editorProps} itemScope className="adventure-detail">
		<button className="adventure-detail-close-button" onClick={() => navigate(-1)}>
			<img className="Backbutton-icon" src={backIcon} alt="Return"/>
		</button>
		<ArticleDetailRender {...currentArticle} slug={articleSlug}/>
	</div>);
}

function ArticleDetailRender({
								 _path, title,
								 featuredImage, slug,
								 main,
								 authorFragment
							 }) {


	return (<div>
			<h1 className="adventure-detail-title" itemProp="title" itemType="text">{title}</h1>
			<div className="adventure-detail-info">
				<Contributer {...authorFragment} />
				<Link to={`/articles/article:${slug}/aboutus`}>About Us</Link>
			</div>
			<div className="adventure-detail-content">
				<img className="adventure-detail-primaryimage"
					 src={`${REACT_APP_PUBLISH_URI}${featuredImage._path}`} alt={title}/>
				<div itemProp="main" itemType="richtext" itemID={_path}>{mapJsonRichText(main.json)}</div>
			</div>
		</div>
	);
}

function NoArticleFound() {
	return (
		<div className="adventure-detail">
			<Link className="adventure-detail-close-button" to={"/"}>
				<img className="Backbutton-icon" src={backIcon} alt="Return"/>
			</Link>
			<Error errorMessage="Missing data, article could not be rendered."/>
		</div>
	);
}

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

function Contributer(props) {

	if (!props) {
		return null;
	}
	let profilePicture = null;
	if (props.profilePicture) {
		profilePicture =
			<img className="contributor-image" src={`${REACT_APP_PUBLISH_URI}${props.profilePicture._path}`}
				 alt={props.firstName}/>
	}

	return (
		<div className="contributor">
			{profilePicture}
			<h3 className="contributor-name">{props.firstName} {props.lastName}</h3>
		</div>);
}

export default ArticleDetail;
