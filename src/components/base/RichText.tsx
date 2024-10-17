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
import { type EditableProps, ITEM_TYPE } from "src/types";
import { convertToEditorProps, fetchData } from "src/utils";

type RichTextProps = Omit<EditableProps, "filter" | "type">;

const RichText = (props: RichTextProps): ReactElement => {
  const [data, setData] = useState<any>(props.data);

  const defaultProps = { type: ITEM_TYPE.RICH_TEXT, prop: "text", label: data?.id };
  const editableProps = { ...defaultProps, ...props };
  const editorProps = convertToEditorProps(editableProps);

  const { resource, prop } = editableProps;

  useEffect(() => {
    if (!resource || !prop) {
      return;
    }

    if (!data) {
      fetchData(resource).then((data) => setData(data));
    }
  }, [resource, prop, data]);

  const content = prop ? data?.[prop] : null;

  return <p {...editorProps} dangerouslySetInnerHTML={{ __html: content }} />;
};

export { RichText };
