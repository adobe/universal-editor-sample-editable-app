import {Html, Head, Main, NextScript} from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" href="/favicon.ico"/>
				<link
					fetchpriority="high"
					rel="preload"
					href="/wknd-logo-dk.svg"
					id="wknd-logo"
					as="image"
					type="image/svg+xml"
				/>

				<link rel="DNS-prefetch" href="https://use.typekit.net"/>
				<link rel="preconnect" href="https://use.typekit.net" crossOrigin="true"/>
				<link rel="DNS-prefetch" href="https://p.typekit.net"/>
				<link rel="preconnect" href="https://p.typekit.net" crossOrigin="true"/>
				<link rel="stylesheet" href="https://use.typekit.net/bud6jdy.css"/>


				<Script id="dataFetchScript" type="module" src="/dataFetch.js" strategy="beforeInteractive"/>
			</Head>
			<body>
			<Main/>
			<NextScript/>
			<script src="universal-editor-embedded.js" async></script>
			</body>
		</Html>
	);
}
