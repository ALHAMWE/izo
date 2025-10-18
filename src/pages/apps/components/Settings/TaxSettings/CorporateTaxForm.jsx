import React from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RHFSelectField from '../../forms/RHFSelectField';
import RHFTextField from '../../forms/RHFTextField';
import RHFDatePicker from '../../forms/RHFDatePicker';
import ImageUpload from '../../forms/ImageUpload';

const statusOptions = [
    { label: 'Please Select', value: '' },
    { label: 'Registered', value: 'registered' },
    { label: 'Unregistered', value: 'unregistered' },
];

const schema = yup.object({
    registrationStatus: yup.string().required(),
    ctRegistrationNo: yup.string(),
    registrationDate: yup.date().nullable(),
    firstCTFilingDate: yup.date().nullable(),
    financialYearFrom: yup.date().nullable(),
    financialYearTo: yup.date().nullable(),
    ctCertificate: yup.mixed().nullable()
});

export default function CorporateTaxForm() {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            registrationStatus: '',
            ctRegistrationNo: '',
            registrationDate: null,
            firstCTFilingDate: null,
            financialYearFrom: null,
            financialYearTo: null,
            ctCertificate: null
        },
        resolver: yupResolver(schema)
    });

    // const onSubmit = data => { /* Handle save */ };

    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        <form  >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Corporate Tax Details</Typography>
            <Grid container columnSpacing={4} rowSpacing={0}>
                <Grid item xs={12} md={4}>
                    <RHFSelectField name="registrationStatus" control={control} label="Registration status" options={statusOptions} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFTextField name="ctRegistrationNo" control={control} label="CT Registration No." />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFDatePicker name="registrationDate" control={control} label="Registration Date" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFDatePicker name="firstCTFilingDate" control={control} label="First CT Filling Date" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFDatePicker name="financialYearFrom" control={control} label="Financial Year Type From" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <RHFDatePicker name="financialYearTo" control={control} label="Financial Year Type To" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Controller
                        name="logo"
                        control={control}
                        render={({ field, fieldState }) => (
                            <ImageUpload
                                value={field.value}
                                onChange={val => setValue('ctCertificate', val)}
                                error={fieldState.error?.message}
                                text='Upload CT Certificate'
                            />
                        )}
                    />
                    {/* <Controller
                        name="ctCertificate"
                        control={control}
                        render={({ field }) => (
                            <Button
                                variant="outlined"
                                component="label"
                                sx={{ textTransform: 'none', mt: 2, minWidth: 167, color: 'white' }}
                            >
                                Choose File
                                <input
                                    type="file"
                                    hidden
                                    onChange={e => setValue('ctCertificate', e.target.files[0])}
                                    accept='.jpeg,.png,.jpg,.gif,.svg,.pdf'
                                />
                            </Button>
                        )}
                    />
                    <Typography variant="caption" mt={1}>jpeg,png,jpg,gif,svg,pdf</Typography> */}
                </Grid>
            </Grid>
            <Box sx={{ pt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" sx={{ px: 4, py: 2.5, borderRadius: 2, fontWeight: 600 }}>Save</Button>
                <Button type="button" variant="outlined" color="inherit" sx={{ px: 4, py: 2.5, borderRadius: 2, fontWeight: 600 }}>Cancel</Button>
            </Box>
        </form>
    );
}
