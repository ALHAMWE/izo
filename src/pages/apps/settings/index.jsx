'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Alert
} from '@mui/material';
import GeneralSettingsForm from '../components/Settings/GeneralSettings/GeneralSettingsForm';
import TaxSettingsTabs from '../components/Settings/TaxSettings/TaxTabPanel';
import ProductSettingsForm from '../components/Settings/ProductSettings/ProductSettingsForm';
import AccountsSettingsForm from '../components/Settings/AccountSettings/AccountSettingForm';
import { settingsAPI } from '../../../lib/api/services/settings';
import notify from '../../../utils/notify';
import Loader from '../components/Common/Loader';
import InvoiceSettingsForm from '../components/Settings/InvoiceSettings/InvoiceSettingsForm';

const tabLabels = [
    'General Settings',
    'Product',
    'Accounts',
    'Invoices',
    'Tax',
];

function TabPanel({ children, value, index }) {
    return (
        <div hidden={value !== index} style={{ width: '100%' }}>
            {value === index && <Box sx={{ pt: 4, pb: 4 }}>{children}</Box>}
        </div>
    );
}

export default function BusinessSettingsPage() {
    const [tabIndex, setTabIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [settingsInfo, setSettingsInfo] = useState(null);
    const [settingsValue, setSettingsValue] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await settingsAPI.getSettings();
            const settings = response.data.data
            setSettingsInfo(settings?.info?.[0]);
            setSettingsValue(settings?.value);
        } catch (err) {
            setError('Failed to load settings. Please try again.');
            notify('Failed to load settings. Please try again.', 'error');
            console.error('Error fetching settings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (newIndex) => {
        setTabIndex(newIndex);
        setError('');
    };

    const handleSuccess = (message) => {
        notify(message, 'success');
        fetchSettings();
    };

    const handleError = (message) => {
        notify(message, 'error');
    };

    if (loading && !settingsInfo) {
        return <Loader />;
    }

    return (
        <>
            <Box>
                {/* Header */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" fontWeight={700}>
                        {tabLabels[tabIndex]}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Configure your business {tabLabels[tabIndex].toLowerCase()} preferences
                    </Typography>
                </Box>

                {/* Tab Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1.5,
                        mb: 3,
                        flexWrap: 'wrap',
                        pb: 2,
                    }}
                >
                    {tabLabels.map((label, idx) => (
                        <Button
                            key={label}
                            onClick={() => handleTabChange(idx)}
                            variant={tabIndex === idx ? 'contained' : 'outlined'}
                            disabled={loading}
                            sx={{
                                px: 3,
                                py: 1.2,
                                borderRadius: 2,
                                fontWeight: tabIndex === idx ? 700 : 500,
                                textTransform: 'none',
                                fontSize: '0.95rem',
                                bgcolor: tabIndex === idx ? 'primary.main' : 'transparent',
                                color: tabIndex === idx ? '#fff' : 'text.primary',
                                border: tabIndex === idx ? 'none' : '1.5px solid #d0d0d0',
                                '&:hover': {
                                    bgcolor: tabIndex === idx ? 'primary.dark' : 'rgba(0,0,0,0.04)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: tabIndex === idx ? 3 : 1
                                },
                                transition: 'all 0.2s ease',
                                '&:disabled': {
                                    opacity: 0.6,
                                    transform: 'none'
                                }
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {/* Content */}
                <TabPanel value={tabIndex} index={0}>
                    <GeneralSettingsForm
                        settingsInfo={settingsInfo}
                        settingsValue={settingsValue}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        loading={loading}
                    />
                </TabPanel>

                <TabPanel value={tabIndex} index={1}>
                    <ProductSettingsForm
                        settingsInfo={settingsInfo}
                        settingsValue={settingsValue}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        loading={loading}
                    />
                </TabPanel>

                <TabPanel value={tabIndex} index={2}>
                    <AccountsSettingsForm
                        settingsInfo={settingsInfo}
                        settingsValue={settingsValue}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        loading={loading}
                    />
                </TabPanel>

                <TabPanel value={tabIndex} index={3}>
                    <InvoiceSettingsForm
                        settingsInfo={settingsInfo}
                        settingsValue={settingsValue}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        loading={loading}
                    />
                </TabPanel>

                <TabPanel value={tabIndex} index={4}>
                    <TaxSettingsTabs
                        settingsInfo={settingsInfo}
                        settingsValue={settingsValue}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        loading={loading}
                    />
                </TabPanel>
            </Box>
        </>
    );
}
