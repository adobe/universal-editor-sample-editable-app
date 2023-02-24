import { scrollToId } from "../utils";

const onClickHandler = link => {
  if (link) {
    scrollToId(link);
  }
  // add hash to url without refreshing page
  window.history.replaceState(window.location.href.split("#")[0], null, link);
  window.postMessage({ type: "hashUpdate", hash: link }, window.location.origin);
};

export default function Menu({ menuItems, activeMenuItem }) {
  return (
    <div className="menuWrapper">
      <ul className="menuList">
        {menuItems.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickHandler(item?.link)}
              className={`menuListItem ${activeMenuItem === item.menuItemId ? "active" : ""}`}
              id={"menuItem-" + item.menuItemId}
            >
              {item.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
