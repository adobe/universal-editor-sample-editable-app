import { scrollToId } from "./utils";
import { useEffect, useState } from "react";
import Image from "next/image";

const DropdownIcon = () => (
  <svg className="dropdownIcon" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
    <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" />
    <path
      className="fill"
      d="M4,7.01a1,1,0,0,1,1.7055-.7055l3.289,3.286,3.289-3.286a1,1,0,0,1,1.437,1.3865l-.0245.0245L9.7,11.7075a1,1,0,0,1-1.4125,0L4.293,7.716A.9945.9945,0,0,1,4,7.01Z"
    />
  </svg>
);

const MenuButtonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
    <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" />
    <path
      className="fill"
      d="M13.2425,3.343,9,7.586,4.7575,3.343a.5.5,0,0,0-.707,0L3.343,4.05a.5.5,0,0,0,0,.707L7.586,9,3.343,13.2425a.5.5,0,0,0,0,.707l.707.7075a.5.5,0,0,0,.707,0L9,10.414l4.2425,4.243a.5.5,0,0,0,.707,0l.7075-.707a.5.5,0,0,0,0-.707L10.414,9l4.243-4.2425a.5.5,0,0,0,0-.707L13.95,3.343a.5.5,0,0,0-.70711-.00039Z"
    />
  </svg>
);

export default function MobileHeader({ maxWidth, isAuthorVersion, host, mobileNavObj, debugAnim }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [navLabel, setNavLabel] = useState(mobileNavObj?.menuItems[0].text || "Navigation");

  const navItems = mobileNavObj?.menuItems || [];

  // runs passed function if timeout has gone by without being called again.
  function debounce(func, wait) {
    let timeout;
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(func, wait);
    };
  }

  function findCurrentElement() {
    // searches each nav item for closest.
    let newLabel = null;
    for (let i = 0; i < navItems.length; i++) {
      const element = document.getElementById(navItems[i].link.substring(1));
      if (!element) {
        continue;
      }
      const rect = element.getBoundingClientRect();
      // if top of panel is within top half of screen
      if (rect.top < window.innerHeight / 2) {
        newLabel = navItems[i].text;
      }
    }
    // after finding the closest label set that as nav button label.
    newLabel && setNavLabel(newLabel);
  }

  // run without debounce if debugAnim is not set
  const handleScroll = debounce(() => findCurrentElement(), debugAnim !== "instant" ? 100 : 0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const onClickHandler = link => {
    if (link) {
      scrollToId(link);
    }
    // add hash to url without refreshing page
    window.history.replaceState(window.location.href.split("#")[0], null, link);
    window.postMessage({ type: "hashUpdate", hash: link }, window.location.origin);
    setOpenNav(false);
  };

  return (
    <header className="mobileHeaderWrapper" style={{ maxWidth }}>
      <div className="mainHeader">
        <button
          className={`menuButton ${openMenu ? "menuOpen" : "menuClosed"}`}
          id={"mobile-menu-button"}
          aria-label="Menu Button"
          aria-controls="mobileHeaderMenu"
          aria-expanded={openMenu ? true : false}
          onClick={() => setOpenMenu(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
            <defs></defs> <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" />
            <rect className="fill" height="2" rx="0.5" width="14" x="2" y="8" />
            <rect className="fill" height="2" rx="0.5" width="14" x="2" y="3" />
            <rect className="fill" height="2" rx="0.5" width="14" x="2" y="13" />
          </svg>
        </button>

        {/* eslint-disable @next/next/no-img-element */}
        <img
          src={"/wknd-logo-dk.svg"}
          alt="logo"
          height={22}
          quality={100}
          width={60}
          className={`logo ${openMenu ? "menuOpen" : "menuClosed"}`}
        />
        {/* eslint-enable @next/next/no-img-element */}

        <span className="profileIconWrapper">
          <Image
            quality={100}
            className="menuProfileIcon"
            src={"/stacey-roswells.webp"}
            width={42}
            height={42}
            alt="profile picture"
          />
        </span>
      </div>

      <nav className="headerNavigation">
        <button
          className={`navigationButton ${openNav ? "navOpen" : "navClosed"}`}
          id={"mobile-nav-button"}
          onClick={() => setOpenNav(!openNav)}
          aria-label="Navigation Button"
          aria-controls="navigationMenu"
          aria-expanded={openNav ? true : false}
        >
          <span>{navLabel}</span>
          <DropdownIcon />
        </button>
        <menu
          aria-labelledby="mobile-nav-button"
          id="navigationMenu"
          className={`navigationMenu ${openNav ? "open" : "closed"}`}
        >
          <ul>
            {navItems.map((item, index) => {
              return (
                <span onClick={() => onClickHandler(item.link)} key={index}>
                  <li> {item.text} </li>
                </span>
              );
            })}
          </ul>
        </menu>
      </nav>

      <menu
        id="mobileHeaderMenu"
        aria-labelledby="mobile-menu-button"
        className={`headerMenu ${openMenu ? "open" : "closed"}`}
        style={{ maxWidth: maxWidth ? maxWidth * 0.6 : null }}
      >
        <div className="top">
          <button className="closeButton menuButton" onClick={() => setOpenMenu(false)}>
            <MenuButtonIcon />
          </button>
        </div>

        <div className="list">
          <ul>
            <li>adventures</li>
            <li>magazine</li>
            <li>settings</li>
          </ul>
        </div>

        <div className="bottom">
          <a href={isAuthorVersion ? window.location.href : host} target="_blank" rel="noopener noreferrer">
            <span>{isAuthorVersion ? "my account" : "login"}</span>
          </a>

          {isAuthorVersion && (
            <Image quality={100} src={"/stacey-roswells.webp"} width={40} height={40} alt="profile picture" />
          )}
        </div>
      </menu>
    </header>
  );
}
