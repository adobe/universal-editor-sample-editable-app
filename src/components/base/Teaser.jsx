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

  useEffect(() => {
    if (!resource) return;
    if (!data) {
      fetchData(resource).then((data) => setData(data));
    }
  }, [resource, data]);

  if (!data) return <></>;

  const title = data["jcr:title"] || data.title || "";
  const subtitle = data.subtitle || "";
  const description = data.description || data.text || "";
  const imagePath = data["fileReference"] || data.image || "";
  const ctaText = data.ctaText || data["cta:text"] || "";
  const ctaLink = data.ctaLink || data["cta:link"] || "";

  return (
    <section className="teaser">
      {imagePath && (
        <div className="teaser-image">
          <img
            src={getImageURL(imagePath)}
            alt={title}
          />
        </div>
      )}
      <div className="teaser-content">
        {subtitle && (
          <p
            className="teaser-subtitle"
          >
            {subtitle}
          </p>
        )}
        {title && (
          <h2
            className="teaser-title"
          >
            {title}
          </h2>
        )}
        {description && (
          <div
            className="teaser-description"
            dangerouslySetInnerHTML={{__html: description}}
          >
          </div>
        )}
        {ctaText && (
          <div className="teaser-cta">
            <a
              href={ctaLink || "#"}
              className="teaser-cta-button">
              <span>
                {ctaText}
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Teaser;

