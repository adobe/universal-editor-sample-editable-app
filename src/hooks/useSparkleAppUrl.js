import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const useSparkleAppUrl = () => {
    const [queryParams] = useSearchParams();
    const queryParamsString = queryParams.toString();
    const sparkleUrl = useMemo(() => {
        const sparkleBaseUrl = "https://ue-sparkle-app.adobe.net/";
        if (queryParamsString) {
            return `${sparkleBaseUrl}?${decodeURIComponent(queryParamsString)}`;
        } else {
            return sparkleBaseUrl;
        }
    }, [queryParamsString]);
    return sparkleUrl;
}

export { useSparkleAppUrl };