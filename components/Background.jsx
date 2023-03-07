/* eslint-disable @next/next/no-img-element */

export default function Background({ backgroundProps, lazy, host, viewType }) {
  const { backgroundContent, altText, color, zIndex } = backgroundProps;

  const typeLookup = {
    mobile: "mobile-vertical.webp",
    desktop: "desktop.webp",
  };

  const isVideo = backgroundContent?.format?.includes("video/");

  let source = host + "/";
  if (backgroundContent?._path?.startsWith("/")) {
    source = source + backgroundContent?._path?.substring(1);
  } else {
    source = source + backgroundContent?._path;
  }
  if (!isVideo) {
    source = source + `/_jcr_content/renditions/${typeLookup[viewType] || "desktop.webp"}`;
  }

  return (
    <div className={`backgroundWrapper ${isVideo ? "isVideo" : ""}`} style={{ backgroundColor: color, zIndex }}>
      {backgroundContent?.type === "image" && (
        <img
          src={source}
          alt={altText || "Panel Background"}
          className="backgroundImage"
          loading={lazy ? "lazy" : "eager"}
        />
      )}
      {backgroundContent?.format?.includes("video/") && (
        <video className="videoWrapper" autoPlay loop muted>
          <source src={source} />
        </video>
      )}
    </div>
  );
}
