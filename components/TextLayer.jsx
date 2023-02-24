import Menu from "./Menu";

const textItemLookup = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  a: "a",
  p: "p",
  span: "span",
  button: "button",
};

const isMenu = obj => {
  return obj?._model.title === "Panel Menu";
};

export default function TextLayer({ data, activeMenuItem }) {
  return (
    <div className={"textLayer"} id={data?.id}>
      {data?.column?.length ? (
        <div className={`columnWrapper ${data?.textPosition || ""} ${data?.noPadding ? "noPadding" : ""}`}>
          {data?.column?.map((item, index) => {
            const MatchingComponent = textItemLookup[item.type] || "p";
            return (
              <MatchingComponent key={index} className={`${item.type} ${item?.styles?.join(" ")}`} id={item.id}>
                {item.content?.plaintext}
              </MatchingComponent>
            );
          })}
        </div>
      ) : null}

      <div className="left">
        {data?.leftBox?.map((item, index) => {
          const MatchingComponent = textItemLookup[item.type] || "p";
          return (
            <MatchingComponent key={index} className={`${item.type} ${item?.styles?.join(" ")}`} id={item.id} itemScope itemID="abc" itemProp="abc" itemType="text">
              {item.content?.plaintext}
            </MatchingComponent>
          );
        })}
      </div>

      <div className="right">
        {data?.rightBox?.map((item, index) => {
          const MatchingComponent = isMenu(item) ? Menu : textItemLookup[item.type] || "p";
          return (
            <MatchingComponent
              menuItems={item.menuItems}
              activeMenuItem={activeMenuItem}
              key={index}
              className={`${item.type} ${item?.styles?.join(" ")}`}
              id={item.id}
            >
              {item.content?.plaintext}
            </MatchingComponent>
          );
        })}
      </div>
    </div>
  );
}
