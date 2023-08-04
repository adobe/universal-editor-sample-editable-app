/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useEffect, useMemo} from 'react';
import {fetchData, getPublishHost} from '../../utils/fetchData';

const Image = (props) => {
  const {itemID, itemProp = "fileReference", itemType, className, data: initialData, isComponent = false} = props;

  const editorProps = useMemo(() => true && {
    itemID,
    itemProp,
    itemType,
    "data-editor-behavior": isComponent
  }, [itemID, itemProp, itemType, isComponent]);

  const [data,setData] = React.useState(initialData || {});
  useEffect(() => {
    if(!itemID || !itemProp || initialData) return;
    fetchData(itemID).then((data) => setData(data));
  }, [itemID, itemProp, initialData]);
  const path = data?.dataLayer?.[data.id]?.image?.["repo:path"];

  return (
    <img {...editorProps} data-editor-itemmodel="image" data-editor-itemlabel={data.id} src={path ? `${getPublishHost()}${path}` : ""} className={className} alt={data.alt} />
  );
};

export default Image;
