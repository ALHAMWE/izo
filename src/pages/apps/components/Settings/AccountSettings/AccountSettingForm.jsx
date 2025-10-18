import React from 'react';
import { Grid, Box, Typography, Card, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RHFTextField from '../../forms/RHFTextField';
import RHFSelectField from '../../forms/RHFSelectField';
import RHFAutocomplete from '../../forms/RHFAutocomplete';
import CustomGridContainer from '../../Common/CustomGridContainer';

const accounts = [
    { label: 'Liabilities', value: 'liabilities' },
    { label: 'Assets', value: 'assets' },
    { label: 'Bank', value: 'bank' },
    { label: 'Cash In Hand', value: 'cash_in_hand' },
    { label: 'Customers', value: 'customers' },
    { label: 'Suppliers', value: 'suppliers' }
];
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

export default function AccountSettingsForm() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            accountLiability: '',
            accountAssets: '',
            accountBank: '',
            accountCash: '',
            additionalExpense: [],
            customerAccountType: '',
            supplierAccountType: ''
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
                            options={accounts.filter(a => a.label === 'Liabilities')}
                            error={errors.accountLiability?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="accountAssets"
                            control={control}
                            label="Account Assets"
                            options={accounts.filter(a => a.label === 'Assets')}
                            error={errors.accountAssets?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="accountBank"
                            control={control}
                            label="Account Bank"
                            options={accounts.filter(a => a.label === 'Bank')}
                            error={errors.accountBank?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="accountCash"
                            control={control}
                            label="Account Cash"
                            options={accounts.filter(a => a.label === 'Cash In Hand')}
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
                            options={accounts.filter(a => a.label === 'Customers')}
                            error={errors.customerAccountType?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="supplierAccountType"
                            control={control}
                            label="Supplier Account Type"
                            options={accounts.filter(a => a.label === 'Suppliers')}
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
