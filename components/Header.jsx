import Image from "next/image";

// const ArrowSvg = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
//     <title>S ChevronDown 18 N</title>
//     <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" />
//     <path
//       className="fill"
//       d="M4,7.01a1,1,0,0,1,1.7055-.7055l3.289,3.286,3.289-3.286a1,1,0,0,1,1.437,1.3865l-.0245.0245L9.7,11.7075a1,1,0,0,1-1.4125,0L4.293,7.716A.9945.9945,0,0,1,4,7.01Z"
//     />
//   </svg>
// );

export default function Header({ isAuthorVersion, host }) {
  return (
    <header className="header">
      <div className="content">
        <div className="left">
          <Image src={"/wknd-logo-dk.svg"} alt="logo" height={36} width={"100%"} className="logo" />
        </div>

        <ul className="middle">
          <a href="#">
            <li>adventures</li>
          </a>
          <a href="#">
            <li>magazine</li>
          </a>
          <a href="#">
            <li>settings</li>
          </a>
        </ul>

        <div className="right">
          {/* <button className="arrowButton">
            <ArrowSvg />
          </button> */}

          <a href="#" target="_blank" rel="noopener noreferrer" className="accountLink">
            <span>{isAuthorVersion ? "my account" : "login"}</span>
          </a>

          {isAuthorVersion && (
            <div className="accountIcon">
              <Image src={"/stacey-roswells.webp"} quality={100} width={42} height={42} alt="profile picture" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
