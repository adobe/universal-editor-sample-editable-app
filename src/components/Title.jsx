/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useEffect, useState, useMemo } from 'react';
import { getEditorContext } from '@aem-sites/universal-editor-cors';
import {fetchData} from '../utils/fetchData';

const Title = (props) => {
  const { itemID, itemProp = "jcr:title", itemType, className, data: initialData, isComponent = false } = props;
  const [isInEditor,setIsInEditor] = useState(false);
  const editorProps = useMemo(() => isInEditor && {
    itemID,
    itemProp,
    itemType,
    "data-editor-behavior": isComponent
  }, [isInEditor, itemID, itemProp, itemType, isComponent ]);

  useEffect(() => {
    getEditorContext({ isInEditor: setIsInEditor });
  }, []);

  const [data,setData] = React.useState(initialData || {});
  useEffect(() => {
    if(!itemID || !itemProp) return;
    if (!initialData) { fetchData(itemID).then((data) => setData(data)) };
  }, [itemID, itemProp, initialData]);

  if(!data.type) return null;

  const TitleTag = `${data.type}`;
  return (
    <TitleTag {...editorProps} className={className}>{data.text}</TitleTag>
  );
};

export default Title;
