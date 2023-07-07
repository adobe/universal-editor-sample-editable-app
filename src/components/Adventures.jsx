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
// import Error from './base/Error';
import Loading from './base/Loading';
import "./Adventures.scss";
import Title from './base/Title';
import {getPublishHost} from "../utils/fetchData";

function AdventureItem(props) {
    const editorProps = {
        itemID: "urn:aemconnection:" + props?._path + "/jcr:content/data/master",
        itemType: "reference",
        itemfilter: "cf",
        "data-editor-itemlabel": props.title
    };

  //Must have title, path, and image
  if(!props || !props._path || !props.title || !props.primaryImage ) {
    return null;
  }

  return (
         <li className="adventure-item" itemScope {...editorProps}>
          <div className="adventure-image-card">
          <Link to={`/adventure:${props.slug}${window.location.search}`}>
            <img className="adventure-item-image" src={`${getPublishHost()}${props.primaryImage._path}`}
                  alt={props.title} itemProp="primaryImage" itemType="image" />
          </Link>
          </div>
          <h3 className="adventure-item-title" itemProp="title" itemType="text">{props.title.toLowerCase()}</h3>
          <div className="adventure-item-details">
              <div className="adventure-item-length pill default"><span itemProp="tripLength" itemType="text">{props.tripLength?.toLowerCase()}</span></div>
              <div className="adventure-item-price pill">$<span itemProp="price" itemType="text">{props.price}</span></div>
          </div>  
      </li>
  );
}

function Adventures() {
  const persistentQuery = 'wknd-shared/adventures-all';
  //Use a custom React Hook to execute the GraphQL query
  const { data, errorMessage } = useGraphQL(persistentQuery);

  //If there is an error with the GraphQL query
  if(errorMessage) return;

  //If data is null then return a loading state...
  if(!data) return <Loading />;

  return (
      <section id="adventures" className="adventures">
        <Title itemID="urn:aemconnection:/content/wknd/us/en/adventures/jcr:content/root/container/container/title" itemType="text" itemProp="jcr:title"/>      
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
      </section>
  );
}

export default Adventures;
