/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import image from '../images/footer.jpeg';
import Container from './Container';

const Summary = () => (
    <div className="card">
        <Container itemID="urn:aemconnection:/content/wknd/us/en/about-us/jcr:content/root/container/container" itemType="container" />
        <img src={image} alt="footer" />
    </div>
);

export default Summary;
