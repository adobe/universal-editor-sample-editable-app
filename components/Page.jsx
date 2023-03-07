import Panel from "../components/Panel";
import MobileHeader from "../components/MobileHeader";
import Head from "next/head";
import {useState, useEffect, useContext, useRef} from "react";
import {WindowSizeProvider} from "./ResizeProvider";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function Page({desktopData, mobileData, isAuthorVersion, host}) {
	const [data, setData] = useState(null);
	const [viewType, setViewType] = useState("desktop");
	const [hash, setHash] = useState(null);
	const [loadRest, setLoadRest] = useState(false);
	const [ignoreHash, setIgnoreHash] = useState(false);
	const [debugAnim, setDebugAnim] = useState(null);
	const [forceView, setForceView] = useState(null);

	const dynamicPanelHeight = useRef([window.innerHeight]);

	const handleHashUpdateEvent = e => {
		if (e.origin !== window.location.host && e.data.type !== "hashUpdate") {
			return;
		}
		setHash(e.data.hash);
	};

	useEffect(() => {
		// making sure a scrollbar is always visible if there are multiple panels, other panels are rendered later for performance.
		if (desktopData?.panels?.length > 1 || mobileData?.panels?.length > 1) {
			document.body.style.overflowY = "auto";
		}
		window.addEventListener("message", handleHashUpdateEvent);
		const searchParams = new URLSearchParams(window.location.search);

		const debugAnimQuery = searchParams.get("debugAnim");
		if (debugAnimQuery) {
			setDebugAnim(debugAnimQuery);
		}
		const forceViewQuery = searchParams.get("forceView");
		if (forceViewQuery) {
			setForceView(forceViewQuery);
		}

		// load rest of the panels, after 3s or when page is scrolled
		const timeout = setTimeout(() => {
			setLoadRest(true);
		}, 3000);

		const handleEarlyScroll = () => {
			setLoadRest(true);
			clearTimeout(timeout);
			window.removeEventListener("wheel", handleEarlyScroll);
			window.removeEventListener("touchmove", handleEarlyScroll);
		};

		window.addEventListener("wheel", handleEarlyScroll);
		window.addEventListener("touchmove", handleEarlyScroll);

		return () => {
			window.removeEventListener("message", handleHashUpdateEvent);
			window.removeEventListener("wheel", handleEarlyScroll);
			window.removeEventListener("touchmove", handleEarlyScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// reset content on width change
	const windowSize = useContext(WindowSizeProvider);
	useEffect(() => {
		if (windowSize.width === null || forceView) {
			return;
		}
		// reset data on resize if passing breakpoint with another viewType set
		if (windowSize.width > 840 && viewType !== "desktop") {
			setData(null);
			setIgnoreHash(false);
		}
		if (windowSize.width <= 840 && viewType !== "mobile") {
			setData(null);
			setIgnoreHash(false);
		}
	}, [windowSize.width, forceView, viewType]);

	// refresh scrolltrigger on height change
	useEffect(() => {
		if (windowSize.height === null) {
			return;
		}
		ScrollTrigger.refresh();
	}, [windowSize.height]);

	// setData depending on width if data is null
	// data must be set to null for one render, in order to fully remove animations
	useEffect(() => {
		if (data !== null) {
			return;
		}
		if (forceView) {
			if (forceView.toLocaleLowerCase() === "desktop") {
				setData(desktopData);
				setViewType("desktop");
			}
			if (forceView.toLocaleLowerCase() === "mobile") {
				setData(mobileData);
				setViewType("mobile");
			}
		} else {
			if (windowSize.width > 840 || windowSize.width === null) {
				setData(desktopData);
				setViewType("desktop");
			} else {
				setData(mobileData);
				setViewType("mobile");
			}
		}
		ScrollTrigger.refresh();
	}, [data, desktopData, mobileData, windowSize.width, forceView]);

	// if a hash exists don't wait for first animation to finish
	useEffect(() => {
		if (window.location.hash) {
			setLoadRest(true);
			setHash(window.location.hash);
		}
	}, [viewType]);

	return (
		data && (
			<div className={"page"} style={viewType === "mobile" ? {maxWidth: 840, margin: "0 auto"} : null}>
				<Head>
					<title>{data?.title || "Sparkle Demo"}</title>
					<meta name="description" content={data?.description?.plaintext}/>
				</Head>
				{viewType === "mobile" && (
					<MobileHeader
						isAuthorVersion={isAuthorVersion}
						host={host}
						mobileNavObj={data?.mobileNavMenu}
						debugAnim={debugAnim}
						maxWidth={840}
					/>
				)}
				{data?.panels?.map &&
					data.panels.map((panel, index) => {
						if (index !== 0 && !loadRest) {
							return null;
						}
						return (
							<Panel
								panel={panel}
								panelNr={index}
								dynamicPanelHeight={dynamicPanelHeight.current[0]}
								settings={{viewType}}
								key={index}
								isAuthorVersion={isAuthorVersion}
								host={host}
								hash={hash}
								ignoreHash={ignoreHash}
								setIgnoreHash={setIgnoreHash}
								viewType={viewType}
							/>
						);
					})}
			</div>
		)
	);
}
