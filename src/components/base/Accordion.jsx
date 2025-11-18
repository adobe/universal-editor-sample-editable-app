import React from 'react';
import Container from './Container';
import './Accordion.scss';

const AccordionItem = (props) => {
    const {resource, data, isOpen, onToggle} = props;

    return(
        <div className={`accordion-item ${isOpen ? 'is-open' : ''}`} data-aue-component="accordion-item" data-aue-resource={resource} data-aue-type="component" data-aue-label="Accordion Item">
            <div className="accordion-item-title" onClick={onToggle}>
                <h3 data-aue-prop="cq:panelTitle" data-aue-type="text" data-aue-label="Title">{data["cq:panelTitle"]}</h3>
                <span className="accordion-item-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
            </div>
            <div className="accordion-item-content">
                <div className="accordion-item-content-inner">
                    <Container resource={resource} type="container" data={data} label="Content" />
                </div>
            </div>
        </div>
    );
}


const Accordion = (props) => {
    const {resource, type, data} = props;
    const [items, setItems] = React.useState([]);
    const [openItems, setOpenItems] = React.useState(new Set());

    React.useEffect(() => {
        if(!data) return;
        const itemKeys = Object.keys(data).filter((item) => {
            return data[item]["sling:resourceType"] === "wknd/components/container";
        });
        setItems(itemKeys);
        
        // Optionally open the first item by default
        if (itemKeys.length > 0) {
            setOpenItems(new Set([0]));
        }
    }, [resource, type, data]);

    const toggleItem = (index) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };
    
    return (
        <div className="accordion" data-aue-component="accordion" data-aue-resource={resource} data-aue-type={type} data-aue-label="Accordion">
            {items.map((item, index) => (
                <AccordionItem 
                    key={`${resource}/${item}`} 
                    resource={`${resource}/${item}`} 
                    type={type} 
                    data={data[item]} 
                    isOpen={openItems.has(index)}
                    onToggle={() => toggleItem(index)}
                />
            ))}
        </div>
    )
}

export default Accordion;
