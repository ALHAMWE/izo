import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loader = ({ message = 'Loading...' }) => (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="300px" width="100%" height='90vh'>
        <CircularProgress color="primary" />
        <Box mt={2} color="text.secondary">{message}</Box>
    </Box>
);

export default Loader;
