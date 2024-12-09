import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const projectStatuses = [
  {
    title: 'Onboarding',
    projects: [
      { name: 'Project A', shortDesc: 'Initial setup for stakeholders.' },
      { name: 'Project B', shortDesc: 'User access configurations.' },
    ],
  },
  {
    title: 'Analysis in Progress',
    projects: [
      { name: 'Project C', shortDesc: 'Data collection ongoing.' },
      { name: 'Project D', shortDesc: 'Trend analysis in progress.' },
    ],
  },
  {
    title: 'Analyst Review',
    projects: [
      { name: 'Project E', shortDesc: 'Metrics review initiated.' },
      { name: 'Project F', shortDesc: 'Evaluation of success criteria.' },
    ],
  },
  {
    title: 'Ready for Recommendation',
    projects: [
      { name: 'Project G', shortDesc: 'Recommendation draft pending.' },
      { name: 'Project H', shortDesc: 'Final review before submission.' },
    ],
  },
  {
    title: 'Completed',
    projects: [
      { name: 'Project I', shortDesc: 'Archived for future reference.' },
      { name: 'Project J', shortDesc: 'Documentation finalized.' },
    ],
  },
];

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.75rem',
        p: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          px: { xs: '20px', md: '20px' },
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        <h2>Project Status:</h2>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pb: '10px',
          px: { xs: '20px', md: '20px' },
        }}
      >

        <Box
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            mt: 1,
          }}
        >
          {projectStatuses.map((status, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                padding: 1,
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                boxShadow: 0,
                borderRadius: '8px',
                pb: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <CardContent>
                <Box sx={{ minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      pb: 1,
                    }}
                  >
                    <b>{status.title}</b>
                  </Typography>
                </Box>

                {/* Render Project Mini-Cards */}
                {status.projects.map((project, projectIndex) => (
                  <Box
                    key={projectIndex}
                    sx={{
                      backgroundColor: '#fff',
                      boxShadow: 1,
                      borderRadius: '8px',
                      mb: 1,
                      textAlign: 'left',
                      padding: 1,
                      fontSize: '0.8rem',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                      }}
                    >
                      {project.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        fontSize: '0.75rem',
                        color: 'gray',
                      }}
                    >
                      {project.shortDesc}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>



			<Typography
        variant="h6"
        sx={{
          mb: 1,
          px: { xs: '20px', md: '20px' },
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        <h2>Customer List:</h2>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pb: '10px',
          px: { xs: '20px', md: '20px' },
        }}
      >

        <Box
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            mt: 1,
          }}
        >
          {projectStatuses.map((status, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                padding: 1,
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                boxShadow: 0,
                borderRadius: '8px',
                pb: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            >
              <CardContent>
                <Box sx={{ minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      pb: 1,
                    }}
                  >
                    <b>{status.title}</b>
                  </Typography>
                </Box>

                {/* Render Project Mini-Cards */}
                {status.projects.map((project, projectIndex) => (
                  <Box
                    key={projectIndex}
                    sx={{
                      backgroundColor: '#fff',
                      boxShadow: 1,
                      borderRadius: '8px',
                      mb: 1,
                      textAlign: 'left',
                      padding: 1,
                      fontSize: '0.8rem',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                      }}
                    >
                      {project.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        fontSize: '0.75rem',
                        color: 'gray',
                      }}
                    >
                      {project.shortDesc}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
