/*
Copyright 2022 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import backIcon from '../images/icon-close.svg';
import Error from './base/Error';
import Loading from './base/Loading';
import {mapJsonRichText} from '../utils/renderRichText';
import './AdventureDetail.scss';
import useGraphQL from '../api/useGraphQL';

const {REACT_APP_PUBLISH_URI} = process.env;

function AdventureDetail() {

	// params hook from React router
	const {slug} = useParams();
	const navigate = useNavigate();
	const adventureSlug = slug.substring(1);

	const persistentQuery = `wknd-shared/adventure-by-slug;slug=${adventureSlug}`;

	//Use a custom React Hook to execute the GraphQL query
	const {data, errorMessage} = useGraphQL('', persistentQuery);

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
		itemID: "urn:aemconnection:" + currentAdventure._path + "/jcr:content/data/master",
		itemType: "reference",
		itemfilter: "cf"
	};

	return (<div  {...editorProps} itemScope className="adventure-detail">
		<button className="adventure-detail-close-button" onClick={() => navigate(-1)}>
			<img className="Backbutton-icon" src={backIcon} alt="Return"/>
		</button>
		<AdventureDetailRender {...currentAdventure} references={references}/>
	</div>);
}

function AdventureDetailRender({
								   _path, title,
								   primaryImage,
								   activity,
								   adventureType,
								   tripLength,
								   groupSize,
								   difficulty,
								   price,
								   description,
								   itinerary,
								   contributor, references
							   }) {
	return (<div>
			<h1 className="adventure-detail-title" itemProp="title" itemType="text">{title}</h1>
			<div className="adventure-detail-info">
				<div className="adventure-detail-info-label">Activity</div>
				<div className="adventure-detail-info-description" itemProp='activity' itemType="text">{activity}</div>
				<div className="adventure-detail-info-label">Type</div>
				<div className="adventure-detail-info-description" itemProp='adventureType'
					 itemType="text">{adventureType}</div>
				<div className="adventure-detail-info-label">Trip Length</div>
				<div className="adventure-detail-info-description" itemProp='tripLength'
					 itemType="text">{tripLength}</div>
				<div className="adventure-detail-info-label">Group Size</div>
				<div className="adventure-detail-info-description" itemProp='groupSize'
					 itemType="text">{groupSize}</div>
				<div className="adventure-detail-info-label">Difficulty</div>
				<div className="adventure-detail-info-description" itemProp='difficulty'
					 itemType="text">{difficulty}</div>
			</div>
			<div className="adventure-detail-content">
				<img className="adventure-detail-primaryimage"
					 src={`${REACT_APP_PUBLISH_URI}${primaryImage._path}`} alt={title} itemType="image"/>
				<div itemProp="description"
					 itemType="richtext">{mapJsonRichText(description.json, customRenderOptions(references))}</div>
				<h2>Itinerary</h2>
				<hr/>

				{/* Render the itinerary without any custom render options (just use defaults) */}
				<div itemProp="itinerary" itemType="richtext"
					 className="adventure-detail-itinerary">{mapJsonRichText(itinerary.json)}</div>
			</div>
		</div>
	);

}

function NoAdventureFound() {
	return (
		<div className="adventure-detail">
			<Link className="adventure-detail-close-button" to={"/"}>
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
		// expect there only to be a single adventure in the array
		if (data.adventureList.items.length === 1) {
			return data.adventureList.items[0];
		}
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
