import React from 'react';
import {fetchData} from '../../utils/fetchData';
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
    <div classname="container" itemScope itemID={itemID} itemType={itemType}>
     {components}
     {/* <div id="test" itemScope itemID={`${itemID}/container`} itemType={itemType} {...{"data-editor-behavior": "component"}}>
      <Text key={1} {...{itemID: `${1}/text`,itemType: "text", isComponent: "component",data:{text:"hello1"}}} />
      <Text key={2} {...{itemID: `${2}/text`,itemType: "text", isComponent: "component",data:{text:"hello2"}}} />
     </div> */}
    </div>
  )
};

export default Container;