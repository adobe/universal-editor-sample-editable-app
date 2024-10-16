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
import { type ReactElement } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getAuthorHost } from "src/utils";
import { Text, RichText, Image } from "src/components";
import "./App.css";

const App = (): ReactElement => (
  <HelmetProvider>
    <Helmet>
      <meta name="urn:adobe:aue:system:aemconnection" content={`aem:${getAuthorHost()}`} />
    </Helmet>
    <main>
      <Text
        resource="urn:aemconnection:/content/wknd/e2e/jcr:content/root/container/text"
        label="text"
      />
      <RichText
        resource="urn:aemconnection:/content/wknd/e2e/jcr:content/root/container/richtext"
        label="richtext"
      />
      <Image 
        resource="urn:aemconnection:/content/wknd/e2e/jcr:content/root/container/image"
        label="image"
      />
    </main>
  </HelmetProvider>
);

export default App;
