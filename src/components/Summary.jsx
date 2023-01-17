/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import image from '../images/footer.jpeg';
import Text from './Text';
import Title from './Title';

const Summary = () => (
    <div className="card">
      <div>
      <Title itemID="urn:aemconnection:/content/wknd/us/en/about-us/jcr:content/root/container/title" itemProp="jcr:title" itemType="text"/>
      <Text itemID="urn:aemconnection:/content/wknd/us/en/about-us/jcr:content/root/container/text_359993709" itemProp="text" itemType="richtext"/>
      <Text itemID="urn:aemconnection:/content/wknd/us/en/faqs/jcr:content/root/container/container/text" itemProp="text" itemType="richtext" />
      </div>
      <img src={image} alt="footer" />
    </div>
);

export default Summary;
