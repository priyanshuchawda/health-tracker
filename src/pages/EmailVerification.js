import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import { verifyEmail } from '../services/authService';

const EmailVerification = () => {
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    verify();
  }, [token]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography>Verifying your email...</Typography>
          </Box>
        );
      case 'success':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Email Verified Successfully!
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Proceed to Login
            </Button>
          </Box>
        );
      case 'error':
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Error color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Verification Failed
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              The verification link may be invalid or expired.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{ mt: 2 }}
            >
              Register Again
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        {renderContent()}
      </Paper>
    </Container>
  );
};

export default EmailVerification;
