import {React, useEffect} from "react";
import Home from "./components/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import logo from "./images/wknd-logo-dk.svg";
import "./App.scss";
import AdventureDetail from "./components/AdventureDetail";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import About from "./components/About";
import {getAuthorHost} from "./utils/fetchData";
import {Helmet} from "react-helmet";

function App() {
  const connectionTag = document.querySelector('meta[name="urn:auecon:aemconnection"]');

  useEffect(() => {
    connectionTag?.setAttribute("content", `aem:${getAuthorHost()}`);
  },[connectionTag]);

  return (
    <div className="App">
      <Helmet>
        <meta name="urn:auecon:aemconnection" content={`aem:${getAuthorHost()}`}/>
      </Helmet>
      <div className="Home">
        <header>
          <img src={logo} className="logo" alt="WKND Logo" />
          <hr />
        </header>
        <Router>
          <Routes>
            <Route path="/adventure:slug" element={<AdventureDetail />} />
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/article:slug" element={<ArticleDetail />} />
            <Route path="/articles/article:slug/aboutus" element={<About />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
