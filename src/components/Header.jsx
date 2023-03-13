import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import logo from "../images/wknd-logo-dk.svg";

const Header = () => {
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

    return (
        <header>
            <a href={sparkleUrl}>
                <img src={logo} className="logo" alt="WKND Logo" />
            </a>
            <hr />
        </header>
    );
};

export default Header;