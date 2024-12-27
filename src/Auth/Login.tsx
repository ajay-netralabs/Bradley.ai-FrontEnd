import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoIosLogIn } from 'react-icons/io';
import { useAppContext } from '../Context API/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const { setUser, credentials } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const clientCredentials = credentials.client;
    const analystCredentials = credentials.analyst;

    if (email === clientCredentials.email && password === clientCredentials.password) {
      setUser({ email, role: 'client' });
      navigate('/client');
    } else if (email === analystCredentials.email && password === analystCredentials.password) {
      setUser({ email, role: 'analyst' });
      navigate('/analyst');
    } else {
      toast.error('Invalid email or password', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        style: { fontSize: '14px', padding: '8px 16px' }, // Smaller and subtle toast
      });
    }
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
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            width: '40%',
            backgroundColor: '#0e0c22',
            color: 'white',
            margin: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              fontFamily: '"Nunito Sans", sans-serif',
              padding: 4,
            }}
          >
            Bradley.ai
          </Typography>
          <Typography
            variant="body1"
            mt={2}
            sx={{
              fontFamily: '"Nunito Sans", sans-serif',
              padding: 4,
            }}
          >
            <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Nunito Sans", sans-serif',
              padding: 4,
            }}
          >
            <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b>
          </Typography>
          <img
            src="/bg.webp"
            alt="Welcome"
            style={{
              width: '100%',
              fontFamily: '"Nunito Sans", sans-serif',
            }}
          />
        </Box>

        {/* Right Panel */}
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
            pt={5}
            sx={{
              fontFamily: '"Nunito Sans", sans-serif',
              width: '90%',
            }}
          >
            <h3>Sign in to Bradley.ai</h3>
          </Typography>

          {/* Email Input */}
          <Box sx={{ width: '90%', marginBottom: 2 }}>
            <label htmlFor="email" style={{ fontSize: '16px', color: '#333' }}>
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

          {/* Password Input */}
          <Box sx={{ width: '90%', marginBottom: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="password" style={{ fontSize: '16px', color: '#333' }}>
                <b>Password</b>
              </label>
              <span
                style={{
                  fontSize: '0.85rem',
                  textDecoration: 'underline',
                  color: 'black',
                  cursor: 'pointer',
                }}
              >
                <b>Forgot?</b>
              </span>
            </div>
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

          {/* Login Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0e0c22',
              color: 'white',
              borderRadius: 5,
              marginTop: 3,
              paddingX: 3.5,
              '&:hover': {
                backgroundColor: '#1c1b2e',
              },
              width: 'auto',
              fontFamily: '"Nunito Sans", sans-serif',
            }}
            onClick={handleLogin}
          >
            <IoIosLogIn size={20} style={{ marginRight: 8 }} />
            LOG IN
          </Button>

          {/* Sign Up Link */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Typography
              variant="body2"
              textAlign="center"
              color="black"
              sx={{
                fontFamily: '"Nunito Sans", sans-serif',
                fontSize: '0.8rem',
              }}
            >
              Don’t have an account? {' '}
              <span
                onClick={() => navigate('/signup')}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                <b>Sign Up</b>
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
