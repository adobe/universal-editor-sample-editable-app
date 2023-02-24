import { useEffect, useState } from "react";
import ErrorComponent from "../components/ErrorComponent";
import Page from "../components/Page";

export default function Graphiql(props) {
  const [desktopData, setDesktopData] = useState(null);
  const [mobileData, setMobileData] = useState(null);
  const [isAuthorVersion, setIsAuthorVersion] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [customHost, setCustomHost] = useState("");

  useEffect(() => {
    window.mobileData &&
      window.mobileData.then(data => {
        if (!data) {
          setFetchError({ type: "publish", host: window.customHost });
          return;
        }
        setMobileData(data.data.pageByPath.item);
        setCustomHost(window.customHost);
        setIsAuthorVersion(window.isAuthorHost);
      });
    window.desktopData &&
      window.desktopData.then(data => {
        if (!data) {
          setFetchError({ type: "publish", host: window.customHost });
          return;
        }
        setDesktopData(data.data.pageByPath.item);
        setCustomHost(window.customHost);
        setIsAuthorVersion(window.isAuthorHost);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !desktopData && !mobileData ? (
    fetchError ? (
      <ErrorComponent type={fetchError.type} url={fetchError.host} error={fetchError.error} />
    ) : null
  ) : (
    <Page desktopData={desktopData} mobileData={mobileData} isAuthorVersion={isAuthorVersion} host={customHost} />
  );
}
