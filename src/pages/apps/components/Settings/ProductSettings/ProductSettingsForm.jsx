import React from 'react';
import { Grid, Button, Box, Typography, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RHFCheckBox from '../../forms/RHFCheckBox';
import RHFTextField from '../../forms/RHFTextField';
import RHFSelectField from '../../forms/RHFSelectField';
import CustomGridContainer from '../../Common/CustomGridContainer';
import RHFDatePicker from '../../forms/RHFDatePicker';

const expiryActions = [
    { label: 'None', value: 'none' },
    { label: 'Block Sales', value: 'block' },
    { label: 'Warn Only', value: 'warn' }
];

const units = [
    { label: 'Pieces (Pc/s)', value: 'pieces' },
    { label: 'Box', value: 'box' },
    { label: 'Kilograms (kg)', value: 'kg' },
];

const costOfSalesAccounts = [
    { label: 'Cost Account 1', value: 'cost1' },
    { label: 'Cost Account 2', value: 'cost2' }
];
const inventoryAccounts = [
    { label: 'Inventory Account 1', value: 'inventory1' },
    { label: 'Inventory Account 2', value: 'inventory2' }
];

const schema = yup.object({
    defaultProfitPercent: yup.number().typeError('Profit percent must be a number').required('Default profit percent is required'),
    continuousInventory: yup.boolean(),
    costOfSalesAccount: yup.string().required('Cost of Sales Account is required'),
    inventoryAccount: yup.string().required('Inventory Account is required'),
    skuPrefix: yup.string(),
    enableProductExpiry: yup.boolean(),
    onProductExpiry: yup.string().when('enableProductExpiry', {
        is: true,
        then: yup.string().required('Please select action on product expiry'),
        otherwise: yup.string().notRequired()
    })
});

export default function ProductSettingsForm() {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            defaultProfitPercent: 0,
            startFrom: '',
            continuousInventory: false,
            costOfSalesAccount: '',
            inventoryAccount: '',
            skuPrefix: '',
            enableProductExpiry: false,
            onProductExpiry: ''
        },
        resolver: yupResolver(schema)
    });

    const enableProductExpiry = watch('enableProductExpiry');
    const continuousInventory = watch('continuousInventory');

    const onSubmit = (data) => {
        // Handle form submission
        console.log('Form Data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, p: 5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>
                    Product Settings
                </Typography>
                <CustomGridContainer>
                    <Grid item xs={12} md={3}>
                        <RHFDatePicker
                            name="startFrom"
                            control={control}
                            label="Start From"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFTextField
                            name="defaultProfitPercent"
                            control={control}
                            label="Default Profit Percent"
                            type="number"
                            error={!!errors.defaultProfitPercent}
                            helperText={errors.defaultProfitPercent?.message}
                        />
                    </Grid>


                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="defaultUnit"
                            control={control}
                            label="Default Unit"
                            options={units}
                            error={errors.defaultUnit?.message}
                        />
                    </Grid>

                    {continuousInventory && (
                        <>
                            <Grid item xs={12} md={3}>
                                <RHFSelectField
                                    name="costOfSalesAccount"
                                    control={control}
                                    label="Cost of Sales Account"
                                    options={costOfSalesAccounts}
                                    error={errors.costOfSalesAccount?.message}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <RHFSelectField
                                    name="inventoryAccount"
                                    control={control}
                                    label="Inventory Account"
                                    options={inventoryAccounts}
                                    error={errors.inventoryAccount?.message}
                                />
                            </Grid>
                        </>
                    )}

                    <Grid item xs={12} md={3}>
                        <RHFCheckBox
                            name="continuousInventory"
                            control={control}
                            label="Continuous Inventory"
                            sx={{ mt: 1.5 }}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <RHFCheckBox
                            name="enableProductExpiry"
                            control={control}
                            label="Enable Product Expiry"
                            sx={{ mt: 1.5 }}
                        />
                    </Grid>

                    {enableProductExpiry && (
                        <Grid item xs={12} md={3}>
                            <RHFSelectField
                                name="onProductExpiry"
                                control={control}
                                label="On Product Expiry"
                                options={expiryActions}
                                error={errors.onProductExpiry?.message}
                            />
                        </Grid>
                    )}
                </CustomGridContainer>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{ paddingX: 5, fontWeight: 600 }}
                    >
                        Save
                    </Button>
                </Box>
            </Card>
        </form>
    );
}
