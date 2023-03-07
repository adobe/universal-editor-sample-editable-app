/* eslint-disable @next/next/no-img-element */

export default function LayerImage({ data, panelNr, host, viewType = "desktop" }) {
  const { image, altText, layerId, id, overflow, basePosition, debug, fit, forceLoad } = data;

  const typeLookup = {
    mobile: "mobile-vertical.webp",
    desktop: "desktop.webp",
  };

  const source = `${host}/${
    image?._path.startsWith("/") ? image._path.substring(1) : image._path
  }/_jcr_content/renditions/${typeLookup[viewType] || "desktop.webp"}`;

  return (
    <div className={`overflowImageWrapper  ${overflow ? "showOverflow" : "hideOverflow"}`}>
      <div
        id={layerId}
        className={`layerImage ${fit || ""} ${basePosition || "center-center"} ${debug ? "debug" : ""} ${
          overflow ? "showOverflow" : "hideOverflow"
        }`}
      >
        <img
          id={id}
          loading={panelNr === 0 || forceLoad ? "eager" : "lazy"}
          className="image"
          width={image?.width}
          height={image?.height}
          src={source}
          alt={altText?.plaintext || "Panel Image"}
        />
      </div>
    </div>
  );
}
