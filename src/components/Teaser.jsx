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
import { mapJsonRichText } from '../utils/renderRichText';
import Loading from './base/Loading';
import "./Teaser.scss";
import {getImageURL} from "../utils/fetchData";

const Teaser = () => {
  const persistentQuery = `wknd-shared/article-by-slug;slug=aloha-spirits-in-northern-norway`;
  const {data, errorMessage} = useGraphQL(persistentQuery);
  	//If there is an error with the GraphQL query
	if (errorMessage) return;

	//If query response is null then return a loading icon...
	if (!data) return <Loading/>;
  
  const article =  getArticle(data);
  if(!article) return <></>
  const { title, _path, featuredImage, main } = article;

  const editorProps = {
		"data-aue-resource": "urn:aemconnection:" + _path + "/jcr:content/data/master",
		"data-aue-type": "reference",
		"data-aue-filter": "cf",
    "data-aue-label": "Hero Teaser"
	};

  return (

  <section {...editorProps} className="Teaser">
    <article>
      <p>Latest article</p>
      <h1 data-aue-prop="title" data-aue-type="text" data-aue-label="Title">{title}</h1>
      {main && <div data-aue-prop="main" data-aue-type="richtext" data-aue-label="Description">{mapJsonRichText(main.json)}</div>}
      <Link to={`/articles/article/aloha-spirits-in-northern-norway${window.location.search}`}>
        <button>Read more</button>
      </Link>
    </article>
    {featuredImage && <img src={`${getImageURL(featuredImage)}`} alt={title} data-aue-type="media" data-aue-prop="featuredImage" data-aue-label="Image"/>}
  </section>

);
  }
  
export default Teaser;

