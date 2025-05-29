import React from 'react';
import { Chart } from 'react-google-charts';
import { Box/* , Typography, Paper */ } from '@mui/material';

// --- Gantt Chart Data ---
// Task ID, Task Name, Resource (optional), Start Date, End Date (or null), Duration (ms or null), Percent Complete, Dependencies
const ganttColumns = [
  { type: 'string', label: 'Task ID' },
  { type: 'string', label: 'Task Name' },
  { type: 'string', label: 'Resource' },
  { type: 'date', label: 'Start Date' },
  { type: 'date', label: 'End Date' },
  { type: 'number', label: 'Duration' },
  { type: 'number', label: 'Percent Complete' },
  { type: 'string', label: 'Dependencies' },
];

// Helper function to parse dates "M/D/YY"
const parseDate = (dateStr: string) => {
  const [month, day, year] = dateStr.split('/').map(Number);
  return new Date(2000 + year, month - 1, day);
};

const ganttRows = [
  // ID, Name, Resource (Category), Start, End, Duration(null), %, Dependencies
  ['0', 'Overall Project Timeline', 'Summary', parseDate('5/1/24'), parseDate('11/19/24'), null, 0, null],
  ['1', 'Notice to Proceed', 'Milestone/Notice', parseDate('5/1/24'), parseDate('5/3/24'), null, 0, null],
  ['2', 'Issue Contracts to Solar Contractor', 'Procurement', parseDate('5/3/24'), parseDate('5/15/24'), null, 0, '1'],
  ['3', 'Finalize System Design', 'Engineering', parseDate('5/13/24'), parseDate('6/3/24'), null, 0, '2'],
  ['4', 'Submit Permit Applications', 'Permitting', parseDate('5/20/24'), parseDate('6/10/24'), null, 0, '3'],
  ['5', 'Utility Interconnection Application', 'Permitting/Utility', parseDate('6/1/24'), parseDate('7/3/24'), null, 0, '4'],
  ['6', 'Procure Solar Photovoltaic Panels', 'Procurement', parseDate('6/10/24'), parseDate('7/29/24'), null, 0, '3'],
  ['7', 'Procure Inverters', 'Procurement', parseDate('6/17/24'), parseDate('7/15/24'), null, 0, '3'],
  ['8', 'Foundation Engineering Design', 'Engineering', parseDate('6/15/24'), parseDate('6/30/24'), null, 0, '3'],
  ['9', 'Racking Procured', 'Procurement', parseDate('7/1/24'), parseDate('7/29/24'), null, 0, '8'],
  ['10', 'Foundation Installation', 'Construction', parseDate('7/29/24'), parseDate('8/19/24'), null, 0, '9'],
  ['11', 'Rack Install Support System', 'Construction', parseDate('8/19/24'), parseDate('9/2/24'), null, 0, '10'],
  ['12', 'Install Solar Inverters', 'Construction/Electrical', parseDate('8/12/24'), parseDate('9/2/24'), null, 0, '7'],
  ['13', 'Install Solar Panels', 'Construction', parseDate('9/2/24'), parseDate('9/30/24'), null, 0, '11,6'],
  ['14', 'Install Electrical Conduits', 'Construction/Electrical', parseDate('8/26/24'), parseDate('9/23/24'), null, 0, '12'],
  ['15', 'System Wiring/Integration', 'Electrical', parseDate('9/30/24'), parseDate('10/21/24'), null, 0, '14,13'],
  ['16', 'Utility Final Inspection', 'Inspection/Utility', parseDate('10/21/24'), parseDate('10/28/24'), null, 0, '15'],
  ['17', 'Commission System', 'Commissioning', parseDate('10/29/24'), parseDate('11/19/24'), null, 0, '16'],
  ['18', 'Operations Training', 'Handover', parseDate('10/22/24'), parseDate('11/5/24'), null, 0, '15'],
];

const ganttData = [ganttColumns, ...ganttRows];

export const ProjectSchedule: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
  const isLarge = size === 'large';

  const ganttOptions = {
    height: isLarge ? ganttRows.length * 35 + 50 : ganttRows.length * 30 + 50,
    gantt: {
      trackHeight: isLarge ? 35 : 30,
      barHeight: isLarge ? 20 : 16, 
      labelStyle: {
        fontName: '"Nunito Sans", sans-serif',
        fontSize: isLarge ? 12 : 10,
				
      },
      barCornerRadius: 2,
      percentEnabled: false,
      shadowEnabled: false,
      sortTasks: false,
       arrow: { 
          angle: 60,
          width: 1,
          color: '#555',
          radius: 4,
          length: 4,
      },
      labelMaxWidth: isLarge? 327 : 280,
    },
     tooltip: {
        isHtml: false,
     },
  };

  return (
    <Box sx={{ width: '100%', p: isLarge ? 2 : 1, height: '100%' }}>
      <Chart
        chartType="Gantt"
        width="100%"
        height={ganttOptions.height}
        data={ganttData}
        options={ganttOptions}
        loader={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>Loading Chart...</Box>}
      />
    </Box>
  );
};