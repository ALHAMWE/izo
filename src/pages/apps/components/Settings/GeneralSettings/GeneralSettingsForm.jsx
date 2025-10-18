'use client';

import React, { useState } from 'react';
import { Box, Card, CardContent, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SidebarStepper from '../../Stepper/SidebarStepper';
import BusinessInformationStep from './BusinessInformationStep';
import AccountSettingsStep from './AccountSettingsStep';
import FormatDisplayStep from './FormatDisplayStep';
import { getImageUrl, getTimeFormat } from 'src/utils/helper';

const steps = [
    { title: 'Business Information', icon: <BusinessIcon />, subtitle: 'General company details' },
    { title: 'Account Settings', icon: <SettingsIcon />, subtitle: 'Fiscal and Profit setup' },
    { title: 'Format and Display', icon: <FormatListBulletedIcon />, subtitle: 'UI preferences' }
];

// Yup validation schemas for each step
const schemaStep1 = yup.object({
    businessName: yup.string().required('Business Name is Required'),
    currency: yup.string().required('Currency is Required'),
    timeZone: yup.string().required('Time zone is Required'),
    logo: yup.mixed().nullable()
});
const schemaStep2 = yup.object({
    fixingDate: yup.date().nullable(),
    startDate: yup.date().typeError('Start Date is Required').nullable().required('Start Date is Required'),
    financialYearStartMonth: yup.string().required('Required'),
    defaultProfitPercent: yup.number().typeError('Must be a number').required('Required'),
    // continuousInventory: yup.boolean()
});
const schemaStep3 = yup.object({
    dateFormat: yup.string().required('Required'),
    timeFormat: yup.string().required('Required'),
    currencySymbolPlacement: yup.string().required('Required'),
    openingBalanceVoucher: yup.string().required('Required'),
    numbersAfterCommaAmount: yup.string().required('Required'),
    numbersAfterCommaQty: yup.string().required('Required')
});

const GeneralSettingsForm = ({ settingsInfo, settingsValue, onSuccess, onError, loading }) => {
    const [activeStep, setActiveStep] = useState(0);

    const defaultValues = {
        businessName: settingsInfo?.name || '',
        currency: settingsValue?.currencies.find(c => c.id === settingsInfo?.currency_id)?.value || '',
        timeZone: settingsInfo?.time_zone,
        logo: getImageUrl(settingsInfo?.logo, 'business_logo'),
        fixingDate: settingsInfo?.transaction_edit_date,
        startDate: settingsInfo?.start_date,
        financialYearStartMonth: settingsValue?.months.find(m => m.id === settingsInfo?.fy_start_month)?.value || '',
        defaultProfitPercent: 0,
        dateFormat: settingsValue?.date_formats.find(d => d.id === settingsInfo?.date_format)?.value || '',
        timeFormat: getTimeFormat(settingsInfo?.time_format) || '',
        currencySymbolPlacement: settingsValue?.currency_symbol_placement.find(d => d.id === settingsInfo?.currency_symbol_placement)?.value || '',
        openingBalanceVoucher: '',
        numbersAfterCommaAmount: settingsValue?.amount_digit.find(d => d.id === settingsInfo?.amount_currency_precision)?.value || '0.00',
        numbersAfterCommaQty: settingsValue?.amount_digit.find(d => d.id === settingsInfo?.qty_currency_precision)?.value || '0.00',
    };

    const {
        control,
        setValue,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues,
        resolver: yupResolver(
            activeStep === 0 ? schemaStep1 : activeStep === 1 ? schemaStep2 : schemaStep3
        ),
        mode: 'onTouched'
    });

    // Fields to validate for each step
    const stepFields = [
        ['businessName', 'currency', 'timeZone', 'logo'],
        ['fixingDate', 'startDate', 'financialYearStartMonth', 'defaultProfitPercent'],
        ['dateFormat', 'timeFormat', 'currencySymbolPlacement', 'openingBalanceVoucher', 'numbersAfterCommaAmount', 'numbersAfterCommaQty']
    ];

    const onNext = async () => {
        const valid = await trigger(stepFields[activeStep]);
        if (valid) setActiveStep(s => s + 1);
    };
    const onPrev = () => setActiveStep(s => s - 1);

    const onSubmit = async (data) => {
        try {
            // Replace with your submission logic
            alert('Business settings saved!\n\n' + JSON.stringify(data, null, 2));
        } catch {
            // Handle error
        }
    };

    // Step content panels
    const stepPanels = [
        <BusinessInformationStep key="step1" control={control} errors={errors} setValue={setValue} settingsValue={settingsValue} />,
        <AccountSettingsStep key="step2" control={control} errors={errors} settingsValue={settingsValue} />,
        <FormatDisplayStep key="step3" control={control} errors={errors} settingsValue={settingsValue} />
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, borderRadius: 2, boxShadow: 3 }}>
                {/* Sidebar Stepper */}
                <SidebarStepper steps={steps} activeStep={activeStep} onStepClick={setActiveStep} />

                {/* Right Panel: Dynamic Step Content and Navigation */}
                <CardContent sx={{ flex: 1, p: { xs: 2.5, md: 5 } }}>
                    {stepPanels[activeStep]}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            onClick={onPrev}
                            disabled={activeStep === 0}
                            sx={{ px: 4, py: 1.5, borderRadius: 1, fontWeight: 600 }}
                        >
                            Previous
                        </Button>
                        {activeStep < steps.length - 1 ? (
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                onClick={onNext}
                                sx={{ px: 4, py: 1.5, borderRadius: 1, fontWeight: 600 }}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                sx={{ px: 4, py: 1.5, borderRadius: 1, fontWeight: 600 }}
                            >
                                Save Business Settings
                            </Button>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </form>
    );
};

export default GeneralSettingsForm;
