import React, { useState } from 'react';
import { Box, Card, CardContent, Button } from '@mui/material';
import SidebarStepper from '../../Stepper/SidebarStepper';
import LabelIcon from '@mui/icons-material/Label';
import PatternIcon from '@mui/icons-material/Texture';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SalesSettingsForm from './SalesSettingsForm';
import PurchaseSettingsForm from './PurchasesSettingsForm';
import PrefixSettings from './PrefixSettings';
import PatternSettings from './PatternSettings';

const steps = [
    { title: 'Prefixes', icon: <LabelIcon /> },
    { title: 'Patterns', icon: <PatternIcon /> },
    { title: 'Sales', icon: <ShoppingCartIcon /> },
    { title: 'Purchase', icon: <LocalMallIcon /> }
];

export default function InvoiceSettingsForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);

    const onNext = async () => {
        setLoading(true);
        try {
            // Replace with your API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // alert(`Step ${activeStep + 1} saved (simulate API call)`);
            setActiveStep(s => Math.min(s + 1, steps.length - 1));
        } catch {
            alert('Save failed');
        } finally {
            setLoading(false);
        }
    };

    const onPrev = () => setActiveStep(s => Math.max(s - 1, 0));

    const stepPanels = [
        <PrefixSettings key="prefix" onSave={onNext} />,
        <PatternSettings key="pattern" onSave={onNext} />,
        <SalesSettingsForm key="sales" onSave={onNext} />,
        <PurchaseSettingsForm key="purchase" onSave={onNext} />
    ];

    return (
        <form>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, borderRadius: 2, boxShadow: 3 }}>
                <SidebarStepper steps={steps} activeStep={activeStep} onStepClick={setActiveStep} />
                <CardContent sx={{ flex: 1, p: { xs: 2, md: 5 } }}>
                    {stepPanels[activeStep]}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                        <Button variant="outlined" onClick={onPrev} disabled={activeStep === 0} >Previous</Button>
                        {activeStep < steps.length - 1 && (
                            <Button variant="contained" onClick={onNext} disabled={loading}>
                                {loading ? 'Saving...' : 'Next'}
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </form>
    );
}
