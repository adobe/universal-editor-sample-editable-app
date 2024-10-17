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
import { type FC, ReactElement } from "react";
import { type EditableProps } from "src/types";
import { Teaser } from "./index";

const Default = (): ReactElement => <div />;

const CustomComponent = (props: EditableProps): ReactElement => {
  let Component: FC<EditableProps>;

  switch (props?.data?.component) {
    case "teaser":
      Component = Teaser;
      break;
    default:
      Component = Default;
      break;
  }

  return <Component {...props} />;
};

export { CustomComponent };
