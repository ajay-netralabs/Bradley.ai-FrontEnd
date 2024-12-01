import React, { useState } from 'react'; 
import { Box, Typography, IconButton, Checkbox, Collapse } from '@mui/material'; 
import { IoEnterOutline } from "react-icons/io5"; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import { useAppContext } from '../../../AppContext'; 

const SubStep1: React.FC = () => { 

  const {
    setCurrentStep,
    setCurrentSubStep,
} = useAppContext();

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null); 

    const handleExpandClick = (index: number) => { 
        setExpandedIndex(expandedIndex === index ? null : index); 
    }; 

    return ( 
        <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}> 
            <style> 
                @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap'); 
            </style> 
            <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}> 
                <h2>DATA VERIFICATION AND PROCESSING</h2> 
                <br /> 
                <h2>Processing Status</h2> 
            </Typography> 

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}> 

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#f9f9f9', mb: 2 }}> 
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'left', flex: 1 }}> Overall Progress to Completing the DER Analysis:</Typography> 
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', color: '#036CA1', textAlign: 'right', flex: 1 }}> x% Completed </Typography> 
                </Box> 

                <Typography variant="h6" sx={{ mb: -1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}> 
                    <h2>Overall Profile Summary</h2> 
                </Typography> 

                <Box sx={{ backgroundColor: '#f4f4f4', borderRadius: '8px', padding: '8px', marginBottom: '0px', position: 'relative', width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleExpandClick(0)}>
                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold' }}>
                            Organizational Profile
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ExpandMoreIcon sx={{ transform: expandedIndex === 0 ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                        </Box>
                    </Box>
                    <Collapse in={expandedIndex === 0} timeout="auto" unmountOnExit>
                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', whiteSpace: 'pre-wrap', marginTop: '8px' }}>
                            Company Name: ABC Group<br />
                            Industry: Manufacturing<br />
                            Location: New York, NY
                        </Typography>
                        <IconButton size="small" onClick={() => { setCurrentStep(0), setCurrentSubStep(0) }} sx={{ position: 'absolute', top: '8px', right: '36px' }}>
                            <IoEnterOutline />
                        </IconButton>
                    </Collapse>
                </Box>

                <Box sx={{ backgroundColor:'#f4f4f4', borderRadius:'8px', padding:'8px', marginBottom:'0px', position:'relative', width:'100%' }}>
                    <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }} onClick={() => handleExpandClick(1)}>
                        <Typography sx={{ fontFamily:'Nunito Sans, sans-serif', fontSize:'0.85rem', fontWeight:'bold' }}>
                            Energy Profile
                        </Typography>
                        <Box sx={{ display:'flex', alignItems:'center' }}>
                            <ExpandMoreIcon sx={{ transform:(expandedIndex === 1 ? "rotate(180deg)" : "rotate(0deg)"), transition:'transform 0.3s' }} />
                        </Box>
                    </Box>
                    <Collapse in={expandedIndex === 1} timeout="auto" unmountOnExit>
                        <Typography sx={{ fontFamily:'Nunito Sans, sans-serif', fontSize:'0.75rem', whiteSpace:'pre-wrap', marginTop:'8px' }}>
                            Annual Energy Usage:
                            1,200,000 kWh<br />
                            Peak Demand:
                            500kW<br />
                            Energy Source:
                            Solar, Wind
                        </Typography>
                        <IconButton size="small" onClick={() => { setCurrentStep(1), setCurrentSubStep(0) }} sx={{ position:'absolute', top:'8px', right:'36px' }}>
                            <IoEnterOutline />
                        </IconButton>
                    </Collapse>
                </Box>

                <Box sx={{ backgroundColor:'#f4f4f4', borderRadius:'8px', padding:'8px', marginBottom:'0px', position:'relative', width:'100%' }}>
                    <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }} onClick={() => handleExpandClick(2)}>
                        <Typography sx={{ fontFamily:'Nunito Sans, sans-serif', fontSize:'0.85rem', fontWeight:'bold' }}>
                            Goals & Priorities
                        </Typography>
                        <Box sx={{ display:'flex', alignItems:'center' }}>
                            <ExpandMoreIcon sx={{ transform:(expandedIndex === 2 ? "rotate(180deg)" : "rotate(0deg)"), transition:'transform 0.3s' }} />
                        </Box>
                    </Box>
                    <Collapse in={expandedIndex === 2} timeout="auto" unmountOnExit>
                        <Typography sx={{ fontFamily:'Nunito Sans, sans-serif', fontSize:'0.75rem', whiteSpace:'pre-wrap', marginTop:'8px' }}>
                            Budget:
                            $500,000<br />
                            ROI Expectation:
                            5 Years
                        </Typography>
                        <IconButton size="small" onClick={() => { setCurrentStep(2), setCurrentSubStep(0) }} sx={{ position:'absolute', top:'8px', right:'36px' }}>
                            <IoEnterOutline />
                        </IconButton>
                    </Collapse>
                </Box>

                <Box sx={{ backgroundColor:'#f4f4f4', borderRadius:'8px', padding:'8px', marginBottom:'0px ', position:'relative ', width :'100%' }}>
                    <Box sx={{ display :'flex ', justifyContent :'space-between ', alignItems :'center ', cursor :'pointer'}} onClick={() => handleExpandClick(3)}>
                        <Typography sx={{fontFamily :'Nunito Sans,sans-serif ',fontSize :'0.85rem ',fontWeight :'bold'}}>
                            Site Assessment
                        </Typography >
                        <Box sx= {{display :'flex ',alignItems :'center'}}>
                            <ExpandMoreIcon sx= {{transform :(expandedIndex === 3 ? "rotate(180deg)" : "rotate(0deg)"),transition :'transform 0.3s'}} />
                        </Box >
                    </Box >
                    <Collapse in={expandedIndex === 3} timeout="auto" unmountOnExit>
                        <Typography sx= {{fontFamily :'Nunito Sans,sans-serif ',fontSize :'0.75rem ',whiteSpace :'pre-wrap ',marginTop :'8px'}}>
                            Site Size:
                            100,000 sq. ft<br />
                            Roof Condition:
                            Excellent<br />
                            Shading:
                            Minimal
                        </Typography >
                        <IconButton size="small" onClick={() => { setCurrentStep(3), setCurrentSubStep(0) }} sx= {{position :'absolute ',top :'8px ',right :'36px'}}>
                            <IoEnterOutline />
                        </IconButton >
                    </Collapse >
                </Box >

                <Box sx= {{backgroundColor:'#f4f4f4 ',borderRadius :'8px ',padding :'8px ',marginBottom :'0px ',position :'relative ',width :'100%'}}>
                    <Box sx= {{display :'flex ',justifyContent :'space-between ',alignItems :'center ',cursor :'pointer'}} onClick={() => handleExpandClick(4)}>
                        <Typography sx= {{fontFamily :'Nunito Sans,sans-serif ',fontSize :'0.85rem ',fontWeight :'bold'}}>
                            Financial Info
                        </Typography >
                        <Box sx= {{display :'flex ',alignItems :'center'}}>
                            <ExpandMoreIcon sx= {{transform :(expandedIndex === 4 ? "rotate(180deg)" : "rotate(0deg)"),transition :'transform 0.3s'}} />
                        </Box >
                    </Box >
                    <Collapse in={expandedIndex === 4} timeout="auto" unmountOnExit>
                        <Typography sx= {{fontFamily :'Nunito Sans,sans-serif ',fontSize :'0.75rem ',whiteSpace :'pre-wrap ',marginTop :'8px'}}>
                            Down Payment:
                            $50,000
                        </Typography >
                        <IconButton size="small" onClick={() => { setCurrentStep(4), setCurrentSubStep(0) }} sx= {{position :'absolute ',top :'8px ',right :'36px'}}>
                            <IoEnterOutline />
                        </IconButton >
                    </Collapse >
                </Box >

            </Box > 

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mt: 1 }}>
          <Checkbox
            sx={{
              padding: '0 0',
              '& .MuiSvgIcon-root': { fontSize: '1.1rem' },
            }}
          />
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }}>
            I have reviewed the information and confirm it is accurate.
          </Typography>
        </Box> 

        </Box > 
    ); 
}; 

export default SubStep1;