import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoIosLogIn } from 'react-icons/io';
import { useAppContext } from '../AppContext';
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
        style: { fontSize: '14px', padding: '8px 16px' },
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
          <Typography variant="h4" fontWeight="bold" sx={{
            fontFamily: '"Nunito Sans", sans-serif',
            padding: 4,
          }}>
            Bradley.ai
          </Typography>
          <Typography variant="body1" mt={2} sx={{
            fontFamily: '"Nunito Sans", sans-serif',
            padding: 4,
          }}>
            <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b>
          </Typography>
          <Typography variant="body1" sx={{
            fontFamily: '"Nunito Sans", sans-serif',
            padding: 4,
          }}>
            <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b>
          </Typography>
          <img
            src="public/cube1-dd27c2c5.webp"
            alt="Welcome"
            style={{ width: '100%' }}
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
            pt={0}
            sx={{
              fontFamily: '"Nunito Sans", sans-serif',
              width: '90%',
            }}
          >
            <h3>Create your account</h3>
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
            <label htmlFor="password" style={{ fontSize: '16px', color: '#333' }}>
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

          {/* Role Selection */}
          <Box sx={{ width: '90%', marginBottom: 2 }}>
            <label htmlFor="role" style={{ fontSize: '16px', color: '#333' }}>
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

          {/* Signup Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0e0c22',
              color: 'white',
              borderRadius: 5,
              marginTop: 2,
              paddingX: 3.5,
              '&:hover': {
                backgroundColor: '#1c1b2e',
              },
              width: 'auto',
							fontFamily: '"Nunito Sans", sans-serif',
            }}
            onClick={handleSignup}
          >
            <IoIosLogIn
  size={20}
  style={{
    marginRight: 8,
    transform: 'rotate(-90deg)', // Rotates 90 degrees anticlockwise
  }}
/>
            Sign Up
          </Button>

          {/* Login Link */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Typography variant="body2" textAlign="center" color='black' sx={{
        fontFamily: '"Nunito Sans", sans-serif', fontSize: '0.8rem'}}>
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
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
