import React from 'react';
import {fetchData} from '../../utils/fetchData';
import Text from './Text';
import Title from './Title';
const Container = ({ itemID, itemType }) => {
  const [components, setComponents] = React.useState(null);

  const createChildComponents = (items, itemid) => {
    const components = [];
    for(let key in items) {
      const item = items[key];
      const isContainer = !!item[":items"];
      const props = {
        itemID: `${itemid}/${key}`,
        itemType: isContainer ? "container" : item.richText ? "richtext" : "text",
        data: item,
        isComponent: isContainer ? false: "component"
      };
      const Component =  isContainer ? Container : item.type ? Title : Text;
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
    <div classname="container" itemScope itemID={itemID} itemType={itemType}>
     {components}
    </div>
  )
};

export default Container;