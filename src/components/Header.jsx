/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import logo from "../images/wknd-logo-dk.svg";

const Header = () => (
  <header className="header">
    <img src={logo} className="logo" alt="WKND Logo" />
    <nav>
      <ul className="menu">
        <li><a href="/#adventures">Adventures</a></li>
        <li><a href="/articles">Magazine</a></li>
        <li><a href="/aboutus">About Us</a></li>
      </ul>
    </nav>
    <button className="dark">Sign in</button>
  </header>
);

export default Header;

