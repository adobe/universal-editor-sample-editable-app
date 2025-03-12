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
import "./App.css";
import { createChildComponents, fetchData, getPath } from "src/utils";
import { registerEventListeners } from "./utils/registerEventListeners";

const App = (): ReactElement => {
  const [items, setItems] = useState<Record<string, any>>({});

  const resource = `urn:aemconnection:${getPath()}/jcr:content`;

  useEffect(() => {
    fetchData(resource).then((data) => {
      setItems(data[":items"]);
    });
  }, [resource]);

  registerEventListeners();

  const components = createChildComponents(items, resource, true);

  return (
      <main>{components}</main>
  );
};
export default App;
