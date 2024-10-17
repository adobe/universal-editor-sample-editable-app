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
const { REACT_APP_DEFAULT_AUTHOR_HOST, REACT_APP_DEFAULT_PUBLISH_HOST } = process.env;

const fetchData = async (path: string): Promise<any> => {
  const url = `${getAuthorHost()}/${path.split(":/")[1]}.model.json`;
  const data = await fetch(url, { headers: { "X-Aem-Affinity-Type": "api" }, credentials: "include" });
  const json = await data.json();

  return json;
};

const getAuthorHost = (): string => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  if (searchParams.has("authorHost")) {
    return searchParams.get("authorHost") ?? "";
  } else {
    return REACT_APP_DEFAULT_AUTHOR_HOST ?? "";
  }
};

const getPublishHost = (): string => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  if (searchParams.has("publishHost")) {
    return searchParams.get("publishHost") ?? "";
  } else {
    return REACT_APP_DEFAULT_PUBLISH_HOST ?? "";
  }
};

const getPath = (): string => {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  if (searchParams.has("path")) {
    return searchParams.get("path") ?? "";
  } else {
    return "";
  }
}

export { fetchData, getAuthorHost, getPublishHost, getPath };
