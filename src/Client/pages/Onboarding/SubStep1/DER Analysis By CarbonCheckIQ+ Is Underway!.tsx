import React, { useState } from 'react';
import { Box, Typography, Collapse, Paper, Grid, Card, CardContent } from '@mui/material';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import DataUsageIcon from '@mui/icons-material/DataUsage';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ArticleIcon from '@mui/icons-material/Article';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const SubStep1: React.FC = () => {
    const stepsData = [
        { icon: <DataUsageIcon />, title: 'I. Data Gathering', status: 'done', subSteps: [ { title: 'Gathering Utility Data (Interval Data, Tariffs)', status: 'done' }, { title: 'Retrieving Weather Data (NOAA)', status: 'done' }, { title: 'Identifying Applicable Incentives (State, Federal)', status: 'done' } ] },
        { icon: <VerifiedUserIcon />, title: 'II. Data Validation', status: 'in-progress', subSteps: [ { title: 'Validating Organization Information', status: 'in-progress' }, { title: 'Verifying Facility Address and Service Area', status: 'done' }, { title: 'Analyzing Energy Consumption Data', status: 'done' } ] },
        { icon: <EngineeringIcon />, title: 'III. DER System Design', status: 'not-started', subSteps: [ { title: 'Determining Optimal System', status: 'not-started' }, { title: 'Selecting DER Components (Engines, Solar, Batteries, etc.)', status: 'not-started' } ] },
        { icon: <ShowChartIcon />, title: 'IV. Financial Analysis', status: 'not-started', subSteps: [ { title: 'Calculating Project Costs and Savings', status: 'not-started' }, { title: 'Projecting ROI, IRR, and Payback Period', status: 'not-started' }, { title: 'Evaluating Financing Options', status: 'not-started' } ] },
        { icon: <ArticleIcon />, title: 'V. Report Generation', status: 'not-started', subSteps: [ { title: 'Generating Customized Report with Insights and Recommendations', status: 'not-started' } ] },
    ];
    
    const whatsNextData = [
        { icon: <BarChartIcon color="primary" sx={{ fontSize: 40 }} />, title: <>Optimal<br />Energy Mix</>, description: "We'll recommend the ideal combination of renewable or other energy sources tailored to your needs and location." },
        { icon: <AttachMoneyIcon color="primary" sx={{ fontSize: 40 }} />, title: "Financial Projections", description: "Detailed proforma analysis and energy cost reduction projections to help you understand the financial benefits." },
        { icon: <CalendarMonthIcon color="primary" sx={{ fontSize: 40 }} />, title: "Implementation Plan", description: "A step-by-step Project Management approach for implementing your custom DER solution, including timelines and key milestones." },
        { icon: <LightbulbIcon color="primary" sx={{ fontSize: 40 }} />, title: "Recommendations", description: "Specific technology recommendations based on your energy profile and site characteristics." }
    ];

    const getStatusIcon = (status: string, size: 'small' | 'inherit' = 'inherit') => {
        const sx = { fontSize: size === 'small' ? '1.1rem' : '1.5rem', mr: 1.5, verticalAlign: 'middle' };
        switch (status) {
            case 'done': return <CheckCircleIcon sx={{ ...sx, color: 'success.main' }} />;
            case 'in-progress': return <HourglassTopIcon sx={{ ...sx, color: 'info.main', animation: 'spin 2s linear infinite' }} />;
            case 'not-started': default: return <RadioButtonUncheckedIcon sx={{ ...sx, color: 'action.disabled' }} />;
        }
    };

    const [expanded, setExpanded] = useState<number | null>(() => {
        const inProgressIndex = stepsData.findIndex(step => step.status === 'in-progress');
        return inProgressIndex !== -1 ? inProgressIndex : 0;
    });
    const handleExpandClick = (index: number) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <Box sx={{ fontFamily: 'Nunito Sans, sans-serif', p: 1, pr: 4, pl: 1, pt: 1 }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
                @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
            `}</style>
            <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
                <h2>DER Analysis By CarbonCheckIQ+ Is Underway!</h2><br />
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: '10px', pb: '10px', px: '160px' }}>
                
                <Paper elevation={3} sx={{ p: '12px 16px', borderRadius: '12px', background: '#f0f4f8' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', color: '#01579b' }}>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Estimated Completion Time:</Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>2 - 3 Business Days</Typography>
                    </Box>
                </Paper>

                <Typography variant="h6" sx={{ mb: -1, fontFamily:'Nunito Sans,sans-serif', fontSize:'0.85rem', fontWeight:'bold', textAlign:'center' }}>
                    <h2>Analysis Progress</h2>
                </Typography>

                <Box sx={{ display:'flex', flexDirection:'column', gap: 1.5 }}>
                    {stepsData.map((step, index) => (
                        <Paper key={index} elevation={2} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                            <Box 
                                sx={{ display:'flex', alignItems:'center', p: '12px 16px', cursor: 'pointer', backgroundColor: '#f8f9fa', '&:hover': { backgroundColor: '#f9f9f9' }, borderBottom: expanded === index ? '1px solid #e0e0e0' : 'none' }} 
                                onClick={() => handleExpandClick(index)}
                            >
                                {React.cloneElement(step.icon, { sx: { color: 'primary.main', mr: 1.5 }})}
                                <Typography sx={{ flexGrow: 1, fontFamily:'Nunito Sans,sans-serif', fontSize:'1rem', fontWeight:'bold'}}>{step.title}</Typography>
                                <IconButton size="small" sx={{ transform: expanded === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', '&:focus': { outline: 'none' } }}><ExpandMoreIcon /></IconButton>
                            </Box>
                            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                                <Box sx={{ p: 2, pt: 1, backgroundColor: '#fff' }}>
                                    {step.subSteps.map((subStep, subIndex) => (
                                        <Box key={subIndex} sx={{ display:'flex', alignItems:'center', py: 1 }}>
                                            {getStatusIcon(subStep.status, 'small')}
                                            <Typography sx={{ fontFamily :'Nunito Sans,sans-serif', fontSize :'0.8rem', color: subStep.status === 'not-started' ? 'text.disabled' : 'text.primary' }}>{subStep.title}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </Paper>
                    ))}
                </Box>

                <Typography variant="h6" sx={{ mb:-2, fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.85rem' ,fontWeight :'bold' ,textAlign :'center', pt: 2 }}>
                    <h2>What's Next?</h2>
                </Typography>
                <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.8rem' ,textAlign :'center', color: 'text.secondary' }}>
                    CarbonCheckIQ+ will review your information and perform a detailed energy, design and financial analysis. A comprehensive DER conceptual design with pricing build-up will be completed.
                </Typography>
                <Grid container spacing={2.5} sx={{ mt: 1 }}>
                    {whatsNextData.map((item, idx) => (
                        <Grid item xs={12} sm={6} md={3} key={typeof item.title === 'string' ? item.title : `whats-next-${idx}`}>
                            <Card elevation={2} sx={{ p: 1, textAlign: 'center', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent>
                                    {item.icon}
                                    <Typography sx={{ fontFamily :'Nunito Sans,sans-serif', fontWeight :'bold', fontSize :'1rem', my: 1.5 }}>{item.title}</Typography>
                                    <Typography sx={{ fontFamily :'Nunito Sans,sans-serif', fontSize :'0.75rem', color: 'text.secondary', lineHeight: 1.6 }}>{item.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default SubStep1;