/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import {Link} from 'react-router-dom';
import image from '../images/wknd-card.jpeg';
import Text from './Text';
import Title from './Title';

const Card = () => (
  <>
    <article className="card">
      <img src={image} alt="Sample" />
      <div>
        <Title itemID="urn:aemconnection:/content/wknd/us/en/jcr:content/root/container/container/title" itemProp="jcr:title" itemType="text"/>
        <Title itemID="urn:aemconnection:/content/wknd/us/en/magazine/western-australia/jcr:content/root/container/container/title" itemProp="jcr:title" itemType="text"/>
        <div className="card-text"><Text
            itemID="urn:aemconnection:/content/wknd/us/en/magazine/ski-touring/jcr:content/root/container/container/contentfragment/par1/text"
            itemProp="text" itemType="richtext"/></div>
        <Link to={`/articles${window.location.search}`}>
          <button>Show More</button>
        </Link>
      </div>
    </article>
  </>
);

export default Card;





