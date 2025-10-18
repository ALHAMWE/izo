import React from 'react';
import { Typography, Box } from '@mui/material';

export default function TaxRatesForm() {
    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Tax Rates</Typography>
            {/* Replace below with Grid/Table/List as needed */}
            <Typography color="text.secondary">Here you can manage your tax rates. Add your table or fields here as needed.</Typography>
        </Box>
    );
}
