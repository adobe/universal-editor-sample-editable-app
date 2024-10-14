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

enum ITEM_TYPE {
  TEXT = "text",
  RICH_TEXT = "richtext",
  MEDIA = "media",
  CONTAINER = "container",
  COMPONENT = "component",
  REFERENCE = "reference",
}

type ItemBehavior = ITEM_TYPE.COMPONENT | ITEM_TYPE.CONTAINER;

interface EditorProps {
  "data-aue-resource"?: string;
  "data-aue-prop"?: string;
  "data-aue-type"?: ITEM_TYPE;
  "data-aue-filter"?: string;
  "data-aue-label"?: string;
  "data-aue-model"?: string;
  "data-aue-behavior"?: ItemBehavior;
}

interface EditableProps {
  resource?: EditorProps["data-aue-resource"];
  prop?: EditorProps["data-aue-prop"];
  type?: EditorProps["data-aue-type"];
  filter?: EditorProps["data-aue-filter"];
  label?: EditorProps["data-aue-label"];
  model?: EditorProps["data-aue-model"];
  behavior?: EditorProps["data-aue-behavior"];
  data?: any;
}

export type { EditorProps, EditableProps };
export { ITEM_TYPE };
