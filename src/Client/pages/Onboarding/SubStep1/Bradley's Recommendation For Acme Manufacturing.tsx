import React from 'react';
import { Box, Typography, Card, CardContent, Tabs, Tab, Paper, styled } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const StyledTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
}));

const StyledRecommendation = styled(Typography)(({ }) => ({
    fontFamily: 'Nunito Sans,sans-serif',
    fontSize: '0.8rem',
    textAlign: 'center',
}));

const StyledKeyBenefitsTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(-1),
    marginTop: theme.spacing(1),
    fontFamily: 'Nunito Sans,sans-serif',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textAlign: 'center',
}));

const StyledBenefitCard = styled(Card)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: '#f5f5f5', // Exact color match
    boxShadow: theme.shadows[0],
    borderRadius: theme.shape.borderRadius,
    paddingBottom: theme.spacing(0),
}));

const StyledBenefitValue = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito Sans,sans-serif',
    fontWeight: 'bold',
    fontSize: '1rem',
    paddingBottom: theme.spacing(1),
}));

const StyledBenefitDescription = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito Sans,sans-serif',
    fontWeight: 'bold',
    fontSize: '0.7rem',
    color: theme.palette.grey[600],
    paddingTop: theme.spacing(1),
}));

const StyledTabPanelBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
}));

const StyledTabPanelTitle = styled(Typography)(({ }) => ({
    fontFamily: 'Nunito Sans,sans-serif',
    fontSize: '0.9rem',
    fontWeight: 'bold',
}));

const StyledExpandButton = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    backgroundColor: theme.palette.grey[300],
    cursor: 'pointer',
}));

const benefitDataTop = [
    { value: '11,809 Metric Tons', description: 'Of reduced annual carbon dioxide equivalents<br />(80% CO2 reduction)' },
    { value: '248 Thousand', description: 'Steam therms reduced<br />(35% reduction in steam use)' },
    { value: '8.1 Million', description: 'gallons of water reduced<br />(22% reduction in water use)' },
    { value: '4 Million', description: 'kWh of electricity reduced<br />(32% reduction in electric use)' },
];

const benefitDataBottom = [
    { value: '$1.583 million', description: 'annual reduction in utility costs' },
    { value: '$1.178 million', description: 'From Utility rebates' },
    { value: '$100 thousand', description: 'From Maryland Energy Administration grant' },
    { value: '$13.287 million', description: 'Invested in addressing deffered mechanical and electrical infrastructure' },
];

const SubStep1: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            p: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
        }}>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
            </style>
            <StyledTitle variant="h6">
                <h2>Bradley's Recommendation For Acme Manufacturing</h2>
            </StyledTitle>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: { xs: '20px', md: '160px' } }}>
                <StyledRecommendation>
                    <b>Bradley.ai</b> recommends a hybrid system for Acme Manufacturing. This system combines solar panels, battery storage, and a natural gas generator to optimize energy costs, reduce emissions, and provide reliable backup power.
                </StyledRecommendation>

                <StyledKeyBenefitsTitle variant="h1">
                    <h2>Key Benefits:</h2>
                </StyledKeyBenefitsTitle>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}>
                    {benefitDataTop.map((benefit, index) => (
                        <StyledBenefitCard key={index}>
                            <CardContent>
                                <StyledBenefitValue><span style={{ color: '#2bad31' }}>{benefit.value}</span></StyledBenefitValue>
                                <StyledBenefitDescription dangerouslySetInnerHTML={{ __html: benefit.description }} />
                            </CardContent>
                        </StyledBenefitCard>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}>
                    {benefitDataBottom.map((benefit, index) => (
                        <StyledBenefitCard key={index}>
                            <CardContent>
                                <StyledBenefitValue><span style={{ color: '#2bad31' }}>{benefit.value}</span></StyledBenefitValue>
                                <StyledBenefitDescription dangerouslySetInnerHTML={{ __html: benefit.description }} />
                            </CardContent>
                        </StyledBenefitCard>
                    ))}
                </Box>
                <Paper elevation={0} sx={{
                    width: '100%',
                    mt: 4,
                    backgroundColor: 'transparent'
                }}>
                    <Box sx={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid #e0e0e0',
                        backgroundColor: 'white',
                        textAlign: 'center',
                    }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="recommendation tabs"
                            sx={{
                                mt: 1,
                                borderBottom: 0,
                                borderColor: 'divider',
                                '& .MuiTabs-flexContainer': {
                                    justifyContent: 'center',
                                },
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontFamily: 'Nunito Sans,sans-serif',
                                    fontSize: '0.9rem',
                                    minWidth: 120,
                                    fontWeight: 'bold',
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                }
                            }}
                        >
                            <Tab label="Energy Mix" />
                            <Tab label="Financial Projections" />
                            <Tab label="Project Schedule & General Arrangement" />
                            <Tab label="Resources" />
                        </Tabs>

                        <TabPanel value={value} index={0}>
                            <Box sx={{ display: 'grid', gap: 2, height: '1000px', gridTemplateRows: '1fr 1fr 1fr' }}>
                                <StyledTabPanelBox>
                                    <StyledTabPanelTitle variant="h6">
                                        System Diagram
                                    </StyledTabPanelTitle>
                                    <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                    </StyledExpandButton>
                                </StyledTabPanelBox>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <StyledTabPanelBox>
                                        <StyledTabPanelTitle variant="h6">
                                            Energy Production Breakdown
                                        </StyledTabPanelTitle>
                                        <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                        </StyledExpandButton>
                                    </StyledTabPanelBox>
                                    <StyledTabPanelBox>
                                        <StyledTabPanelTitle variant="h6">
                                            Energy Flow Diagram
                                        </StyledTabPanelTitle>
                                        <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                        </StyledExpandButton>
                                    </StyledTabPanelBox>
                                </Box>
                                <StyledTabPanelBox>
                                    <StyledTabPanelTitle variant="h6">
                                        Energy Specifications
                                    </StyledTabPanelTitle>
                                    <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                    </StyledExpandButton>
                                </StyledTabPanelBox>
                            </Box>
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <Box sx={{ display: 'grid', gap: 2, height: '1340px', gridTemplateRows: '1fr 1fr 1fr 1fr' }}>
                                <StyledTabPanelBox>
                                    <StyledTabPanelTitle variant="h6">
                                        Investment Summary
                                    </StyledTabPanelTitle>
                                    <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                    </StyledExpandButton>
                                </StyledTabPanelBox>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <StyledTabPanelBox>
                                        <StyledTabPanelTitle variant="h6">
                                            Indicative Interest Rate,<br />Term of Financing & Internal Rate of Return
                                        </StyledTabPanelTitle>
                                        <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                        </StyledExpandButton>
                                    </StyledTabPanelBox>
                                    <StyledTabPanelBox>
                                        <StyledTabPanelTitle variant="h6">
                                            Annual Energy Cost “as is”<br />compared to DER overtime
                                        </StyledTabPanelTitle>
                                        <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                        </StyledExpandButton>
                                    </StyledTabPanelBox>
                                </Box>
                                <StyledTabPanelBox>
                                    <StyledTabPanelTitle variant="h6">
                                        Financial Incentives
                                    </StyledTabPanelTitle>
                                    <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                    </StyledExpandButton>
                                </StyledTabPanelBox>
                                <StyledTabPanelBox>
                                    <StyledTabPanelTitle variant="h6">
                                        Finance Options
                                    </StyledTabPanelTitle>
                                    <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                    </StyledExpandButton>
                                </StyledTabPanelBox>
                            </Box>
                        </TabPanel>

                        <TabPanel value={value} index={2}>
                            <StyledTabPanelBox sx={{ height: '400px' }}>
                                <StyledTabPanelTitle variant="h6">Project Schedule & General Arrangement</StyledTabPanelTitle>
                                <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                </StyledExpandButton>
                            </StyledTabPanelBox>
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                            <StyledTabPanelBox sx={{ height: '400px' }}>
                                <StyledTabPanelTitle variant="h6">Resources</StyledTabPanelTitle>
                                <StyledExpandButton onClick={() => console.log('Expand view clicked')}>
                                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography>
                                </StyledExpandButton>
                            </StyledTabPanelBox>
                        </TabPanel>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default SubStep1;