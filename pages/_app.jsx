import Head from "next/head";
import "../styles/globals.scss";
import {TimelineAnimationWrapper} from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";
import {useRouter} from "next/router";

function MyApp({Component, pageProps}) {
	const router = useRouter();
	const author = router.query["authorHost"];

	return (
		<>
			<Head>
				<title>Sparkle Demo</title>
				<meta name="urn:auecon:aem" content={author ? `aem:${author}` : 'aem:https://author-p7452-e12433.adobeaemcloud.com'}/>
			</Head>

			<ResizeProvider>
				<TimelineAnimationWrapper>
					<Component {...pageProps} />
				</TimelineAnimationWrapper>
			</ResizeProvider>
		</>
	);
}

export default MyApp;
