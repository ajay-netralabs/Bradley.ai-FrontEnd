import React from 'react';
import { Chart } from 'react-google-charts';
import { Box/* , Typography, Paper */ } from '@mui/material';

// --- Gantt Chart Data ---
// Columns definition for Google Charts Gantt
// Task ID, Task Name, Resource (optional), Start Date, End Date (or null), Duration (ms or null), Percent Complete, Dependencies
const ganttColumns = [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'string', label: 'Resource' }, // Keeping column for structure, can be null
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' }, // Providing End Date for clarity
  { type: 'number', label: 'Duration' }, // Can be null if Start/End provided
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' },
];

// Data rows matching the columns
// Note: Month in new Date() is 0-indexed (0=Jan, 1=Feb, ...)
const ganttRows = [
  // ID, Name, Resource, Start, End, Duration(null), %, Dependencies
  ['1', 'Atlantic City Convention Center Solar Project', 'Summary', new Date(2008, 4, 19), new Date(2008, 11, 26), null, 0, null], // Summary Task
  ['2', 'Notice To Proceed', 'Admin', new Date(2008, 4, 19), new Date(2008, 4, 19), null, 100, null], // 1 day task ends same day
  ['3', 'Issue Contract to Solar Contractor', 'Admin', new Date(2008, 4, 19), new Date(2008, 4, 19), null, 100, null], // 1 day task ends same day

  ['4', 'Solar System Engineered Design', 'Design', new Date(2008, 4, 19), new Date(2008, 5, 27), null, 0, null], // ID 6
  ['5', 'Final Review of Solar System Design', 'Design', new Date(2008, 5, 30), new Date(2008, 6, 11), null, 0, '4'], // ID 7 - Depends on 6 (now 5)
  ['6', 'Procure Solar Photovoltaic Panels', 'Procurement', new Date(2008, 5, 2), new Date(2008, 9, 3), null, 0, null], // ID 8
  ['7', 'Procure Solar Inverters', 'Procurement', new Date(2008, 4, 19), new Date(2008, 8, 19), null, 0, null], // ID 9

  ['8', 'Roof Support Engineered Design', 'Design', new Date(2008, 4, 19), new Date(2008, 5, 13), null, 0, null], // ID 11
  ['9', 'Final Review of Roof Design', 'Design', new Date(2008, 5, 16), new Date(2008, 5, 27), null, 0, '8'], // ID 12 - Depends on 11 (now 10)
  ['10', 'Procure Roof Support System', 'Procurement', new Date(2008, 5, 2), new Date(2008, 7, 22), null, 0, '9'], // ID 13 - Depends on 12 (now 11) - Arrow shown
  ['11', 'New Jersey DCA Review', 'Admin', new Date(2008, 5, 30), new Date(2008, 7, 8), null, 0, null], // ID 15

  ['12', 'Surge Arrestor Engineered Design', 'Design', new Date(2008, 4, 19), new Date(2008, 4, 23), null, 0, null], // ID 17
  ['13', 'Final Review of Surge Arrestor Design', 'Design', new Date(2008, 4, 26), new Date(2008, 4, 30), null, 0, '12'], // ID 18 - Depends on 17 (now 16)
  ['14', 'Procure Surge Arrestor System', 'Procurement', new Date(2008, 5, 2), new Date(2008, 5, 13), null, 0, '13'], // ID 19 - Depends on 18 (now 17) - Arrow implied

  ['15', 'Install Roof Support System', 'Install', new Date(2008, 7, 25), new Date(2008, 10, 14), null, 0, '10'], // ID 21 - Depends on 13 (now 12)
  ['16', 'Install Solar Panels', 'Install', new Date(2008, 7, 4), new Date(2008, 11, 19), null, 0, '6'], // ID 22 - Depends on 8 (now 7)
  ['17', 'Install Electrical Conduit, Cable', 'Install', new Date(2008, 7, 4), new Date(2008, 8, 26), null, 0, null], // ID 23 - No explicit dependency drawn, starts same time as panels
  ['18', 'Install Inverters', 'Install', new Date(2008, 7, 4), new Date(2008, 8, 26), null, 0, '7'], // ID 24 - Depends on 9 (now 8)
  ['19', 'Install Surge Arrestor System', 'Install', new Date(2008, 9, 6), new Date(2008, 10, 28), null, 0, '14'], // ID 26 - Depends on 19 (now 18)
  ['20', 'Commission Solar System', 'Commission', new Date(2008, 11, 1), new Date(2008, 11, 26), null, 0, '15,16,17,18,19'], // ID 28 - Depends on 21,22,23,24,26 (now 20,21,22,23,25)
];

const ganttData = [ganttColumns, ...ganttRows];


// --- Component Definition ---
export const ProjectSchedule: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
  const isLarge = size === 'large';

  const ganttOptions = {
    // Height needs to be sufficient for all tasks
    // Adjust base height and multiplier as needed
    height: isLarge ? ganttRows.length * 35 + 50 : ganttRows.length * 30 + 50,
    gantt: {
      trackHeight: isLarge ? 35 : 30, // Height of each task row
      barHeight: isLarge ? 20 : 16, // Height of the bar itself
      labelStyle: {
        fontName: '"Nunito Sans", sans-serif',
        fontSize: isLarge ? 12 : 10,
				
      },
      barCornerRadius: 2,
      // Default color matches the image reasonably well
      // criticalPathEnabled: false, // Keep default (true) or set false
      // criticalPathStyle: { stroke: '#e64a19', strokeWidth: 5 },
      percentEnabled: false, // Don't show % complete on bars
      shadowEnabled: false, // Cleaner look without shadow
      sortTasks: false, // Keep the order defined in data
       arrow: { // Style dependency arrows
          angle: 60, // Adjust angle if needed
          width: 1,
          color: '#555', // Arrow color
          radius: 4,
          length: 4,
      },
      labelMaxWidth: isLarge? 327 : 280, // Limit width of task name column
    },
     tooltip: {
        isHtml: false, // Use basic tooltip
     },
  };

  return (
    // Removed Paper for a cleaner look focusing only on the chart
    <Box sx={{ width: '100%', p: isLarge ? 2 : 1, height: '100%' }}>
      <Chart
        chartType="Gantt"
        width="100%"
        height={ganttOptions.height} // Control height via options
        data={ganttData}
        options={ganttOptions}
        loader={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>Loading Chart...</Box>}
      />
       {/* Optional: Add Legend like in the image */}
       {/* The default legend is complex to replicate exactly here */}
       {/* You might need to build a custom HTML legend below the chart */}
    </Box>
  );
};