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
import { type ReactElement, useEffect, useMemo, useState } from "react";
import { type EditableProps, ITEM_TYPE } from "src/types";
import { convertToEditorProps, fetchData, getPublishHost } from "src/utils";

type ImageProps = Omit<EditableProps, "filter" | "type">;

const Image = (props: ImageProps): ReactElement => {
  const [data, setData] = useState<any>(props.data);

  const editableProps = { ...props, type: ITEM_TYPE.MEDIA };
  const editorProps = convertToEditorProps(editableProps);

  const { resource, prop } = editableProps;

  useEffect(() => {
    if (!resource || !prop) {
      return;
    }

    fetchData(resource).then((data) => setData(data));
  }, [resource, prop]);

  const src = useMemo(() => {
    const path = data?.dataLayer?.[data.id]?.image?.["repo:path"];

    return path ? `${getPublishHost()}${path}` : "";
  }, [data]);

  return <img {...editorProps} src={src} />;
};

export { Image };