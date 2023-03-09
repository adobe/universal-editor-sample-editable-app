/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import useGraphQL from '../api/useGraphQL';
import {Link} from 'react-router-dom';
import Error from './Error';
import Loading from './Loading';
import "./Articles.scss";
import {getPublishHost} from "../utils/fetchData";

const Article = ({_path, title, main, authorFragment, slug}) => {
    const editorProps = {
        itemID: "urn:aemconnection:" + _path + "/jcr:content/data/master",
        itemType: "reference",
        itemfilter: "cf"
    };

    return (
        <li className="article-item" itemScope {...editorProps}>
            <div>
                <Link to={`/articles/article:${slug}`}>
                    <h3 data-id="title" itemProp="title" itemType="text">{title}</h3>
                </Link>
                <img className="article-item-image"
                     src={`${getPublishHost()}${authorFragment?.profilePicture._path}`}
                     alt={title} itemProp="profilePicture" itemType="image"/>
                <p>{`By ${authorFragment.firstName} ${authorFragment.lastName}`}</p>
            </div>
            <p className="article-content">
                Steep mountain sides surround us, like wise trolls from a distant timeline, weathered and worn by
                long-gone
                glaciers, green moss now covering the black rock. White sheep forage on steep grass, defying the
                chilling winds
                funneled by the deep valley. The subtle hues of the arctic circle are welcoming, comfortable on the
                eyes. When
                rare sunrays pierce through the low clouds, the scenery reveals its vibrancy, as the waves reflect a
                translucent
                cyan blue before crashing loudly onto white sand. A small but playful groundswell is building, the
                offshore breeze
                grooming playful lines down the point, making for welcoming conditions for acclimatizing to cold water
                and thick
                neoprene. Knowing it is our last surf before a few days of hard wind, we take full advantage out of
                every ripple
                the North Atlantic Ocean sends our way.<br/>
                <Link to={`/articles/article:${slug}`}>
                    Read more in the article
                </Link>
            </p>
    </li>
  );
};

const Articles = () => {
  const persistentQuery = 'wknd-shared/articles-all';

  //Use a custom React Hook to execute the GraphQL query
  const { data, errorMessage } = useGraphQL(persistentQuery);

  //If there is an error with the GraphQL query
  if(errorMessage) return <Error errorMessage={errorMessage} />;

  //If data is null then return a loading state...
  if(!data) return <Loading />;

  return (
    <>
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
    </>
);

};

export default Articles;





