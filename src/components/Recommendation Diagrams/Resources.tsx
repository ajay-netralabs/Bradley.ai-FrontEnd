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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  watermarkText: string;
}

const resourcesData: ResourceItem[] = [
  {
    id: 'gradient-descent',
    title: 'Gradient Descent',
    description: 'Iteratively updates model parameters to minimize the loss function by moving in the direction of the negative gradient. This along with other proprietary models establish the "load curve" that the DER recommendation must comply with.',
    watermarkText: 'GD',
  },
  {
    id: 'genetic-algorithms',
    title: 'Genetic Algorithms',
    description: 'Used in AI optimization problems, and feature selection by mimicking natural selection by evolving a population of potential solutions through selection, crossover (recombination of data inputs et al), and mutation.',
    watermarkText: 'GA',
  },
  {
    id: 'bayesian-learning',
    title: 'Bayesian Learning',
    description: 'Updates the probability of a hypothesis based on observed data. Utilizing User data (observed) to hypothesize the DER options based on User prioritization.',
    watermarkText: 'BL',
  },
  {
    id: 'backpropagation',
    title: 'Backpropagation',
    description: 'Computes the error at the output layer and propagates it backward through the network to update the weights using gradient descent.',
    watermarkText: 'BP',
  },
  {
    id: 'decision-trees',
    title: 'Decision Trees & Random Forests',
    description: 'Creates a tree-like model where each solution (technical and its financial counterpart) splits data based on User prioritization conditions. Random forests combine multiple decision trees to improve accuracy of recommendation. See 704 from patent artwork.',
    watermarkText: 'DT',
  },
  {
    id: 'automl',
    title: 'AutoML (Automated Machine Learning)',
    description: 'Used in AI. Uses meta-learning, neural architecture search, and hyperparameter tuning to improve efficiency based on previous/historic analysis.',
    watermarkText: 'AML',
  },
  {
    id: 'reinforcement-learning',
    title: 'Reinforcement Learning (RL) Algorithms',
    description: 'AI autonomous system(s) uses a value function to learn the best actions/recommendation combined with Q-learning with deep neural networks.',
    watermarkText: 'RL',
  },
  {
    id: 'transformer-models',
    title: 'Transformer-Based Models (Used in Large Language Models - LLMs)',
    description: 'Creates narrative for report output. Uses self-attention mechanisms to process input sequences in parallel, improving efficiency and accuracy for tasks like text generation.',
    watermarkText: 'LLM',
  },
  {
    id: 'knn',
    title: 'k-Nearest Neighbors (k-NN)',
    description: 'AI autonomous system(s) predicting if a user is likely to move forward with a DER project, And, If a Utility is likely to increase or decrease tariffs to mitigate future costs and savings errors.',
    watermarkText: 'KNN',
  },
];

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: `0 2px 6px ${alpha(theme.palette.common.black, 0.06)}`,
  margin: theme.spacing(1.5, 0.5),
  transition: theme.transitions.create(['box-shadow', 'transform', 'background-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: theme.spacing(1.5, 0.5),
    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 5px 15px ${alpha(theme.palette.common.black, 0.12)}`,
    backgroundColor: alpha(theme.palette.primary.main, 0.025),
  },
  border: 'none',
}));

// Watermark Styled Component
const Watermark = styled(Typography)<{ isLarge: boolean }>(({ theme, isLarge }) => ({
  position: 'absolute',
  right: theme.spacing(isLarge ? 7 : 6.5),
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: isLarge ? '2.8rem' : '2.2rem',
  fontWeight: 800,
  fontFamily: '"Nunito Sans", sans-serif',
  color: alpha(theme.palette.text.primary, 0.06),
  zIndex: 1,
  pointerEvents: 'none',
  userSelect: 'none',
  lineHeight: 1,
}));

// Styled Accordion Summary (Clickable Header)
const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0, 2.5),
  minHeight: '64px',
  borderRadius: 'inherit',
  '&.Mui-expanded': {
    minHeight: '64px',
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(2, 0),
    '&.Mui-expanded': {
      margin: theme.spacing(2, 0),
    },
    position: 'relative',
    zIndex: 2,
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('color', { duration: theme.transitions.duration.short }),
    zIndex: 2,
    position: 'relative',
  },
  '&:hover .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.primary.main,
  },
  '&:hover .MuiTypography-root': {
    color: theme.palette.primary.dark,
  }
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0.5, 3, 2.5, 3),
  backgroundColor: alpha(theme.palette.grey[50], 0.3),
  borderBottomLeftRadius: 'inherit',
  borderBottomRightRadius: 'inherit',
}));

export const Resources: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
  const theme = useTheme();
  const isLarge = size === 'large';
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panelId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panelId : false);
  };

  const titleFontSize = isLarge ? '1rem' : '0.9rem';
  const descriptionFontSize = isLarge ? '0.9rem' : '0.8rem';

  return (
    <Box sx={{
        width: '100%',
        maxHeight: '100%',
        overflowY: 'auto',
        padding: theme.spacing(0.5, isLarge ? 1 : 0.5),
        boxSizing: 'border-box',
        fontFamily: 'Nunito Sans, sans-serif',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    }}>
      {resourcesData.map((item) => (
        <StyledAccordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
          disableGutters
          elevation={0}
        >
          <StyledAccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
          >
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: titleFontSize,
                fontFamily: 'inherit',
                color: theme.palette.text.primary,
                transition: theme.transitions.create('color', { duration: theme.transitions.duration.short }),
              }}
            >
              {item.title}
            </Typography>
            <Watermark isLarge={isLarge}>{item.watermarkText}</Watermark>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Typography
              sx={{
                fontSize: descriptionFontSize,
                fontFamily: 'inherit',
                lineHeight: 1.65,
                color: theme.palette.text.secondary,
              }}
            >
              {item.description}
            </Typography>
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};