import React from "react";
import logo from "../images/wknd-logo-dk.svg";
import "../App.scss";
import "./globals.css";

const NavMenu = () => {
    return (
        <nav>
            <ul className="menu">
                <li><a href={`/`}>Adventures</a></li>
                <li><a href={`/articles`}>Magazine</a></li>
                <li><a href={`/aboutus`}>About Us</a></li>
            </ul>
        </nav>
    );
};

const Header = () => {
  return (
    <header className="header">
        <img src={logo.src || logo} className="logo" alt="WKND Logo" />
      <NavMenu />
      <button className="dark">Sign in</button>
    </header>
  );
};

const Footer = () => (
  <footer className="footer">
    <img src={logo.src || logo} className="logo" alt="WKND Logo" />
    <NavMenu />
    <small>Copyright &copy; 2023 Adobe. All rights reserved</small>
  </footer>
);

import UniversalEditorMeta from "./UniversalEditorMeta";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          {/* Universal editor tags injected client-side via UniversalEditorMeta */}
      </head>
      <body>
        <UniversalEditorMeta />
        <div className="App">
          <Header />
          <hr/>
          <main>
            {children}
          </main>
          <hr/>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
