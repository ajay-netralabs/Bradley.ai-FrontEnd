import React, { useState } from 'react';
import { Box, Typography, Collapse, IconButton, Card, CardContent } from '@mui/material';
import { ExpandMore, ExpandLess, CheckCircleOutline, HourglassTop, RemoveCircleOutline } from '@mui/icons-material';

const SubStep1: React.FC = () => {
    const steps = [
        {
            title: 'I. Data Gathering',
            status: 'done',
            subSteps: [
                { title: '1. Gathering Utility Data (Interval Data, Tariffs)', status: 'done' },
                { title: '2. Retrieving Weather Data (NOAA)', status: 'done' },
                { title: '3. Identifying Applicable Incentives (State, Federal)', status: 'done' },
            ],
        },
        {
            title: 'II. Data Validation',
            status: 'in-progress',
            subSteps: [
                { title: '1. Validating Organization Information', status: 'in-progress' },
                { title: '2. Verifying Facility Address and Service Area', status: 'done' },
                { title: '3. Analyzing Energy Consumption Data', status: 'done' },
            ],
        },
        {
            title: 'III. DER System Design',
            status: 'not-started',
            subSteps: [
                { title: '1. Determining Optimal System', status: 'not-started' },
                { title: '2. Selecting DER Components (Engines, Solar, Batteries, etc.)', status: 'not-started' },
            ],
        },
        {
            title: 'IV. Financial Analysis',
            status: 'not-started',
            subSteps: [
                { title: '1. Calculating Project Costs and Savings', status: 'not-started' },
                { title: '2. Projecting ROI, IRR, and Payback Period', status: 'not-started' },
                { title: '3. Evaluating Financing Options', status: 'not-started' },
            ],
        },
        {
            title: 'V. Report Generation',
            status: 'not-started',
            subSteps: [
                { title: '1. Generating Customized Report with Insights and Recommendations', status: 'not-started' },
            ],
        },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'done':
                return <CheckCircleOutline sx={{ color: '#036CA1' }} />;
            case 'in-progress':
                return <HourglassTop sx={{ color: '#036CA1' }} />;
            case 'not-started':
            default:
                return <RemoveCircleOutline sx={{ color: 'grey' }} />;
        }
    };

    const [expanded, setExpanded] = useState<number | null>(null);
    const handleExpandClick = (index: number) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
            </style>
            <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
                <h2>DER Analysis By Bradley.ai Is Underway!</h2>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px', borderRadius: '8px', backgroundColor:'#f9f9f9', mb : 2 }}>
                    <Typography sx={{ fontFamily:'Nunito Sans,sans-serif', fontSize:'0.85rem', fontWeight:'bold', textAlign:'left', flex : 1 }}> Estimated Completion Time:</Typography>
                    <Typography sx={{ fontFamily:'Nunito Sans,sans-serif', fontSize:'0.85rem', fontWeight:'bold', color:'#036CA1', textAlign:'right', flex : 1 }}> 2 - 3 Days </Typography>
                </Box>
                <Typography variant="h6" sx={{ mb:-1,fontFamily:'Nunito Sans,sans-serif',fontSize:'0.85rem',fontWeight:'bold',textAlign:'center'}}>
                    <h2>Analysis Progress</h2>
                </Typography>
                <Box sx={{ display:'flex', flexDirection:'column', gap : 2 , mt : 2 , mb : 2 }}>
                    {steps.map((step,index) => (
                        <Box key={index}>
                            <Box sx={{ display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:'10px',pt:'1px',pb:'1px',borderRadius:'8px',backgroundColor:'#f4f4f4',cursor:'pointer',width:'100%'}} onClick={() => handleExpandClick(index)}>
                                <Typography sx={{ fontFamily:'Nunito Sans,sans-serif',fontSize:'0.85rem',fontWeight:'bold'}}>{step.title}</Typography>
                                <Box sx={{ display:'flex',alignItems:'center'}}>
                                    {getStatusIcon(step.status)}
                                    <IconButton sx={{
    '&:focus': {
      outline: 'none',
    },
  }}>{expanded === index ? <ExpandLess /> : <ExpandMore />}</IconButton>
                                </Box>
                            </Box>
                            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                                <Box sx={{ p : 4 , pt : 2 , pb : 0 }}>
                                    {step.subSteps.map((subStep, subIndex) => (
                                        <Box key={subIndex} sx={{ display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:'10px',pt:'5px',pb:'5px',borderRadius:'8px',backgroundColor:'#f0f0f0' , mb : 2 , width : "100%"}}>
                                            <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' , fontSize :'0.85rem'}}>{subStep.title}</Typography>
                                            {getStatusIcon(subStep.status)}
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </Box>
                <Typography variant="h6" sx={{ mb:-2,fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.85rem' ,fontWeight :'bold' ,textAlign :'center'}}>
                    <h2>What's Next?</h2>
                </Typography>
                <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.8rem' ,textAlign :'center'}}>
                    <b>Bradley.ai</b> will review your information and perform a detailed energy, design and financial analysis. A comprehensive DER conceptual design with pricing build-up will be completed.
                </Typography>
                <Box sx={{ fontFamily :'Nunito Sans,sans-serif' ,display :'flex' ,justifyContent :'space-between' ,gap : 2 ,mt : 3 }}>
                    {[...Array(4)].map((_, index) => (
                        <Card key={index} sx={{ flex : 1,padding : 1,textAlign :'center' ,backgroundColor:'#f5f5f5' ,boxShadow : 0,borderRadius :'8px' ,pb : 0 }}>
                            <CardContent>
                                {index === 0 && (
                                    <>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontWeight :'bold' ,fontSize :'1rem' ,pb : 1 }}><b>Optimal Energy Mix</b></Typography>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.7rem' ,color :'gray'}}>We'll recommend the ideal combination of renewable or other energy sources tailored to your needs and location.</Typography>
                                    </>
                                )}
                                {index === 1 && (
                                    <>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontWeight :'bold' ,fontSize :'1rem' ,pb : 1 }}><b>Financial Projections</b></Typography>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.7rem' ,color :'gray'}}>Detailed proforma analysis and energy cost redcution projections to help you understand the financial benefits.</Typography>
                                    </>
                                )}
                                {index === 2 && (
                                    <>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontWeight :'bold' ,fontSize :'1rem' ,pb : 1 }}><b>Implementation Plan</b></Typography>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.7rem' ,color :'gray'}}>A step-by-step Project Management approach for implementing your custom DER solution, including timelines and key milestones.</Typography>
                                    </>
                                )}
                                {index === 3 && (
                                    <>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontWeight :'bold' ,fontSize :'1rem' ,pb : 1 }}><b>Recommendations</b></Typography>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.7rem' ,color :'gray'}}>Specific technology recommendations based on your energy profile and site characteristics.</Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default SubStep1;