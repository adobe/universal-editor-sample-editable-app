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
  const {itemID, itemProp = "jcr:title", itemType, className = "test", data: initialData, isComponent = false} = props;
  const editorProps = useMemo(() => true && {
    itemID,
    itemProp,
    itemType,
    "data-editor-behavior": isComponent
  }, [itemID, itemProp, itemType, isComponent]);

  const [data,setData] = React.useState(initialData);

  useEffect(() => {
    if(!itemID || !itemProp) return;
    if (!data) { fetchData(itemID, "model").then((data) => setData(data)) };
  }, [itemID, itemProp, data]);

  useEffect(() => {
    const handleUpdate = (e) => {
      const { itemids = [] } = e.detail;
      if(itemids.indexOf(itemID) >= 0) {
        setData(null);
      }
      e.stopPropagation();
    };
    document.addEventListener("editor-update", handleUpdate);
    return () => {
      document.removeEventListener("editor-update", handleUpdate);
    }
  },[itemID]);
  
  const TitleTag = data?.type ? `${data.type}` : "h1";
  return data ? (
    <TitleTag {...editorProps} data-editor-itemmodel="title" data-editor-itemlabel={"title"} className={className}>{data["text"]}</TitleTag>
  ):<></>;
};

export default Title;
