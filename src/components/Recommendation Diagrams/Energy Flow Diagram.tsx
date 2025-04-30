import React from 'react';
import { Chart } from 'react-google-charts';

export const EnergyFlowDiagram: React.FC = () => {
	const data = [
		["From", "To", "Weight"],
		["Main Energy Source (100%)", "Drawing Room (25%)", 25],
		["Main Energy Source (100%)", "Bed Room (25%)", 25],
		["Main Energy Source (100%)", "Kitchen (50%)", 50],
		["Drawing Room (25%)", "AC 30.77%", (25 / 100) * 30.77],
		["Drawing Room (25%)", "Bulbs 5.77%", (25 / 100) * 5.77],
		["Drawing Room (25%)", "Fan 12.92%", (25 / 100) * 12.92],
		["Drawing Room (25%)", "TV 1.85%", (25 / 100) * 1.85],
		["Bed Room (25%)", "AC 30.77%", (25 / 100) * 30.77], // Assuming some AC in bedroom
		["Bed Room (25%)", "Bulbs 5.77%", (25 / 100) * 5.77], // Assuming some bulbs in bedroom
		["Bed Room (25%)", "Fan 12.92%", (25 / 100) * 12.92], // Assuming some fan in bedroom
		["Kitchen (50%)", "Dish Washer 11.54%", (50 / 100) * 11.54],
		["Kitchen (50%)", "Stove 17.69%", (50 / 100) * 17.69],
		["Kitchen (50%)", "Oven 17.69%", (50 / 100) * 17.69],
		["Kitchen (50%)", "Fridge 1.77%", (50 / 100) * 1.77],
	];

	const options = {
		// Add any specific options you need for the Sankey chart.  For example:
		// sankey: {
		//   node: {
		//     colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c']
		//   },
		//   link: {
		//     colorMode: 'source',
		//     colors: ['#a6cee3', '#b2df8a', '#fdb462', '#33a02c']
		//   }
		// }
	};

	return (
		<div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
			<Chart
				chartType="Sankey"
				width="100%"
				height="95%"
				data={data}
				options={options}
			/>
		</div>
	);
};