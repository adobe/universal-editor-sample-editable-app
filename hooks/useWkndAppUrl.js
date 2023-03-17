import { useRouter } from "next/router";
import { useMemo } from "react";

const useWkndAppUrl = (path) => {
    const router = useRouter();
    const queryParams = router.query;
    return useMemo(() => {
        const wkndAppBaseUrl = "https://ue-remote-app.adobe.net";
        const wkndAppUrl = path ? `${wkndAppBaseUrl}${path}` : wkndAppBaseUrl;
        if (Object.keys(queryParams).length) {
            const params = [];
            for (let param in queryParams) {
                params.push([param, queryParams[param]]);
            }
            let allQueryParams = params.reduce(
                (accumulator, currentValue, currentIndex) =>
                    accumulator + `${currentValue[0]}=${currentValue[1]}${currentIndex !== params.length - 1 ? "&" : ""}`,
                `?`,
            );
            return `${wkndAppUrl}${allQueryParams}`;
        }
        return wkndAppUrl;
    }, [queryParams]);
}

export { useWkndAppUrl }