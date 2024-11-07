/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { type ReactElement, useEffect, useState } from "react";
import { type EditableProps, type EditorProps, ITEM_TYPE } from "src/types";
import { convertToEditorProps, fetchData, getHost } from "src/utils";

type ImageProps = Omit<EditableProps, "filter" | "type">;

const Image = (props: ImageProps): ReactElement => {
  const [data, setData] = useState<any>(props.data);

  const defaultProps: EditableProps = { type: ITEM_TYPE.MEDIA, prop: "fileReference" };
  const editableProps: EditableProps = { ...defaultProps, ...props };
  const editorProps: EditorProps = convertToEditorProps(editableProps);

  const { resource, prop } = editableProps;

  useEffect(() => {
    if (!resource || !prop) {
      return;
    }

    if (!data) {
      fetchData(resource).then((data) => setData(data));
    }
  }, [resource, prop, data]);

  const path = (prop && data?.[prop]) ?? data?.src ?? data?.dataLayer?.[data.id]?.image?.["repo:path"];
  const src = path ? `${getHost()}${path}` : "";
  const alt = data?.alt;

  return <img {...editorProps} src={src} alt={alt} />;
};

export { Image };
