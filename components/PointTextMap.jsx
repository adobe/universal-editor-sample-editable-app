import { useEffect, useState } from "react";

export default function PointTextMap({ data }) {
  const [aspectRatio, setAspectRatio] = useState(null);
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    // retries 3 times, because sometimes image doesn't have naturalHeight/Width on first try
    if (retries > 2) {
      return;
    }
    
    // TODO Instead of retries, maybe wait for the image to finish loading to get the naturalWidth eg img.onload = cb
    const el = document.querySelector(data?.imageSelector);
    // if naturalWidth isn't currently present, set a default / forced size, and retry in 100ms
    if (!el || el.naturalWidth === 0) {
      setAspectRatio(`${data?.width || 16} / ${data?.height || 9}`);
      setTimeout(() => {
        setRetries(retries + 1);
      }, 500);
      return;
    }
    setAspectRatio(`${el.naturalWidth} / ${el.naturalHeight}`);
  }, [retries, data?.height, data?.imageSelector, data?.width]);

  return (
    <div className="wrapperForRatio" id={data.id} style={{ aspectRatio }}>
      <div className="pointTextLayer" style={{ objectFit: data?.fit || "contain", aspectRatio }}>
        {data?.content?.map((item, index) => {
          return (
            <div
              key={index}
              className="pointTextItemWrapper"
              id={item.id}
              style={{
                left: `calc(${item.x}% + 50%)`,
                top: `calc(${item.y}% + 50%)`,
              }}
            >
              <div className="textWrapper">
                <div className="buyText">
                  <a href={item.link || window.location.href}>Buy for {item.pricetag}</a>
                </div>
                <div className="text">{item.text}</div>
                <div className="arrow" />
              </div>
              <div className="dot" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
