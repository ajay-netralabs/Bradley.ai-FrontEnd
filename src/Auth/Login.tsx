import React, { useMemo, useState } from 'react';
import { Box, Typography, Button, Grid, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosLogIn } from 'react-icons/io';
import { useAppContext } from '../Context/AppContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlay } from 'react-icons/fa';

const Login: React.FC = () => {
  // const { setUser } = useAppContext();
  const { loginForProduct } = useAppContext();
  const navigate = useNavigate();

  const { productKey } = useParams<{ productKey: string }>();

  const product = useMemo(() => {
    return productKey || "bradley";
  }, [productKey]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const u = await loginForProduct(product, email, password);
      if (product === "bradley") {
        navigate(u.role === "analyst" ? "/analyst" : "/bradley", { replace: true });
      } else {
        navigate(`/${product}`, { replace: true });
      }
    } catch (e: any) {
      setIsSubmitting(false);
      toast.error(e?.message || "Login failed", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: true,
        style: { fontSize: "14px", padding: "8px 16px", fontFamily: '"Nunito Sans", sans-serif' },
      });
    }
  };

  const handleSwitchProduct = () => {
    navigate(product === "emissioncheckiq" ? "/login/bradley" : "/login/emissioncheckiq");
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
              Intelligence to predict and optimize{' '}
              <span style={{ color: '#FF6B00', fontWeight: 700 }}>
                GHG Compliance.
              </span>
            </Typography>

            <Grid container spacing={1} mt={3}>
              {[
                { value: '4.5 months', label: 'Avg. time saved to attain 30% design' },
                { value: '93%', label: 'Avg. cost savings to attain 30% conceptual design' },
                { value: '18%', label: 'Avg. emission reductions from implementing DER' },
                { value: '14.1%', label: 'Avg. IRR from implementing DER' },
                { value: '38%', label: 'Avg. annual cost savings from implementing DER' },
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
                      height: '80px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      '&:hover': {
                        backgroundColor: '#262344',
                        boxShadow: '0 0 8px rgba(255, 255, 255, 0.05)',
                      },
                      fontFamily: '"Nunito Sans", sans-serif',
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="#FF6B00"
                      sx={{
                        fontFamily: '"Nunito Sans", sans-serif',
                        fontSize: '1.1rem',
                        marginBottom: '4px'
                      }}
                    >
                      {item.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#ccc',
                        fontFamily: '"Nunito Sans", sans-serif',
                        fontSize: '0.7rem',
                        lineHeight: 1.2,
                        textAlign: 'center',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
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
            padding: 3.5,
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
              width: '90%',
              fontFamily: '"Nunito Sans", sans-serif',
            }}
          >
            <h3 style={{ fontFamily: '"Nunito Sans", sans-serif' }}>{product === "emissioncheckiq" ? "Sign in to EmissionCheckIQ+" : "Sign in to Bradley.ai"}</h3>
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
              disabled={isSubmitting}
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
                backgroundColor: isSubmitting ? '#f5f5f5' : 'white',
                color: 'black',
                fontFamily: '"Nunito Sans", sans-serif',
                cursor: isSubmitting ? 'not-allowed' : 'text',
              }}
            />
          </Box>

          <Box sx={{ width: '90%', marginBottom: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor="password" style={{ fontSize: '16px', color: '#333', fontFamily: '"Nunito Sans", sans-serif' }}>
                <b>Password</b>
              </label>
              <span
                style={{
                  fontSize: '0.85rem',
                  textDecoration: 'underline',
                  color: isSubmitting ? '#999' : 'black',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontFamily: '"Nunito Sans", sans-serif',
                  pointerEvents: isSubmitting ? 'none' : 'auto',
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
              disabled={isSubmitting}
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
                backgroundColor: isSubmitting ? '#f5f5f5' : 'white',
                color: 'black',
                fontFamily: '"Nunito Sans", sans-serif',
                cursor: isSubmitting ? 'not-allowed' : 'text',
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', gap: 2, marginTop: 3 }}>
            <Button
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: '#0e0c22',
                color: 'white',
                borderRadius: 2,
                paddingX: 3.5,
                '&:hover': { backgroundColor: '#1c1b2e' },
                width: '100%',
                height: '45px',
                fontFamily: '"Nunito Sans", sans-serif',
              }}
              onClick={handleLogin}
            >
              {isSubmitting ? (
                <CircularProgress size={20} color="inherit" sx={{ marginRight: 1 }} />
              ) : (
                <IoIosLogIn size={20} style={{ marginRight: 8 }} />
              )}
              LOG IN
            </Button>
            <Button
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: '#FF6B00',
                color: 'white',
                borderRadius: 2,
                paddingX: 3.5,
                '&:hover': { backgroundColor: '#ff8533' },
                width: '100%',
                height: '45px',
                fontFamily: '"Nunito Sans", sans-serif',
              }}
              onClick={() => {
                handleSwitchProduct();
              }}
            >
              <FaPlay size={14} style={{ marginRight: 8 }} />
              {product === "emissioncheckiq" ? "Switch to Bradley.ai" : "Switch to EmissionCheckIQ+"}
            </Button>
          </Box>

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
              Don't have an account? {' '}
              <span
                onClick={() => !isSubmitting && navigate('/signup')}
                style={{
                  textDecoration: 'underline',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontFamily: '"Nunito Sans", sans-serif',
                  color: isSubmitting ? '#999' : 'inherit'
                }}
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