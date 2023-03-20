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
import Error from './base/Error';
import Loading from './base/Loading';
import {mapJsonRichText} from '../utils/renderRichText';
import './AdventureDetail.scss';
import useGraphQL from '../api/useGraphQL';
import { getArticle } from '../utils/commons';
import {getPublishHost} from "../utils/fetchData";

function ArticleDetail({ article }) {

	// params hook from React router
	const {slug} = useParams();
	const navigate = useNavigate();
	const articleSlug = slug ? slug.substring(1) : article;

	const persistentQuery = `wknd-shared/article-by-slug;slug=${articleSlug}`;

	//Use a custom React Hook to execute the GraphQL query
	const {data, errorMessage} = useGraphQL(persistentQuery);

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
        <div class="adventure-detail-header">
            <h1 className="adventure-detail-title" itemProp="title" itemType="text">{currentArticle.title}</h1>
            <button className="adventure-detail-close-button dark" onClick={() => navigate(-1)}>
                <img className="Backbutton-icon" src={backIcon} alt="Return"/>
            </button>	
        </div>
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
			<div className="adventure-detail-info">
				<Contributer {...authorFragment} />
			</div>
			<div className="adventure-detail-content">
				<img className="adventure-detail-primaryimage" itemType="image" itemProp="featuredImage"
					 src={`${getPublishHost()}${featuredImage._path}`} alt={title}/>
				<div itemProp="main" itemType="richtext">{mapJsonRichText(main.json)}</div>
			</div>
		</div>
	);
}

function NoArticleFound() {
	return (
		<div className="adventure-detail">
			<Link className="adventure-detail-close-button" to={`/${window.location.search}`}>
				<img className="Backbutton-icon" src={backIcon} alt="Return"/>
			</Link>
			<Error errorMessage="Missing data, article could not be rendered."/>
		</div>
	);
}

function Contributer(props) {

	if (!props) {
		return null;
	}
	let profilePicture = null;
	if (props.profilePicture) {
		profilePicture =
			<img className="contributor-image" src={`${getPublishHost()}${props.profilePicture._path}`}
				 alt={props.firstName}/>
	}

	return (
		<div className="contributor">
			{profilePicture}
			<h3 className="contributor-name">{props.firstName} {props.lastName}</h3>
		</div>);
}

export default ArticleDetail;
