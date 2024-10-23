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
import { type FC, type ReactElement } from "react";
import { Container, CustomComponent, Image, RichText, Text } from "src/components";
import { type EditableProps, ITEM_TYPE } from "src/types";

const createChildComponents = (items: any, parent: string, isPage?: boolean): ReactElement[] => {
  const components: JSX.Element[] = [];

  for (const key in items) {
    const item = items[key];
    const type = item[":type"].split("/").pop();

    let itemType: ITEM_TYPE;
    let Component: FC<EditableProps>;

    switch (type) {
      case "text":
        if (item.richText) {
          itemType = ITEM_TYPE.RICH_TEXT;
          Component = RichText;
        } else {
          itemType = ITEM_TYPE.TEXT;
          Component = Text;
        }
        break;
      case "image":
        itemType = ITEM_TYPE.MEDIA;
        Component = Image;
        break;
      case "container":
        itemType = ITEM_TYPE.CONTAINER;
        Component = Container;
        break;
      case "component":
        itemType = ITEM_TYPE.COMPONENT;
        Component = CustomComponent;
        break;
      default:
        itemType = ITEM_TYPE.COMPONENT;
        Component = () => null;
        break;
    }

    const editableProps: EditableProps = {
      resource: `${parent}/${key}`,
      type: itemType,
      data: item,
      behavior: isPage ? undefined : ITEM_TYPE.COMPONENT,
    };

    components.push(<Component key={key} {...editableProps} />);
  }

  return components;
};

export { createChildComponents };
