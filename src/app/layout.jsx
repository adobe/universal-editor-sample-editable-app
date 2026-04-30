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
    <html lang="en" suppressHydrationWarning>
      <head>
          <script type="application/vnd.adobe.aue.component+json" src="/static/component-definition.json" />
          <script type="application/vnd.adobe.aue.filter+json" src="/static/filter-definition.json" />
          <script type="application/vnd.adobe.aue.model+json" src="/static/model-definition.json" />
          <script dangerouslySetInnerHTML={{
            __html: `
            (function () {
              const urlParams = new URLSearchParams(window.location.search);
              const corsUrl = urlParams.get('cors') === "stage" ? 'https://universal-editor-service-stage.adobe.io/cors.js' : 'https://universal-editor-service.adobe.io/cors.js';
              const script = document.createElement('script');
              script.src = corsUrl;
              script.async = true;
              document.head.appendChild(script);
            })();
            `
          }} />
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
