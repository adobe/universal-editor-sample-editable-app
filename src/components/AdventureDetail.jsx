/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import backIcon from '../images/Back.svg';
import Error from './base/Error';
import Loading from './base/Loading';
import {mapJsonRichText} from '../utils/renderRichText';
import './AdventureDetail.scss';
import useGraphQL from '../api/useGraphQL';
import {getPublishHost} from "../utils/fetchData";

function AdventureDetail() {
	// params hook from React router
	const {slug} = useParams();
	const navigate = useNavigate();
	const persistentQuery = `wknd-shared/adventure-by-slug;slug=${slug}`;

	//Use a custom React Hook to execute the GraphQL query
	const {data, errorMessage} = useGraphQL(persistentQuery);

	//If there is an error with the GraphQL query
	if (errorMessage) return <Error errorMessage={errorMessage}/>;

	//If query response is null then return a loading icon...
	if (!data) return <Loading/>;

	//Set adventure properties variable based on graphQL response
	const currentAdventure = getAdventure(data);

	// set references of current adventure
	const references = data.adventureList._references;

	//Must have title, path, and image
	if (!currentAdventure) {
		return <NoAdventureFound/>;
	}

	const editorProps = {
		"data-aue-resource": "urn:aemconnection:" + currentAdventure._path + "/jcr:content/data/master",
		"data-aue-type": "reference",
		itemfilter: "cf"
	};

	return (
    <div  {...editorProps} className="adventure-detail">
        <div><div className="adventure-detail-header">
            <button className="adventure-detail-back-nav dark" onClick={() => navigate(-1)}>
                <img className="Backbutton-icon" src={backIcon} alt="Return"/> Adventures
            </button>
            <h1 className="adventure-detail-title" data-aue-prop="title" data-aue-type="text">{currentAdventure.title}</h1>
            <div className="pill default">
							<span 
								data-aue-prop="activity" data-aue-type="text"
							>{currentAdventure.activity}
							</span>
						</div>
        </div></div>
		<AdventureDetailRender {...currentAdventure} references={references}/>
	</div>
    );
}

function AdventureDetailRender({
								   title,
								   primaryImage,
								   adventureType,
								   tripLength,
								   groupSize,
								   difficulty,
								   description,
								   itinerary, references
							   }) {
	return (<div>
            <img className="adventure-detail-primaryimage"
					 src={`${getPublishHost()}${primaryImage._path}`} alt={title} data-aue-prop="primaryImage" data-aue-type="media"/>			
			<div className="adventure-detail-content">
				
				<div data-aue-prop="description"
					 data-aue-type="richtext">{mapJsonRichText(description.json, customRenderOptions(references))}</div>
                <div className="adventure-detail-info">
                    <div className="adventure-detail-info-label">
                        <h6>Adventure Type</h6>
                        <span 
												data-aue-prop='adventureType' data-aue-type="text"
												>{adventureType}</span>
                    </div>
                    <div className="adventure-detail-info-label">
                        <h6>Trip Length</h6>
                        <span 
												data-aue-prop='tripLength' data-aue-type="text"
												>{tripLength}</span>
                    </div>
                    <div className="adventure-detail-info-label">
                        <h6>Difficulty</h6>
                        <span 
												data-aue-prop='difficulty' data-aue-type="text"
												>{difficulty}</span>
                    </div>
                    <div className="adventure-detail-info-label">
                        <h6>Group Size</h6>
                        <span 
												data-aue-prop='groupSize' data-aue-type="text"
												>{groupSize}</span>
                    </div>
                </div>
				<h6>Itinerary</h6>
				<div data-aue-prop="itinerary" data-aue-type="richtext"
					 className="adventure-detail-itinerary">{mapJsonRichText(itinerary.json)}</div>
			</div>

		</div>
	);

}

function NoAdventureFound() {
	return (
		<div className="adventure-detail">
			<Link className="adventure-detail-close-button" to={`/${window.location.search}`}>
				<img className="Backbutton-icon" src={backIcon} alt="Return"/>
			</Link>
			<Error errorMessage="Missing data, adventure could not be rendered."/>
		</div>
	);
}

/**
 * Helper function to get the first adventure from the response
 * @param {*} response
 */
function getAdventure(data) {

	if (data && data.adventureList && data.adventureList.items) {
		return data.adventureList.items.find(item => {
			return item._path.startsWith("/content/dam/wknd-shared/en");
		});
	}
	return undefined;
}

/**
 * Example of using a custom render for in-line references in a multi line field
 */
function customRenderOptions(references) {

	const renderReference = {
		// node contains merged properties of the in-line reference and _references object
		'ImageRef': (node) => {
			// when __typename === ImageRef
			return <img src={node._path} alt={'in-line reference'}/>
		},
		'AdventureModel': (node) => {
			// when __typename === AdventureModel
			return <Link to={`/adventure:${node.slug}`}>{`${node.title}: ${node.price}`}</Link>;
		}
	};

	return {
		nodeMap: {
			'reference': (node, children) => {

				// variable for reference in _references object
				let reference;

				// asset reference
				if (node.data.path) {
					// find reference based on path
					reference = references.find(ref => ref._path === node.data.path);
				}
				// Fragment Reference
				if (node.data.href) {
					// find in-line reference within _references array based on href and _path properties
					reference = references.find(ref => ref._path === node.data.href);
				}

				// if reference found return render method of it
				return reference ? renderReference[reference.__typename]({...reference, ...node}) : null;
			}
		},
	};
}

export default AdventureDetail;
