/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { fetchPersistedQuery } from '../api/graphqlServer';
import Link from 'next/link';
import Error from './base/Error';
import Loading from './base/Loading';
import "./Articles.scss";
import { mapJsonRichText } from '../utils/renderRichText';
import {getImageURL} from "../utils/fetchData";
import {getQueryStringForHashRouting} from "../utils/commons";

const Article = ({_path, title, synopsis, authorFragment, slug}) => {
    const editorProps = {
        "data-aue-resource": "urn:aemconnection:" + _path + "/jcr:content/data/master",
        "data-aue-type": "reference",
        "data-aue-filter": "cf"
    };
    return (
        <li className="article-item" {...editorProps}>
            <aside>
              <img className="article-item-image"
                src={`${getImageURL(authorFragment?.profilePicture)}`}
                alt={title} data-aue-prop="profilePicture" data-aue-type="media"/>
            </aside>
            <article>
              <Link href={`/articles/article/${slug}${getQueryStringForHashRouting()}`}>
                  <h3 data-id="title" data-aue-prop="title" data-aue-type="text">{title}</h3>
              </Link>

              <p>{`By ${authorFragment.firstName} ${authorFragment.lastName}`}</p>
              { synopsis && 
                <div className="article-content" data-aue-prop='synopsis' data-aue-type='richtext'>
                  {mapJsonRichText(synopsis.json)}
                </div>
              }
              <Link href={`/articles/article/${slug}${getQueryStringForHashRouting()}`}>
                <button>Read more</button>
              </Link>
            </article>
            
    </li>
  );
};

const Articles = async () => {
  const persistentQuery = 'wknd-shared/articles-all';

  //Use a custom React Hook to execute the GraphQL query
  const {data, errors} = await fetchPersistedQuery(persistentQuery);
  const errorMessage = errors ? errors.map(e => e.message || e).join(', ') : null;

  //If there is an error with the GraphQL query
  if(errorMessage) return <Error errorMessage={errorMessage} />;

  //If data is null then return a loading state...
  if(!data) return <Loading />;

  return (
    <section className="articles">
      <h2>Articles</h2>
      <ul>
        {
            data.articleList.items.map((article, index) => {
              return (
                <Article key={index} {...article} />
              );
            })
        }
        </ul>
    </section>
);

};

export default Articles;





