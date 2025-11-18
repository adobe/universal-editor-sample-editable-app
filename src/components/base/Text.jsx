/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useEffect} from 'react';
import {fetchData} from '../../utils/fetchData';

const Text = (props) => {
  const {resource, prop = "text", type, className, data: initialData} = props;
  const [data,setData] = React.useState(initialData);
  
  const editorProps = {
    "data-aue-resource": resource,
    "data-aue-prop":prop,
    "data-aue-type": type,
  };

  useEffect(() => {
    if(!resource || !prop ) return;
    if(!data) { fetchData(resource).then((data) => setData(data)) };
  }, [resource, prop, data]);
  
  
  return data ? (
    type !== "richtext" ?(
          <div {...editorProps} data-aue-component="text" className={className} data-aue-label={"Text"}>
            {data[prop]}
          </div>
      ) : <div {...editorProps} data-aue-component="richtext" className={className}  data-aue-label={"Rich Text"} dangerouslySetInnerHTML={{__html: data[prop]}}/>
  ): <></>;
};

export default Text;
