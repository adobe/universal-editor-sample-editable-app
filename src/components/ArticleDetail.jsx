/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import Link from 'next/link';
import BackButton from './base/BackButton';
import backIcon from '../images/Back.svg';
import Error from './base/Error';
import Loading from './base/Loading';
import {mapJsonRichText} from '../utils/renderRichText';
import './AdventureDetail.scss';
import { fetchPersistedQuery } from '../api/graphqlServer';
import {getArticle, getQueryStringForHashRouting} from '../utils/commons';
import {getImageURL} from "../utils/fetchData";

async function ArticleDetail({article, slug}) {

    const articleSlug = slug || article;

    const persistentQuery = `wknd-shared/article-by-slug;slug=${articleSlug}`;

    //Use a custom React Hook to execute the GraphQL query
    const {data, errors} = await fetchPersistedQuery(persistentQuery);
    const errorMessage = errors ? errors.map(e => e.message || e).join(', ') : null;

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
        "data-aue-resource": "urn:aemconnection:" + currentArticle._path + "/jcr:content/data/master",
        "data-aue-type": "reference",
        "data-aue-filter": "cf"
    };

    return (<div {...editorProps} className="adventure-detail">
        <div className="adventure-detail-header">
            <BackButton label="Back" className="adventure-detail-back-nav dark" />
            <h1 className="adventure-detail-title" data-aue-prop="title"
                data-aue-type="text">{currentArticle.title}</h1>
            {/* <span className="pill default" itemProp="title" itemType="text">{currentAdventure.activity}</span> */}
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
        <img className="adventure-detail-primaryimage" data-aue-type="media" data-aue-prop="featuredImage"
             src={`${getImageURL(featuredImage)}`} alt={title}/>
			<div className="adventure-detail-content">			
				<div data-aue-prop="main" data-aue-type="richtext">{mapJsonRichText(main.json)}</div>
			</div>
		</div>
	);
}

function NoArticleFound() {
	return (
		<div className="adventure-detail">
			<Link className="adventure-detail-close-button" href={`/${getQueryStringForHashRouting()}`}>
				<img className="Backbutton-icon" src={backIcon} alt="Return"/>
			</Link>
			<Error errorMessage="Missing data, article could not be rendered."/>
		</div>
	);
}

export default ArticleDetail;
