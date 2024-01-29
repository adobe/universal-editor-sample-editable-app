/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useEffect, useMemo} from 'react';
import {fetchData} from '../../utils/fetchData';

const Title = (props) => {
  const {resource, prop = "jcr:title", type, className = "test", data: initialData, isComponent = false} = props;
  const editorProps = useMemo(() => true && {
    "data-aue-resource": resource,
    "data-aue-prop":prop,
    "data-aue-type": type,
    "data-aue-behavior": isComponent
  }, [resource, prop, type, isComponent]);

  const [data,setData] = React.useState(initialData);

  useEffect(() => {
    if(!resource || !prop) return;
    if (!data) { fetchData(resource, "model").then((data) => setData(data)) };
  }, [resource, prop, data]);

  useEffect(() => {
    const handleUpdate = (e) => {
      const { itemids = [] } = e.detail;
      if(itemids.indexOf(resource) >= 0) {
        setData(null);
      }
      e.stopPropagation();
    };
    document.addEventListener("editor-update", handleUpdate);
    return () => {
      document.removeEventListener("editor-update", handleUpdate);
    }
  },[resource]);
  
  const TitleTag = data?.type ? `${data.type}` : "h1";
  return data ? (
    <TitleTag {...editorProps} data-aue-model="title" data-aue-label={"title"} className={className}>{data["text"]}</TitleTag>
  ):<></>;
};

export default Title;
