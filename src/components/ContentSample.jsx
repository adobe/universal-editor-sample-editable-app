import React from 'react';
import { useEffect } from 'react';
import Loading from './Loading';
const { REACT_APP_IBIZA_URL, REACT_APP_API_KEY } = process.env;

const ContentSample = () => {
  const [content, setContent] = React.useState();
  useEffect(() => {
    fetch(REACT_APP_IBIZA_URL + '/editing/1234/articles.html', {
      headers: {
        "x-api-key": REACT_APP_API_KEY
      }
    })
    .then(res => res.text())
    .then(html => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");
      setContent(doc.querySelector('body').innerHTML);
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
  }, []);

  return !content ? <Loading/> : <div className="article" dangerouslySetInnerHTML={{__html:content}}/>;
};

export default ContentSample;
