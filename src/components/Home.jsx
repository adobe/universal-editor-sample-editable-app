/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import Adventures from './Adventures';
import Card from './Card';
import Summary from './Summary';
import {Link} from 'react-router-dom';
import Title from './Title';
/***
 * Displays a grid of current adventures
 */
 function Home() {
    return (
      <div className="Home">
        <Link to={`/article`}>
          <p>Go to Content Services Sample!</p>
        </Link>
        <Card/>
        <hr/>
        <Title itemID="urn:aemconnection:/content/wknd/us/en/about-us/jcr:content/root/container/title_393953656_copy" itemType="text" itemProp="jcr:title"/>
        <Adventures />
        <hr/>
        <Summary />
    </div>
    );
}

export default Home;
