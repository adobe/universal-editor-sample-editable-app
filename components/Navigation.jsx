import { useWkndAppUrl } from "../hooks";

export default function Navigation() {
    const wkndAppUrl = useWkndAppUrl();
    const wkndAppMagazineUrl = useWkndAppUrl("/articles");
    const wkndAppMagazineAboutUsUrl = useWkndAppUrl("/aboutus");

    return (
        <>
            <a href={wkndAppUrl}>
                <li>adventures</li>
            </a>
            <a href={wkndAppMagazineUrl}>
                <li>magazine</li>
            </a>
            <a href={wkndAppMagazineAboutUsUrl}>
                <li>about us</li>
            </a>
        </>
    )
}