import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Table, TableHead, TableBody, TableRow, TableCell, IconButton, ToggleButton, ToggleButtonGroup, Grid, Pagination } from '@mui/material';
import { Search, TableChart, ViewModule, Edit, Delete } from '@mui/icons-material';

const projectStatuses = [
  { title: 'Onboarding', projects: [{ name: 'Project A', shortDesc: 'Initial setup for stakeholders.' }, { name: 'Project B', shortDesc: 'User access configurations.' }] },
  { title: 'Analysis in Progress', projects: [{ name: 'Project C', shortDesc: 'Data collection ongoing.' }, { name: 'Project D', shortDesc: 'Trend analysis in progress.' }] },
  { title: 'Analyst Review', projects: [{ name: 'Project E', shortDesc: 'Metrics review initiated.' }, { name: 'Project F', shortDesc: 'Evaluation of success criteria.' }] },
  { title: 'Ready for Recommendation', projects: [{ name: 'Project G', shortDesc: 'Recommendation draft pending.' }, { name: 'Project H', shortDesc: 'Final review before submission.' }] },
  { title: 'Completed', projects: [{ name: 'Project I', shortDesc: 'Archived for future reference.' }, { name: 'Project J', shortDesc: 'Documentation finalized.' }] },
];

const customers = [
  { id: 1, user: 'John Doe', email: 'john@example.com', memberSince: '2023-01-15' },
  { id: 2, user: 'Jane Smith', email: 'jane@example.com', memberSince: '2022-08-10' },
  { id: 3, user: 'Alice Johnson', email: 'alice@example.com', memberSince: '2021-12-05' },
  { id: 4, user: 'Bob Brown', email: 'bob@example.com', memberSince: '2020-07-22' },
  { id: 5, user: 'Charlie Davis', email: 'charlie@example.com', memberSince: '2019-04-13' },
  { id: 6, user: 'David Evans', email: 'david@example.com', memberSince: '2018-10-30' },
  { id: 7, user: 'Emily Foster', email: 'emily@example.com', memberSince: '2017-05-17' },
];

const Dashboard: React.FC = () => {
  const [view, setView] = useState<'table' | 'card'>('table');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: 'table' | 'card') => {
    if (newView) setView(newView);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.user.toLowerCase().includes(search.toLowerCase()) || customer.email.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>

      {/* Project Status Section */}
      <Typography variant="h6" sx={{ mb: 1, px: { xs: '20px', md: '20px' }, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'left', }}>
        <h2>Project Status:</h2>
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pb: '10px', px: { xs: '20px', md: '20px' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 1 }}>
          {projectStatuses.map((status, index) => (
            <Card key={index} sx={{ flex: 1, padding: 1, textAlign: 'center', backgroundColor: '#f5f5f5', boxShadow: 0, borderRadius: '8px', pb: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
              <CardContent>
                <Box sx={{ minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', pb: 1 }}>
                    <b>{status.title}</b>
                  </Typography>
                </Box>
                {status.projects.map((project, projectIndex) => (
                  <Box key={projectIndex} sx={{ backgroundColor: '#fff', boxShadow: 1, borderRadius: '8px', mb: 1, textAlign: 'left', padding: 1, fontSize: '0.8rem', }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{project.name}</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: 'gray' }}>{project.shortDesc}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: '20px', md: '20px' }, mt: 3, mb: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1, mr: 2, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'left' }}>
                <h2>Customer List:</h2>
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
    size="small"
    placeholder="Search customers..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    InputProps={{
        startAdornment: <Search fontSize="small" sx={{ fontSize: '1rem' }} />,
    }}
    sx={{
        '& .MuiOutlinedInput-root': {
            height: '32px',
            fontSize: '0.875rem',
            padding: '0 8px',
            '& .MuiOutlinedInput-input': {
                padding: '4px 8px',
            },
            '&.Mui-focusVisible .MuiOutlinedInput-notchedOutline': {
                borderColor: 'inherit',
                border: '1px solid #ced4da',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ced4da',
            },
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ced4da',
            },
        },
        '& .MuiInputBase-input': {
            height: '20px',
        },
        '& .MuiSvgIcon-root': {
            fontSize: '1rem',
        },
    }}
/>

                <ToggleButtonGroup value={view} exclusive onChange={handleViewChange} size="small" sx={{ height: '32px' }}>
                    <ToggleButton value="table" sx={{ height: '100%', '&.Mui-focusVisible': { outline: 'none' } }}>
                        <TableChart fontSize="small" sx={{ fontSize: '1rem' }} />
                    </ToggleButton>
                    <ToggleButton value="card" sx={{ height: '100%', '&.Mui-focusVisible': { outline: 'none' } }}>
                        <ViewModule fontSize="small" sx={{ fontSize: '1rem' }} />
                    </ToggleButton>
                </ToggleButtonGroup>

            </Box>
        </Box>

      {/* Customer List - Table View */}
      {view === 'table' ? (
        <Box sx={{ overflowX: 'auto', px: { xs: '20px', md: '20px' }, mb: 3 }}>
          <Table sx={{ minWidth: 600, borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Member Since</TableCell>
                <TableCell sx={{ fontWeight: 'bold', borderBottom: '1px solid #ddd' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow key={customer.id} sx={{ backgroundColor: '#fff', borderRadius: '8px', height: '40px' }}>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{customer.user}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{customer.email}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem' }}>{customer.memberSince}</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} size="small" />
          </Box>
        </Box>
      ) : (
        <Grid container spacing={2} px={2}>
          {paginatedCustomers.map((customer) => (
            <Grid item xs={12} sm={6} md={4} key={customer.id}>
              <Card sx={{ boxShadow: 1, borderRadius: '8px', padding: 2 }}>
                <CardContent>
                  <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{customer.user}</Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: 'gray' }}>{customer.email}</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'gray', mb: 1 }}>
                    Member since: {customer.memberSince}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
