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
  const {itemID, itemProp = "jcr:title", itemType, className, data: initialData, isComponent = false} = props;
  const editorProps = useMemo(() => true && {
    itemID,
    itemProp,
    itemType,
    "data-editor-behavior": isComponent
  }, [itemID, itemProp, itemType, isComponent]);

  const [data,setData] = React.useState(initialData || {});
  useEffect(() => {
    if(!itemID || !itemProp) return;
    if (!initialData) { fetchData(itemID).then((data) => setData(data)) };
  }, [itemID, itemProp, initialData]);

  if(!data.type) return null;

  const TitleTag = `${data.type}`;
  return (
    <TitleTag {...editorProps} data-editor-itemlabel={data.text} className={className}>{data.text}</TitleTag>
  );
};

export default Title;
