/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import logo from "../images/wknd-logo-dk.svg";

const Footer = () => (
  <footer className="footer">
    <img src={logo} className="logo" alt="WKND Logo" />
    <nav>
      <ul className="menu">
        <li><a href="/#adventures">Adventures</a></li>
        <li><a href="/articles">Magazine</a></li>
        <li><a href="/aboutus">About Us</a></li>
      </ul>
    </nav>
    <small>Copyright &copy; 2023 Adobe. All rights reserved</small>
  </footer>
);

export default Footer;

