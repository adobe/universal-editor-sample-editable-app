import {React} from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import AdventureDetail from "./components/AdventureDetail";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import About from "./components/About";
import {getAuthorHost, getProtocol, getService} from "./utils/fetchData";
import logo from "./images/wknd-logo-dk.svg";
import "./App.scss";

const NavMenu = () => (
  <nav>
    <ul className="menu">
      <li><a href={`/${window.location.search}`}>Adventures</a></li>
      <li><a href={`/articles${window.location.search}`}>Magazine</a></li>
      <li><a href={`/aboutus${window.location.search}`}>About Us</a></li>
    </ul>
  </nav>
);

const Header = () => {
  return (
    <header className="header">        {/*<a href={sparkleAppUrl}><img src={logo} className="logo" alt="WKND Logo" /></a>*/}
        <img src={logo} className="logo" alt="WKND Logo" />
      <NavMenu />
      <button className="dark">Sign in</button>
    </header>
  );
};

const Footer = () => (
  <footer className="footer">
    <img src={logo} className="logo" alt="WKND Logo" />
    <NavMenu />
    <small>Copyright &copy; 2023 Adobe. All rights reserved</small>
  </footer>
);

function App() {

  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <meta name="urn:adobe:aue:system:aemconnection" content={`${getProtocol()}:${getAuthorHost()}`}/>
            { getService() && <meta name="urn:adobe:aue:config:service" content={getService()}/> }
        </Helmet>
        <Router>
          <Header />
          <hr/>
          <main>
            <Routes>
              <Route path="/adventure/:slug" element={<AdventureDetail />} />
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/article/:slug" element={<ArticleDetail />} />
              <Route path="/aboutus" element={<About />} />
            </Routes>
          </main>
        </Router>
        <hr/>
        <Footer/>
      </div>
    </HelmetProvider>
  );
}

export default App;
