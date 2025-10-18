import React, { useState } from 'react';
import { Box, Tabs, Tab, Card, Divider } from '@mui/material';
import TaxRatesForm from './TaxRatesForm';
import CorporateTaxForm from './CorporateTaxForm'; 
import VATTaxForm from './VATTaxForm'; 

const taxTabLabels = [
    'Tax Rates',
    'Corporate Tax Details',
    'VAT Tax Details'
];

function TabPanel({ children, value, index }) {
    return (
        <div hidden={value !== index} style={{ width: '100%' }}>
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

export default function TaxSettingsTabs() {
    const [taxTab, setTaxTab] = useState(0);

    return (
        <Card sx={{ borderRadius: 4, p: 4 }}>
            <Tabs
                value={taxTab}
                onChange={(_, val) => setTaxTab(val)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    mb: 2,
                    '& .Mui-selected': {
                        bgcolor: 'primary.main',
                        color: '#fff !important',
                        borderRadius: 2
                    },
                    '& .MuiTabs-indicator': { display: 'none' }
                }}
            >
                {taxTabLabels.map(label =>
                    <Tab label={label} key={label} sx={{ minHeight: 44, fontWeight: 600 }} />
                )}
            </Tabs>
            <Divider sx={{ mb: 2 }} />
            <TabPanel value={taxTab} index={0}>
                <TaxRatesForm />
            </TabPanel>
            <TabPanel value={taxTab} index={1}>
                <CorporateTaxForm />
            </TabPanel>
            <TabPanel value={taxTab} index={2}>
                <VATTaxForm />
            </TabPanel>
        </Card>
    );
}
