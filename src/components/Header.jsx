import React from "react";
import logo from "../images/wknd-logo-dk.svg";
import { useSparkleAppUrl } from "../hooks";

const Header = () => {
    const sparkleAppUrl = useSparkleAppUrl();
    return (
        <header>
            <a href={sparkleAppUrl}>
                <img src={logo} className="logo" alt="WKND Logo" />
            </a>
            <hr />
        </header>
    );
};

export default Header;