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
import { fetchData, getPath } from "./fetchData";

const changeTitleToPageTitle = (request: any): void => {
  const pageContentPath = `urn:aemconnection:${getPath()}/jcr:content`;
  const resourceSelector = `[data-aue-resource="${request?.target?.resource}"]`;
  const element = document.querySelector(resourceSelector);
  if (element) {
    fetchData(pageContentPath).then((data) => {
      if (data?.title) {
        element.innerHTML = data.title;
      }
    });
  }
};

const handleContentUpdate = (): void => {
  document.addEventListener("aue:content-update", (event: Event) => {
    const { request, value } = (event as CustomEvent)?.detail;
    // If Title component is updated to empty value, fetch and use the Page Title instead
    if (!value && request.target.prop === "jcr:title") {
      changeTitleToPageTitle(request);
    }
  });
};

const handleContentPatch = (): void => {
  document.addEventListener("aue:content-patch", (event: Event) => {
    const { request, patch } = (event as CustomEvent)?.detail;
    // If Title component is patched to empty value, fetch and use the Page Title instead
    if (!patch.value && request.target.prop === "jcr:title") {
      changeTitleToPageTitle(request);
    }
  });
};

const registerEventListeners = (): void => {
  handleContentUpdate();
  handleContentPatch();
};

export { registerEventListeners };
