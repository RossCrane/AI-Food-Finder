// Dependencies:
import React from 'react';
import Accordion from './accordion';
import { accordionData } from './content';

// Styles:
import './ai_options.css';

const AIOptions = () => {
	return (
		<div>
			<h2>Options</h2>
			<div className="accordion">
				{accordionData.map(({ title, content }) => (
					<Accordion title={title} content={content} />
				))}
			</div>
		</div>
	);
};

export default AIOptions;
