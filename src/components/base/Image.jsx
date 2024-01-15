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
  const {resource, prop = "fileReference", type, className, data: initialData, isComponent = false} = props;

  const editorProps = useMemo(() => true && {
    "data-aue-resource": resource,
    "data-aue-prop":prop,
    "data-aue-type": type,
    "data-aue-behavior": isComponent
  }, [resource, prop, type, isComponent]);

  const [data,setData] = React.useState(initialData || {});
  useEffect(() => {
    if(!resource || !prop || initialData) return;
    fetchData(resource).then((data) => setData(data));
  }, [resource, prop, initialData]);
  const path = data?.dataLayer?.[data.id]?.image?.["repo:path"];

  return (
    <img {...editorProps} data-aue-model="image" data-aue-label={data.id} src={path ? `${getPublishHost()}${path}` : ""} className={className} alt={data.alt} />
  );
};

export default Image;
