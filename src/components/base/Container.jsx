import React from 'react';
import {fetchData} from '../../utils/fetchData';
import Text from './Text';
import Title from './Title';
import Image from './Image';

const Container = ({ resource, type, isComponent = "" }) => {
  const [components, setComponents] = React.useState(null);

  const createChildComponents = (items, itemid) => {
    const components = [];
    for(let key in items) {
      const item = items[key];
      const type = item["sling:resourceType"]?.split("/").pop();
      if (type === undefined) {
        continue;
      }

      let itemType, Component;
      switch(type) {
        case "image": 
          itemType = "media";
          Component = Image;
          break;
        case "text": 
          itemType = item.textIsRich ? "richtext" : "text";
          Component = item.type ? Title : Text;
          break;
        case "title":
            itemType = "text";
            Component = Title;
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
        resource: `${itemid}/${key}`,
        type: itemType,
        data: item,
      };
      components.push(<Component key={key} {...props} />)
    }
    return components;
  }

  React.useEffect(() => {
    if(!resource) return;
    fetchData(resource).then((data) => {
      setComponents(createChildComponents(data, resource));
    });
  }, [resource]);
  
  return (
    <div className="container" data-aue-component="container" data-aue-resource={resource} data-aue-type={type}>
     {components}
    </div>
  )
};

export default Container;