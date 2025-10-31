import React, { useState } from 'react';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    styled,
    alpha,
    useTheme,
    Button,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';

import { SiGoogledocs, SiGooglesheets } from "react-icons/si";

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  watermarkText: string;
  filePath: string;
  downloadName: string;
  fileType: 'doc' | 'excel';
}

const resourcesData: ResourceItem[] = [
  { id: 'der-calculations', title: 'DER Calculations June 2025', description: "A detailed breakdown of the calculations and methodologies used for Distributed Energy Resource (DER) analysis and projections for June 2025.", watermarkText: 'DER', filePath: 'https://docs.google.com/document/d/1IaquRwoKyjoqOL6Ud2pCU_Ui14Jpd4fiGfKS1zuOVWI/edit?usp=sharing', downloadName: 'DER Calculations June 2025.docx', fileType: 'doc' },
  { id: 'emission-reporting', title: 'EMISSION REPORTING PROCESS bradley.ai', description: "Standard operating procedures and process flow for compiling and reporting emission data using the bradley.ai platform.", watermarkText: 'ERP', filePath: 'https://docs.google.com/document/d/138aYTAjTyn5_UxJTEC54EkfAoZ19oOYNpkvcCp3Q03A/edit?usp=sharing', downloadName: 'EMISSION REPORTING PROCESS bradley.ai.docx', fileType: 'doc' },
  { id: 'ghg-formulas', title: 'Excel Formula for Calculating GHG Emissions at the Building Level', description: "A reference document outlining the specific formulas used to calculate Greenhouse Gas (GHG) emissions at the individual building level.", watermarkText: 'GHG', filePath: 'https://docs.google.com/document/d/14izJnnmte5lzzwUojPO2UZxpFlvqr2XdYLBBq6sn76U/edit?usp=sharing', downloadName: 'Excel Formula for Calculating GHG Emissions at the Building Level.docx', fileType: 'doc' },
  { id: 'energy-data-comparison', title: 'NVESD - Energy data Comparison Spredsheet(June 2014) belvoir', description: "A comparative spreadsheet with historical energy data from NVESD (June 2014). For full functionality, download is recommended.", watermarkText: 'NVESD', filePath: 'https://docs.google.com/spreadsheets/d/190i3q7H6oYTcj-_v9iWyBZz7L_x06HLPI-zhJNbnrj0/edit?usp=sharing', downloadName: 'NVESD - Energy data Comparison Spredsheet(June 2014) belvoir.xlsx', fileType: 'excel' },
  { id: 'components-analysis', title: 'Bradley_AI_DER_Components_Analysis', description: "An in-depth analysis of the various hardware and software components that constitute the CarbonCheckIQ+ AI DER solution.", watermarkText: 'AI', filePath: 'https://docs.google.com/document/d/1Gm8YT_MWT0n4refOe8S-2BZbsLWS2cvQ6ewpsheeGUU/edit?usp=sharing', downloadName: 'Bradley_AI_DER_Components_Analysis.docx', fileType: 'doc' },
];


const StyledAccordion = styled(Accordion)(({ theme }) => ({ backgroundColor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius * 1.5, boxShadow: `0 2px 6px ${alpha(theme.palette.common.black, 0.06)}`, margin: theme.spacing(1.5, 0.5), transition: theme.transitions.create(['box-shadow', 'transform', 'background-color'], { duration: theme.transitions.duration.short }), '&:before': { display: 'none' }, '&.Mui-expanded': { margin: theme.spacing(1.5, 0.5), boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}` }, '&:hover': { transform: 'translateY(-3px)', boxShadow: `0 5px 15px ${alpha(theme.palette.common.black, 0.12)}`, backgroundColor: alpha(theme.palette.primary.main, 0.025) }, border: 'none' }));
const Watermark = styled(Typography)<{ isLarge: boolean }>(({ theme, isLarge }) => ({ position: 'absolute', right: theme.spacing(isLarge ? 7 : 6.5), top: '50%', transform: 'translateY(-50%)', fontSize: isLarge ? '2.8rem' : '2.2rem', fontWeight: 800, fontFamily: '"Nunito Sans", sans-serif', color: alpha(theme.palette.text.primary, 0.06), zIndex: 1, pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }));
const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({ position: 'relative', padding: theme.spacing(0, 2.5), minHeight: '64px', borderRadius: 'inherit', '&.Mui-expanded': { minHeight: '64px' }, '& .MuiAccordionSummary-content': { margin: theme.spacing(2, 0), '&.Mui-expanded': { margin: theme.spacing(2, 0) }, position: 'relative', zIndex: 2 }, '& .MuiAccordionSummary-expandIconWrapper': { color: theme.palette.text.secondary, transition: theme.transitions.create('color', { duration: theme.transitions.duration.short }), zIndex: 2, position: 'relative' }, '&:hover .MuiAccordionSummary-expandIconWrapper': { color: theme.palette.primary.main }, '&:hover .MuiTypography-root': { color: theme.palette.primary.dark } }));
const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({ padding: theme.spacing(1, 3, 2.5, 3), backgroundColor: alpha(theme.palette.grey[50], 0.3), borderBottomLeftRadius: 'inherit', borderBottomRightRadius: 'inherit' }));


const FileViewerDialog: React.FC<{ open: boolean; onClose: () => void; file: ResourceItem | null }> = ({ open, onClose, file }) => {
  const theme = useTheme();
  if (!file) return null;

  const getFileIcon = (fileType: 'doc' | 'excel') => {
    const iconStyle = { marginRight: theme.spacing(1.5) };
    if (fileType === 'excel') return <SiGooglesheets size="28px" color="#34A853" style={iconStyle} />;
    return <SiGoogledocs size="28px" color="#4285F4" style={iconStyle} />;
  };

  const getEmbedUrl = (filePath: string) => filePath.replace('/edit?usp=sharing', '/preview');

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        {getFileIcon(file.fileType)}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'inherit' }}>
          {file.downloadName}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} sx={{ color: 'grey.500' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0, height: '80vh', backgroundColor: theme.palette.grey[50], overflow: 'hidden' }}>
        <iframe src={getEmbedUrl(file.filePath)} width="100%" height="100%" style={{ border: 'none' }} title={`File viewer for ${file.title}`} />
      </DialogContent>
    </Dialog>
  );
};


export const Resources: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
  const isLarge = size === 'large';
  const [expanded, setExpanded] = useState<string | false>(false);
  const [viewingFile, setViewingFile] = useState<ResourceItem | null>(null);
  const theme = useTheme();

  const handleChange = (panelId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panelId : false);
  };
  
  const handleViewClick = (item: ResourceItem) => setViewingFile(item);
  const handleCloseDialog = () => setViewingFile(null);

  const getGoogleDriveDownloadUrl = (item: ResourceItem) => {
    const fileIdMatch = item.filePath.match(/\/d\/(.*?)\//);
    if (!fileIdMatch) return '#';
    const fileId = fileIdMatch[1];
    if (item.fileType === 'excel') return `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;
    return `https://docs.google.com/document/d/${fileId}/export?format=docx`;
  };

  return (
    <Box sx={{ width: '100%', maxHeight: '100%', overflowY: 'auto', padding: theme.spacing(0.5, isLarge ? 1 : 0.5), boxSizing: 'border-box', fontFamily: 'Nunito Sans, sans-serif', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }, }}>
      {resourcesData.map((item) => (
        <StyledAccordion key={item.id} expanded={expanded === item.id} onChange={handleChange(item.id)} disableGutters elevation={0}>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${item.id}-content`} id={`${item.id}-header`}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {item.fileType === 'doc' ? 
                <SiGoogledocs size="24px" color="#4285F4" style={{ marginRight: theme.spacing(1.5) }} /> : 
                <SiGooglesheets size="24px" color="#34A853" style={{ marginRight: theme.spacing(1.5) }} />
              }
              <Typography sx={{ fontWeight: '700', fontSize: isLarge ? '1rem' : '0.9rem', fontFamily: 'inherit', color: 'text.primary', transition: 'color 0.2s' }}>
                {item.title}
              </Typography>
            </Box>
            <Watermark isLarge={isLarge}>{item.watermarkText}</Watermark>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Typography sx={{ fontSize: isLarge ? '0.9rem' : '0.8rem', fontFamily: 'inherit', lineHeight: 1.65, color: 'text.secondary', mb: 2.5 }}>
              {item.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start' }}>
              <Tooltip title="Preview file">
                <Button variant="outlined" size="small" startIcon={<VisibilityIcon />} onClick={() => handleViewClick(item)}>
                  View
                </Button>
              </Tooltip>
              <Button variant="contained" size="small" startIcon={<DownloadIcon />} href={getGoogleDriveDownloadUrl(item)} download={item.downloadName}>
                Download
              </Button>
            </Box>
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
      <FileViewerDialog open={!!viewingFile} onClose={handleCloseDialog} file={viewingFile} />
    </Box>
  );
};