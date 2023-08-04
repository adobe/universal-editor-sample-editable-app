/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { Link } from 'react-router-dom';
import useGraphQL from '../api/useGraphQL';
import { getArticle } from '../utils/commons';
import { getPublishHost } from '../utils/fetchData';
import { mapJsonRichText } from '../utils/renderRichText';
// import Error from './base/Error';
import Loading from './base/Loading';
import "./Teaser.scss";

const Teaser = () => {
  const persistentQuery = `wknd-shared/article-by-slug;slug=aloha-spirits-in-northern-norway`;
  const {data, errorMessage} = useGraphQL(persistentQuery);
  	//If there is an error with the GraphQL query
	if (errorMessage) return;

	//If query response is null then return a loading icon...
	if (!data) return <Loading/>;
  const { title, _path, featuredImage, synopsis } = getArticle(data);

  const editorProps = {
		itemID: "urn:aemconnection:" + _path + "/jcr:content/data/master",
		itemType: "reference",
		itemfilter: "cf"
	};

  return (
  <section {...editorProps} itemScope className="Teaser">
    <article>
      <p>Latest article</p>
      <h1 itemProp="title" itemType="text">{title}</h1>
      {synopsis && <div itemProp="synopsis" itemType="richtext">{mapJsonRichText(synopsis.json)}</div>}
      <div>
        <span className='pill'>Magazine</span>
        <span className='pill'>Surfing</span>
      </div>
      <Link to={`/articles/article/aloha-spirits-in-northern-norway${window.location.search}`}>
        <button>Read more</button>
      </Link>
    </article>
    {featuredImage && <img src={`${getPublishHost()}${featuredImage._path}`} alt={title} itemType="media" itemProp="featuredImage" />}
  </section>
);
  }
  
export default Teaser;

