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
import { type FC, ReactElement, useEffect, useState } from "react";
import { type EditableProps, ITEM_TYPE } from "src/types";
import { convertToEditorProps, fetchData } from "src/utils";
import { Image, RichText, Text } from "./index";

type ContainerProps = Omit<EditableProps, "type">;

const Default = (): ReactElement => <div />;

const createChildComponents = (items: any, itemid: string): ReactElement[] => {
  const components: JSX.Element[] = [];

  for (const key in items) {
    const item = items[key];
    const type = item[":type"].split("/").pop();

    let itemType: ITEM_TYPE;
    let Component: FC<EditableProps>;

    switch (type) {
      case "text":
        itemType = ITEM_TYPE.TEXT;
        Component = Text;
        break;
      case "richtext":
        itemType = ITEM_TYPE.RICH_TEXT;
        Component = RichText;
        break;
      case "image":
        itemType = ITEM_TYPE.MEDIA;
        Component = Image;
        break;
      case "container":
        itemType = ITEM_TYPE.CONTAINER;
        Component = Container;
        break;
      default:
        itemType = ITEM_TYPE.COMPONENT;
        Component = Default;
        break;
    }

    const editableProps: EditableProps = {
      resource: `${itemid}/${key}`,
      type: itemType,
      behavior: ITEM_TYPE.COMPONENT,
      data: item,
    };

    components.push(<Component key={key} {...editableProps} />);
  }

  return components;
};

const Container = (props: ContainerProps): ReactElement => {
  const [components, setComponents] = useState<ReactElement[]>([]);

  const editableProps = { ...props, type: ITEM_TYPE.CONTAINER };
  const editorProps = convertToEditorProps(editableProps);

  const { resource } = editableProps;

  useEffect(() => {
    if (!resource) {
      return;
    }

    fetchData(resource).then((data) => {
      setComponents(createChildComponents(data[":items"], resource));
    });
  }, [resource]);

  return <div {...editorProps}>{components}</div>;
};

export { Container };
