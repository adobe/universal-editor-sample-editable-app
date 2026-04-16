"use client";

import { useEffect } from "react";
import { getAuthorHost, getProtocol, getService } from "../utils/fetchData";

export default function UniversalEditorMeta() {
  useEffect(() => {
    // Add urn:adobe:aue:system:aemconnection
    const aemConnectionMeta = document.createElement("meta");
    aemConnectionMeta.name = "urn:adobe:aue:system:aemconnection";
    aemConnectionMeta.content = `${getProtocol()}:https://author-p117303-e1695777.adobeaemcloud.com}`;
    aemConnectionMeta.dataRh ="true";
    document.head.appendChild(aemConnectionMeta);

    // Add urn:adobe:aue:config:service if it exists
    const service = getService();
    if (service) {
      const configServiceMeta = document.createElement("meta");
      configServiceMeta.name = "urn:adobe:aue:config:service";
      configServiceMeta.content = service;
      document.head.appendChild(configServiceMeta);
    }

    return () => {
      document.head.removeChild(aemConnectionMeta);
      if (service) {
        document.head.querySelector('meta[name="urn:adobe:aue:config:service"]')?.remove();
      }
    };
  }, []);

  return null;
}
