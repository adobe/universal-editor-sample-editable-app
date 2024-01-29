/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { Link } from 'react-router-dom';
import Container from './base/Container';
import Title from './base/Title';
import Text from './base/Text';
import Teaser from './Teaser';
import Adventures from './Adventures';
import "./Home.scss";

/***
 * Displays a grid of current adventures
 */
function Home() {
    return (
        <div className="Home">
            <Teaser />
            <Adventures />
            <section className="newsletter">
                <div className="content">
                    <Title resource="urn:aemconnection:/content/wknd/us/en/newsletter/jcr:content/root/container/title" prop="jcr:title" type="text"/>
                    <Text resource="urn:aemconnection:/content/wknd/us/en/newsletter/jcr:content/root/container/text" prop="text" type="richtext" />
                </div>
                <button>Subscribe</button>
            </section>
            <section className="about-us">
                <div className="content">
                    <Title resource="urn:aemconnection:/content/wknd/language-masters/en/universal-editor-container/jcr:content/root/title" prop="jcr:title" type="text"/>
                    <Container resource="urn:aemconnection:/content/wknd/language-masters/en/universal-editor-container/jcr:content/root/container" type="container" />
                </div>
                <Link to={`/aboutus${window.location.search}`}>
                    <button className="dark">Read more</button>
                </Link>
            </section>
        </div>
    );
}

export default Home;
