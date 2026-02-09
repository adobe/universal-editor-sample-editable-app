/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useEffect, useMemo } from 'react';
import { fetchData, getImageURL } from '../../utils/fetchData';
import { mapJsonRichText } from '../../utils/renderRichText';
import './Teaser.scss';

const Teaser = (props) => {
  const { resource, type, data: initialData } = props;
  const [data, setData] = React.useState(initialData);

  const editorProps = useMemo(() => ({
    "data-aue-resource": resource,
    "data-aue-type": type,
  }), [resource, type]);

  useEffect(() => {
    if (!resource) return;
    if (!data) {
      fetchData(resource).then((data) => setData(data));
    }
  }, [resource, data]);

  useEffect(() => {
    const handleUpdate = (e) => {
      const { itemids = [] } = e.detail;
      if (itemids.indexOf(resource) >= 0) {
        setData(null);
      }
      e.stopPropagation();
    };
    document.addEventListener("editor-update", handleUpdate);
    return () => {
      document.removeEventListener("editor-update", handleUpdate);
    };
  }, [resource]);

  if (!data) return <></>;

  const title = data["jcr:title"] || data.title || "";
  const subtitle = data.subtitle || "";
  const description = data.description || data.text || "";
  const imagePath = data["fileReference"] || data.image || "";
  const ctaText = data.ctaText || data["cta:text"] || "";
  const ctaLink = data.ctaLink || data["cta:link"] || "";

  return (
    <section {...editorProps} className="teaser" data-aue-component="teaser" data-aue-label="Teaser">
      {imagePath && (
        <div className="teaser-image">
          <img
            src={getImageURL(imagePath)}
            alt={title}
            data-aue-prop="fileReference"
            data-aue-type="media"
            data-aue-label="Image"
          />
        </div>
      )}
      <div className="teaser-content">
        {subtitle && (
          <p
            className="teaser-subtitle"
            data-aue-prop="subtitle"
            data-aue-type="text"
            data-aue-label="Subtitle"
          >
            {subtitle}
          </p>
        )}
        {title && (
          <h2
            className="teaser-title"
            data-aue-prop="jcr:title"
            data-aue-type="text"
            data-aue-label="Title"
          >
            {title}
          </h2>
        )}
        {description && (
          <div
            className="teaser-description"
            data-aue-prop={"description"}
            data-aue-type={"richtext"}
            data-aue-label="Description"
            dangerouslySetInnerHTML={{__html: description}}
          >
          </div>
        )}
        {ctaText && (
          <div className="teaser-cta">
            <a
              href={ctaLink || "#"}
              className="teaser-cta-button"
            >
              <span
                data-aue-prop="ctaText"
                data-aue-type="text"
                data-aue-label="CTA Text"
              >
                {ctaText}
              </span>
            </a>
            {ctaLink && (
              <span
                data-aue-prop="ctaLink"
                data-aue-type="text"
                data-aue-label="CTA Link"
                style={{ display: 'none' }}
              >
                {ctaLink}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Teaser;

