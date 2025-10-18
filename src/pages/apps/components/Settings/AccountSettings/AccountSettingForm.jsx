import React from 'react';
import { Grid, Box, Typography, Card, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RHFSelectField from '../../forms/RHFSelectField';
import RHFAutocomplete from '../../forms/RHFAutocomplete';
import CustomGridContainer from '../../Common/CustomGridContainer';

const expenseOptions = [
    { label: 'Shipping', value: 'Shipping' },
    { label: 'Custom Duty', value: 'Custom Duty' },
    { label: 'Insurance', value: 'Insurance' }
];

const schema = yup.object({
    defaultCreditLimit: yup.number().typeError('Must be a number').required('Credit limit is required'),
    accountLiability: yup.string().required('Required'),
    accountAssets: yup.string().required('Required'),
    accountBank: yup.string().required('Required'),
    accountCash: yup.string().required('Required'),
    additionalExpense: yup.array().min(1, 'Select at least 1'),
    customerAccountType: yup.string().required('Required'),
    supplierAccountType: yup.string().required('Required')
});

export default function AccountSettingsForm({ settingsInfo, settingsValue }) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            accountLiability: settingsValue?.accounts_liabilities.find(a => a.id === settingsInfo?.liability)?.value || '',
            accountAssets: settingsValue?.accounts_asset.find(a => a.id === settingsInfo?.assets)?.value || '',
            accountBank: settingsValue?.accounts_bank.find(a => a.id === settingsInfo?.bank)?.value || '',
            accountCash: settingsValue?.accounts_cash.find(a => a.id === settingsInfo?.cash)?.value || '',
            additionalExpense: [],
            customerAccountType: settingsValue?.accounts_customer.find(a => a.id === settingsInfo?.customer_type_id)?.value || '',
            supplierAccountType: settingsValue?.accounts_supplier.find(a => a.id === settingsInfo?.supplier_type_id)?.value || ''
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        // submit logic here
        console.log('Contact Settings:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, p: 5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>
                    Account Settings
                </Typography>
                <CustomGridContainer>

                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="accountLiability"
                            control={control}
                            label="Account liability"
                            options={settingsValue?.accounts_liabilities}
                            error={errors.accountLiability?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="accountAssets"
                            control={control}
                            label="Account Assets"
                            options={settingsValue?.accounts_asset}
                            error={errors.accountAssets?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="accountBank"
                            control={control}
                            label="Account Bank"
                            options={settingsValue?.accounts_bank}
                            error={errors.accountBank?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="accountCash"
                            control={control}
                            label="Account Cash"
                            options={settingsValue?.accounts_cash}
                            error={errors.accountCash?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RHFAutocomplete
                            name="additionalExpense"
                            control={control}
                            label="Additional Expense"
                            options={expenseOptions}
                            multiple
                            error={errors.additionalExpense?.message}
                        // helperText="Select one or more"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="customerAccountType"
                            control={control}
                            label="Customer Account Type"
                            options={settingsValue?.accounts_customer}
                            error={errors.customerAccountType?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="supplierAccountType"
                            control={control}
                            label="Supplier Account Type"
                            options={settingsValue?.accounts_supplier}
                            error={errors.supplierAccountType?.message}
                        />
                    </Grid>
                </CustomGridContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
                    <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ px: 5, fontWeight: 600 }}>
                        Save
                    </Button>
                </Box>
            </Card>
        </form>
    );
}
