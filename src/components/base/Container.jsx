import React from 'react';
import {fetchData} from '../../utils/fetchData';
import Text from './Text';
import Title from './Title';
import Image from './Image';

const Container = ({ itemID, itemType, isComponent = "" }) => {
  const [components, setComponents] = React.useState(null);

  const createChildComponents = (items, itemid) => {
    const components = [];
    for(let key in items) {
      const item = items[key];
      const type = item[":type"].split("/").pop();
      let itemType, Component;
      
      switch(type) {
        case "image": 
          itemType = "media";
          Component = Image;
          break;
        case "text": 
          itemType = item.richText ? "richtext" : "text";
          Component = item.type ? Title : Text;
          break;
        case "container": 
          itemType = "container";
          Component = Container;
          break;
        default: 
          itemType = "component";
          Component = () => (<div/>);
          break;
      }

      const props = {
        itemID: `${itemid}/${key}`,
        itemType,
        data: item,
        isComponent: "component"
      };
      components.push(<Component key={key} {...props} />)
    }
    return components;
  }

  React.useEffect(() => {
    if(!itemID) return;
    fetchData(itemID).then((data) => {
      setComponents(createChildComponents(data[":items"], itemID));
    });
  }, [itemID]);
  
  return (
    <div className="container" data-editor-itemmodel="container" data-editor-behavior={isComponent} itemScope itemID={itemID} itemType={itemType}>
     {components}
    </div>
  )
};

export default Container;