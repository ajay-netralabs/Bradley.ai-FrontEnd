import React from 'react';
import { Box, Typography, Card, CardContent, Tabs, Tab, Paper } from '@mui/material';

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
            <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
                <h2>Bradley's Recommendation For Acme Manufacturing</h2>
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: { xs: '20px', md: '160px' } }}>
                <Typography sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.8rem', textAlign: 'center' }}>
                    <b>Bradley.ai</b> recommends a hybrid system for Acme Manufacturing. This system combines solar panels, battery storage, and a natural gas generator to optimize energy costs, reduce emissions, and provide reliable backup power.
                </Typography>
                
                <Typography variant="h1" sx={{ mb: -1, mt: 1, fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center' }}>
                    <h2>Key Benefits:</h2>
                </Typography>
                
                <Box sx={{ fontFamily: 'Nunito Sans,sans-serif', display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}>
                    {[...Array(3)].map((_, index) => (
                        <Card key={index} sx={{ flex: 1, padding: 1, textAlign: 'center', backgroundColor: '#f5f5f5', boxShadow: 0, borderRadius: '8px', pb: 0 }}>
                            <CardContent>
                                {index === 0 && (
                                    <>
                                        <Typography sx={{ fontFamily: 'Nunito Sans,sans-serif', fontWeight: 'bold', fontSize: '1rem', pb: 1 }}><b>Projected Annual Savings:</b><br /><span style={{ color: '#2bad31' }}>$45,000</span></Typography>
                                        <Typography sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.7rem', color: 'gray', pt: 1 }}>The projected annual savings of $45,000 is a significant financial benefit.</Typography>
                                    </>
                                )}
                                {index === 1 && (
                                    <>
                                        <Typography sx={{ fontFamily: 'Nunito Sans,sans-serif', fontWeight: 'bold', fontSize: '1rem', pb: 1 }}><b>Estimated CO2 Reduction:</b><br /><span style={{ color: '#2bad31' }}>25%</span></Typography>
                                        <Typography sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.7rem', color: 'gray', pt: 1 }}>A 25% reduction in CO2 emissions is a substantial environmental impact.</Typography>
                                    </>
                                )}
                                {index === 2 && (
                                    <>
                                        <Typography sx={{ fontFamily: 'Nunito Sans,sans-serif', fontWeight: 'bold', fontSize: '1rem', pb: 1 }}><b>Backup Power Capacity:</b><br /><span style={{ color: '#2bad31' }}>4 Hours</span></Typography>
                                        <Typography sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.7rem', color: 'gray', pt: 1 }}>4 hours of backup power capacity provides a reasonable level of protection against outages.</Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
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
                    // justifyContent: 'center'
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
                        <Tab label="Recommendations" />
                        <Tab label="Resources" />
                    </Tabs>

                    <TabPanel value={value} index={0}>
    <Box sx={{ display: 'grid', gap: 2, height: '600px', gridTemplateRows: '1fr 1fr 1fr' }}>
        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>
                System Diagram
            </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Energy Production Breakdown
                </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Energy Flow Diagram
                </Typography>
            </Box>
        </Box>
        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Energy Specifications
            </Typography>
        </Box>
    </Box>
</TabPanel>


<TabPanel value={value} index={1}>
    <Box sx={{ display: 'grid', gap: 2, height: '700px', gridTemplateRows: '1fr 1fr 1fr 1fr' }}>
        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Investment Summary
            </Typography>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Internal Rate of Return
                </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    Interest Rate Projection
                </Typography>
            </Box>
        </Box>
        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Financial Incentives
            </Typography>
        </Box>
        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Finance Options
            </Typography>
        </Box>
    </Box>
</TabPanel>


                    <TabPanel value={value} index={2}>
                        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, height: '400px' }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>Recommendations</Typography>
                        </Box>
                    </TabPanel>

                    <TabPanel value={value} index={3}>
                        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, height: '400px' }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans,sans-serif', fontSize: '0.9rem', fontWeight: 'bold' }}>Resources</Typography>
                        </Box>
                    </TabPanel>
                </Box>
            </Paper>
        </Box>
        </Box>
    );
};

export default SubStep1;