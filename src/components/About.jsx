import React from 'react';
import image from '../images/wknd-card.jpeg';

const About = () => (
    <div style={{ maxWidth: "1280px" , margin: "0 auto" }}>
        <h1>About Us</h1>
        <img width="100%" src={image} alt="Sample"/>
        <p>The WKND is a fictional online magazine and adventure company that focuses
            on outdoor activities and trips across the globe. The WKND site is designed
            to demonstrate functionality for Adobe Experience Manager. There is also a
            corresponding tutorial that walks a developer through the development.
            Special thanks to Lorenzo Buosi and Kilian Amendola who created the
            beautiful design for the WKND site.
        </p>
    </div>
);

export default About;
