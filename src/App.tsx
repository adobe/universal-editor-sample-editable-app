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
import { ReactElement, useEffect, useMemo, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import { Container } from "./components";
import { fetchData, getAuthorHost, getPath } from "./utils";

const App = (): ReactElement => {
  const pagePath = useMemo(() => getPath(), []);
  const pageContentPath = `${pagePath}/jcr:content/root`;
  const [items, setItems] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchData(`urn:aemconnection:${pageContentPath}`).then((data) => {
      setItems(data[":items"]);
    });
  }, [pageContentPath]);

  const renderItem = (key: string) => {
    const itemType = items[key]?.[":type"]?.split("/").pop();
    if (itemType === "container") {
      return <Container key={key} resource={`urn:aemconnection:${pageContentPath}/${key}`} />;
    }
    // Optionally handle other item types
    return null;
  };
  return (
    <HelmetProvider>
      <Helmet>
        <meta name="urn:adobe:aue:system:aemconnection" content={`aem:${getAuthorHost()}`} />
      </Helmet>
      {Object.keys(items).map(renderItem)}
    </HelmetProvider>
  );
};
export default App;
