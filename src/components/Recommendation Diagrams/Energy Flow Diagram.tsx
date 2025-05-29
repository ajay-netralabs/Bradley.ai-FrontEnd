import React from 'react';
import { Chart } from 'react-google-charts';

export const EnergyFlowDiagram: React.FC = () => {
	const data = [
		["From", "To", "Weight"],
		// Solar PV Distribution
		["Solar PV (1,200,000 kWh)", "Main Building", 600000],
		["Solar PV (1,200,000 kWh)", "Warehouse", 400000],
		["Solar PV (1,200,000 kWh)", "Office", 200000],
		
		// Combustion Turbine Distribution
		["Combustion Turbine (1,200,000 kWh)", "Main Building", 500000],
		["Combustion Turbine (1,200,000 kWh)", "Warehouse", 300000],
		["Combustion Turbine (1,200,000 kWh)", "Office", 400000],
		
		// Battery Storage Distribution
		["Battery Storage (300,000 kWh)", "Main Building", 200000],
		["Battery Storage (300,000 kWh)", "Warehouse", 50000],
		["Battery Storage (300,000 kWh)", "Office", 50000],
		
		// Fuel Cell Distribution
		["Fuel Cell (300,000 kWh)", "Main Building", 200000],
		["Fuel Cell (300,000 kWh)", "Warehouse", 150000],
		["Fuel Cell (300,000 kWh)", "Office", 50000],
		
		// Main Building Sub-distribution
		["Main Building", "Lighting", 400000],
		["Main Building", "HVAC", 600000],
		["Main Building", "Machinery", 500000],
		
		// Warehouse Sub-distribution
		["Warehouse", "Lighting", 200000],
		["Warehouse", "Refrigeration", 400000],
		["Warehouse", "Conveyors", 300000],
		
		// Office Sub-distribution
		["Office", "Lighting", 200000],
		["Office", "Computers", 200000],
		["Office", "HVAC", 200000],
	];

	const options = {
		sankey: {
			node: {
				width: 10,
				nodePadding: 10,
				label: { fontSize: 12 }
			},
			link: {
				colorMode: 'gradient',
				// colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c']
			}
		},
	};

	return (
		<div style={{ width: '100%', height: '100%', minHeight: '300px', padding: 0 }}>
			<Chart
				chartType="Sankey"
				width="100%"
				height="95.8%"
				data={data}
				options={options}
			/>
		</div>
	);
};
