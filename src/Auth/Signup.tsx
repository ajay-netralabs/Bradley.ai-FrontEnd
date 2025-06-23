import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoIosLogIn } from 'react-icons/io';
import { useAppContext } from '../Context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup: React.FC = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'analyst'>('client');

  const handleSignup = () => {
    if (!email || !password) {
      toast.error('Please fill in all fields', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        style: { fontSize: '14px', padding: '8px 16px', fontFamily: '"Nunito Sans", sans-serif' },
      });
      return;
    }
    setUser({ email, role });
    navigate(role === 'client' ? '/client' : '/analyst');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        fontFamily: '"Nunito Sans", sans-serif',
      }}
    >
      <ToastContainer />

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '800px',
          border: '1px solid grey',
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'white',
          fontFamily: '"Nunito Sans", sans-serif',
        }}
      >
        <Box
          sx={{
            width: '40%',
            backgroundColor: '#0e0c22',
            color: 'white',
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: '"Nunito Sans", sans-serif',
          }}
        >
          <Box>
            <Box sx={{ mb: 1 }}>
              <img
                src="/bradley_dynamic_horizontal.svg"
                alt="Logo"
                style={{ height: '70px', marginLeft: '30px', scale: '1.3' }}
              />
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 400, lineHeight: 1.5, fontFamily: '"Nunito Sans", sans-serif' }}>
              Transform weeks of DER analysis into{' '}
              <span style={{ color: '#FF6B00', fontWeight: 700 }}>
                minutes of AI-powered insights
              </span>
            </Typography>

            <Typography mt={2} sx={{ color: '#ccc', fontSize: '0.9rem', lineHeight: 1.6, fontFamily: '"Nunito Sans", sans-serif' }}>
              Join forward-thinking energy professionals who are revolutionizing how distributed energy resources are analyzed, optimized, and deployed.
            </Typography>

            <Grid container spacing={1} mt={3}>
              {[
                { value: '87%', label: 'Time Saved\non Analysis' },
                { value: '$1.58M', label: 'Avg. OpEx\nReduction' },
                { value: '224K', label: 'Therms Gas\nReduced' },
                { value: '14.1%', label: 'Internal Rate\nof Return' },
              ].map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      padding: 1.5,
                      backgroundColor: '#1d1a34',
                      color: 'white',
                      borderRadius: 2,
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#262344',
                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.05)',
                      },
                      fontFamily: '"Nunito Sans", sans-serif',
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" color="#FF6B00" sx={{ fontFamily: '"Nunito Sans", sans-serif' }}>
                      {item.value}
                    </Typography>
                    <Typography variant="caption" sx={{ whiteSpace: 'pre-line', color: '#ccc', fontFamily: '"Nunito Sans", sans-serif' }}>
                      {item.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box
          sx={{
            width: '60%',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: '"Nunito Sans", sans-serif',
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="black"
            gutterBottom
            textAlign="left"
            pb={0}
            pt={0}
            sx={{
              fontFamily: '"Nunito Sans", sans-serif',
              width: '90%',
            }}
          >
            <h3>Create your account</h3>
          </Typography>

          <Box sx={{ width: '90%', marginBottom: 2 }}>
            <label htmlFor="email" style={{ fontSize: '16px', color: '#333', fontFamily: '"Nunito Sans", sans-serif' }}>
              <b>Email</b>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                fontSize: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                height: '40px',
                boxSizing: 'border-box',
                backgroundColor: 'white',
                color: 'black',
                fontFamily: '"Nunito Sans", sans-serif',
              }}
            />
          </Box>

          <Box sx={{ width: '90%', marginBottom: 2 }}>
            <label htmlFor="password" style={{ fontSize: '16px', color: '#333', fontFamily: '"Nunito Sans", sans-serif' }}>
              <b>Password</b>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                fontSize: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                height: '40px',
                boxSizing: 'border-box',
                backgroundColor: 'white',
                color: 'black',
                fontFamily: '"Nunito Sans", sans-serif',
              }}
            />
          </Box>

          <Box sx={{ width: '90%', marginBottom: 2 }}>
            <label htmlFor="role" style={{ fontSize: '16px', color: '#333', fontFamily: '"Nunito Sans", sans-serif' }}>
              <b>Role</b>
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as 'client' | 'analyst')}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '8px',
                fontSize: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                height: '40px',
                boxSizing: 'border-box',
                backgroundColor: 'white',
                color: 'black',
                fontFamily: '"Nunito Sans", sans-serif',
              }}
            >
              <option value="client">Client</option>
              <option value="analyst">Analyst</option>
            </select>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0e0c22',
              color: 'white',
              borderRadius: 2,
              marginTop: 2,
              paddingX: 3.5,
              '&:hover': {
                backgroundColor: '#1c1b2e',
              },
              width: '90%',
              height: '45px',
              fontFamily: '"Nunito Sans", sans-serif',
            }}
            onClick={handleSignup}
          >
            <IoIosLogIn size={20} style={{ marginRight: 8, transform: 'rotate(-90deg)' }} />
            Sign Up
          </Button>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Typography
              variant="body2"
              textAlign="center"
              color="black"
              sx={{ fontFamily: '"Nunito Sans", sans-serif', fontSize: '0.8rem' }}
            >
              Already have an account? {' '}
              <span
                onClick={() => navigate('/login')}
                style={{ textDecoration: 'underline', cursor: 'pointer', fontFamily: '"Nunito Sans", sans-serif' }}
              >
                <b>Log In</b>
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
