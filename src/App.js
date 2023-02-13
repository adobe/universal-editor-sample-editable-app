import { React, useEffect } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./images/wknd-logo-dk.svg";
import "./App.scss";
import AdventureDetail from "./components/AdventureDetail";
import Articles from "./components/Articles";
import ArticleDetail from "./components/ArticleDetail";
import About from "./components/About";
import ContentSample from "./components/ContentSample";
const {REACT_APP_HOST_URI} = process.env;

// import { EditorProvider } from '@aem-sites/universal-editor-react';

// function App() {
//   return (
//     <div className="App">
//       <div className="Home">
//         <header>
//           <img src={logo} className="logo" alt="WKND Logo"/>
//           <hr />
//         </header>
//         <EditorProvider>
//           <Adventures />
//         </EditorProvider>
//       </div>
//     </div>
//   );
// }

function App() {
  useEffect(() => {
    document.querySelector('meta[name="urn:auecon:aemconnection"]').setAttribute("content", `aem:${REACT_APP_HOST_URI}`);
  });

  return (
    <div className="App">
      <div className="Home">
        <header>
          <img src={logo} className="logo" alt="WKND Logo" />
          <hr />
        </header>
        <Router>
          <Routes>
            <Route path="/adventure:slug" element={<AdventureDetail />} />
            <Route path="/" element={<Home />} />
            <Route path="/article" element={<ContentSample />} />
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
