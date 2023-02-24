const lookupObject = {
  customHost: "Could not fetch data from: URL_HERE",
  publish: "Fetch failed on fallback publish URL",
};

const getMessage = (type, url) => {
  let message = lookupObject[type];
  message = message.replace("URL_HERE", url);
  return message;
};

export default function ErrorComponent({ type, url, error }) {
  return (
    <div className="errorComponentWrapper">
      <div className="errorComponent">{getMessage(type, url)}</div>
    </div>
  );
}
