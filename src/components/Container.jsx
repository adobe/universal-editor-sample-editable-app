import React from 'react';
import {fetchData} from '../utils/fetchData';
import Text from './Text';
import Title from './Title';
const Container = ({ itemID, itemType }) => {
  const [components, setComponents] = React.useState(null);

  const createChildComponents = (items, itemid) => {
    const components = [];
    for(let key in items) {
      const props = {
        itemID: `${itemid}/${key}`,
        itemType: items[key].richText ? "richtext" : "text",
        data: items[key],
        isComponent: "component"
      };
      const Component =  items[key].type ? Title : Text;
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
    <div itemScope itemID={itemID} itemType={itemType}>
     {components}
    </div>
  )
};

export default Container;