import {React} from "react";
import Home from "./components/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.scss";
import AdventureDetail from "./components/AdventureDetail";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import About from "./components/About";
import Header from './components/Header';
import Footer from "./components/Footer";
import {getAuthorHost} from "./utils/fetchData";
import {Helmet} from "react-helmet";

function App() {

  return (
    <div className="App">
      <Helmet>
        <meta name="urn:auecon:aemconnection" content={`aem:${getAuthorHost()}`}/>
      </Helmet>
      <Header />
      <hr/>
      <main>
        <Router>
          <Routes>
            <Route path="/adventure:slug" element={<AdventureDetail />} />
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/article:slug" element={<ArticleDetail />} />
            <Route path="/aboutus" element={<About />} />
          </Routes>
        </Router>
      </main>
      <hr/>
      <Footer/>
    </div>
  );
}

export default App;
