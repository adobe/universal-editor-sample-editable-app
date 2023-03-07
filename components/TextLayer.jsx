import Menu from "./Menu";
import {v4 as uuidv4} from 'uuid';

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

export default function TextLayer({data, activeMenuItem, panelNr}) {
	return (panelNr === 5 && data.id === null || panelNr === 5 && data.id === 'layer-button'?
			(<div className={"textLayer"} id={data.id}>
				{data?.column?.length ?
					<div className={`columnWrapper ${data?.textPosition || ""} ${data?.noPadding ? "noPadding" : ""}`} >
						{data?.column?.map((item, index) => {
							const MatchingComponent = textItemLookup[item.type] || "p";
							return (
								<MatchingComponent
									key={index + data.id}
									className={`${item.type} ${item?.styles?.join(" ")}`}
									id={item.id}
									itemScope
									itemID={`urn:aem:${item._path}/jcr:content/data/master`}
									itemProp="content"
									itemType="text"
								>
									{item.content?.plaintext}
								</MatchingComponent>
							);
						})}
					</div> : null
				}

				{data?.leftBox?.length ?
					<div className="left">
						{data?.leftBox?.map((item, index) => {
							const MatchingComponent = textItemLookup[item.type] || "p";
							return (
								<MatchingComponent
									key={index + data.id}
									className={`${item.type} ${item?.styles?.join(" ")}`}
									id={item.id}
									itemScope itemID={`urn:aem:${item._path}/jcr:content/data/master`}
									itemProp="content"
									itemType="text"
								>
									{item.content?.plaintext}
								</MatchingComponent>
							);
						})}
					</div> : null
				}

				{data?.rightBox?.length ? (
					<div className="right">
						{data?.rightBox?.map((item, index) => {
							const MatchingComponent = isMenu(item) ? Menu : textItemLookup[item.type] || "p";
							return (
								<MatchingComponent
									menuItems={item.menuItems}
									activeMenuItem={activeMenuItem}
									panelNr={panelNr}
									key={index}
									className={`${item.type} ${item?.styles?.join(" ")}`}
									id={item.id}
								>
									{item.content?.plaintext}
								</MatchingComponent>
							);
						})}
					</div>) : null
				}
			</div>) :
			(<div className={"textLayer"} id={data.id} itemID={`urn:aem:${data?._path}/jcr:content/data/master`}
				  itemType="reference" itemScope>
				{data?.column?.length ? <div className={`columnWrapper ${data?.textPosition || ""} ${data?.noPadding ? "noPadding" : ""}`}
											 itemType="container" itemProp="column"
				>
					{data?.column?.map((item, index) => {
						const columnKey = uuidv4();
						const MatchingComponent = textItemLookup[item.type] || "p";
						return (
							<div key={columnKey}
								 itemScope
								 itemID={`urn:aem:${item._path}/jcr:content/data/master`}
								 itemType="reference" data-editor-behavior="component"
							>
								<MatchingComponent
									className={`${item.type} ${item?.styles?.join(" ")}`}
									id={item.id}
									itemProp="content"
									itemType="text"
								>
									{item.content?.plaintext}
								</MatchingComponent>
							</div>);
					})}
				</div> : null
				}

				{data?.leftBox?.length ? <div className="left" itemType="container" itemProp="leftBox">
					{data?.leftBox?.map((item, index) => {
						const MatchingComponent = textItemLookup[item.type] || "p";
						const leftKey = uuidv4();
						return (
							<div key={leftKey} itemScope itemID={`urn:aem:${item._path}/jcr:content/data/master`}
								 itemType="reference" data-editor-behavior="component">
								<MatchingComponent
									className={`${item.type} ${item?.styles?.join(" ")}`}
									id={item.id}
									itemProp="content"
									itemType="text"
								>
									{item.content?.plaintext}
								</MatchingComponent>
							</div>
						);
					})}
				</div> : null
				}

				{data?.rightBox?.length ? <div className="right" itemType="container" itemProp="rightBox">
					{data?.rightBox?.map((item, index) => {
						const MatchingComponent = isMenu(item) ? Menu : textItemLookup[item.type] || "p";
						return (
							<MatchingComponent
								menuItems={item.menuItems}
								activeMenuItem={activeMenuItem}
								panelNr={panelNr}
								key={index}
								className={`${item.type} ${item?.styles?.join(" ")}`}
								id={item.id}
							>
								{item.content?.plaintext}
							</MatchingComponent>
						);
					})}
				</div> : null
				}
			</div>)
	);
}
