"use client";
import React, {useEffect, useMemo} from 'react';
import {fetchData, getImageURL} from '../../utils/fetchData';

const Teaser = (props) => {
  const {resource, type, className, data: initialData} = props;

  const editorProps = useMemo(() => true && {
    "data-aue-resource": resource,
    "data-aue-type": type,
    "data-aue-label": "Teaser"
  }, [resource, type]);

  const [data, setData] = React.useState(initialData || {});
  useEffect(() => {
    if(!resource || initialData) return;
    fetchData(resource).then((data) => setData(data));
  }, [resource, initialData]);

  const imagePath = data?.["fileReference"];

  return (
    <div {...editorProps} data-aue-component="teaser" className={className}>
      {imagePath && (
        <img 
          data-aue-prop="fileReference" 
          data-aue-type="media" 
          data-aue-label="Image"
          src={getImageURL(imagePath)} 
          alt={data["jcr:title"]} 
          style={{ maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '1rem' }}
        />
      )}
      <div style={{ padding: '1rem', background: '#f5f5f5' }}>
        <h2 data-aue-prop="jcr:title" data-aue-type="text" data-aue-label="Title" style={{ margin: '0 0 0.5rem 0' }}>
          {data["jcr:title"] || "Teaser Title"}
        </h2>
        <p data-aue-prop="jcr:description" data-aue-type="text" data-aue-label="Description" style={{ margin: 0 }}>
          {data["jcr:description"] || "Teaser Description"}
        </p>
      </div>
    </div>
  );
};

export default Teaser;
