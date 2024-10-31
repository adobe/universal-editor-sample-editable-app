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
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import { createChildComponents, fetchData, getAuthorHost, getPath } from "src/utils";

const App = (): ReactElement => {
  const [items, setItems] = useState<Record<string, any>>({});

  const pagePath = getPath();
  const pageContentPath = `${pagePath}/jcr:content/root`;
  const resource = `urn:aemconnection:${pageContentPath}`;

  useEffect(() => {
    fetchData(resource).then((data) => {
      setItems(data[":items"]);
    });
  }, [resource]);

  const components = createChildComponents(items, resource, true);

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="urn:adobe:aue:system:aemconnection" content={`aem:${getAuthorHost()}`} />
      </Helmet>
      {components}
    </HelmetProvider>
  );
};
export default App;
