import React from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RHFSelectField from '../../forms/RHFSelectField';
import RHFDatePicker from '../../forms/RHFDatePicker';
import RHFTextField from '../../forms/RHFTextField';

const statusOptions = [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }];
const cycles = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Yearly', value: 'yearly' }
];

const schema = yup.object({
    registrationStatus: yup.string().required(),
    registrationDate: yup.date().nullable(),
    firstVatFilingDate: yup.date().nullable(),
    vatPeriodCycle: yup.string().required(),
    exciseTaxRegistered: yup.string().required(),
    taxAgencyName: yup.string(),
    exciseTRN: yup.string(),
    taxAgentName: yup.string(),
    tan: yup.string(),
    taan: yup.string()
});

export default function VATTaxForm() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            registrationStatus: 'yes',
            registrationDate: null,
            firstVatFilingDate: null,
            vatPeriodCycle: 'quarterly',
            exciseTaxRegistered: 'yes',
            taxAgencyName: '',
            exciseTRN: '',
            taxAgentName: '',
            tan: '',
            taan: ''
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = data => { /* Handle save */ };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>VAT Tax Details</Typography>
            <Grid container columnSpacing={4} rowSpacing={0}>
                <Grid item xs={12} md={3}>
                    <RHFSelectField name="registrationStatus" control={control} label="Registration status" options={statusOptions} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFDatePicker name="registrationDate" control={control} label="Registration Date" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFDatePicker name="firstVatFilingDate" control={control} label="First VAT Filing Date" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFSelectField name="vatPeriodCycle" control={control} label="VAT Period Cycle" options={cycles} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFSelectField name="exciseTaxRegistered" control={control} label="Excise Tax Registered" options={statusOptions} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFTextField name="taxAgencyName" control={control} label="Tax Agency Name" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFTextField name="tan" control={control} label="TAN" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFTextField name="taxAgentName" control={control} label="Tax Agent Name" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFTextField name="taan" control={control} label="TAAN" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFTextField name="exciseTRN" control={control} label="Excise TRN" />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', mt: 2, justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" sx={{ px: 4, py: 2.5, borderRadius: 2, fontWeight: 600 }}>
                    Save
                </Button>
            </Box>
        </form>
    );
}
