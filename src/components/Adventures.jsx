/*
Copyright 2020 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import {Link} from 'react-router-dom';
import useGraphQL from '../api/useGraphQL';
import Error from './Error';
import Loading from './Loading';
import "./Adventures.scss";
import {getPublishHost} from "../utils/fetchData";

function AdventureItem(props) {
    const editorProps = {
        itemID: "urn:aemconnection:" + props?._path + "/jcr:content/data/master",
        itemType: "reference",
        itemfilter: "cf"
    };

  //Must have title, path, and image
  if(!props || !props._path || !props.title || !props.primaryImage ) {
    return null;
  }

  return (
         <li className="adventure-item" itemScope {...editorProps}>
          <Link to={`/adventure:${props.slug}`}>
            <img className="adventure-item-image" src={`${getPublishHost()}${props.primaryImage._path}`}
                alt={props.title} itemProp="primaryImage" itemType="image" />
          </Link>
          <div className="adventure-item-length-price">
              <div className="adventure-item-length" itemProp="tripLength" itemType="text">{props.tripLength}</div>
              <div className="adventure-item-price">$<span itemProp="price" itemType="text">{props.price}</span></div>
          </div>
          <div className="adventure-item-title" itemProp="title" itemType="text">{props.title}</div>
      </li>
  );
}

function Adventures() {
  const persistentQuery = 'wknd-shared/adventures-all';
  //Use a custom React Hook to execute the GraphQL query
  const { data, errorMessage } = useGraphQL(persistentQuery);

  //If there is an error with the GraphQL query
  if(errorMessage) return <Error errorMessage={errorMessage} />;

  //If data is null then return a loading state...
  if(!data) return <Loading />;

  return (
      <div className="adventures">
        <ul className="adventure-items">
          {
              //Iterate over the returned data items from the query
              data.adventureList.items.map((adventure, index) => {
                return (
                  <AdventureItem key={index} {...adventure} />
                );
              })
          }
          </ul>
      </div>
  );
}

export default Adventures;
