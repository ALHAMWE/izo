import React from 'react';
import { Grid, Button, Box, Typography, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RHFCheckBox from '../../forms/RHFSwitch';
import RHFTextField from '../../forms/RHFTextField';
import RHFSelectField from '../../forms/RHFSelectField';
import CustomGridContainer from '../../Common/CustomGridContainer';
import RHFDatePicker from '../../forms/RHFDatePicker';

const schema = yup.object({
    defaultProfitPercent: yup.number().typeError('Profit Percent must be a Number').required('Default profit percent is Required'),
    continuousInventory: yup.boolean(),
    defaultUnit: yup.string().required('Default Unit is Required'),
    costOfSalesAccount: yup.string().required('Cost of Sales Account is Required'),
    inventoryAccount: yup.string().required('Inventory Account is Required'),
    skuPrefix: yup.string(),
    enableProductExpiry: yup.boolean(),
    typeOfCost: yup.string().required('Please select Type of Cost'),
    onProductExpiry: yup.string().when('enableProductExpiry', {
        is: true,
        then: yup.string().required('Please select action on Product Expiry'),
        otherwise: yup.string().notRequired()
    })
});

export default function ProductSettingsForm({ settingsInfo, settingsValue  }) {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            defaultProfitPercent: settingsInfo?.default_profit_percent || 0,
            startFrom: '',
            continuousInventory: settingsInfo?.continuous_inventory || false,
            defaultUnit: settingsValue?.units.find(a => a.id === settingsInfo?.default_unit)?.value || '',
            costOfSalesAccount: settingsValue?.accounts_inventory_sale_cost.find(a => a.id === settingsInfo?.inventory_sale_cost)?.value || '',
            inventoryAccount: settingsValue?.accounts_inventory_stock.find(a => a.id === settingsInfo?.inventory_stock)?.value || '',
            typeOfCost: settingsValue?.type_of_cost.find(a => a.id === settingsInfo?.type_of_cost)?.value || '',
            skuPrefix: settingsInfo?.sku_prefix || '',
            enableProductExpiry: settingsInfo?.enable_product_expiry || false,
            onProductExpiry: settingsValue?.product_expiry_sale.find(a => a.id === settingsInfo?.on_product_expiry)?.value || '',
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
                <CustomGridContainer sx={{ alignItems: 'center' }}>
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
                            options={settingsValue?.units}
                            error={errors.defaultUnit?.message}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <RHFCheckBox
                            name="continuousInventory"
                            control={control}
                            label="Continuous Inventory"
                            sx={{ mt: 1.5 }}
                        />
                    </Grid>

                    {continuousInventory && (
                        <>
                            <Grid item xs={12} md={3}>
                                <RHFSelectField
                                    name="costOfSalesAccount"
                                    control={control}
                                    label="Cost of Sales Account"
                                    options={settingsValue?.accounts_inventory_sale_cost}
                                    error={errors.costOfSalesAccount?.message}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <RHFSelectField
                                    name="inventoryAccount"
                                    control={control}
                                    label="Inventory Account"
                                    options={settingsValue?.accounts_inventory_stock}
                                    error={errors.inventoryAccount?.message}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <RHFSelectField
                                    name="typeOfCost"
                                    control={control}
                                    label="Type of Cost"
                                    options={settingsValue?.type_of_cost}
                                    error={errors.typeOfCost?.message}
                                />
                            </Grid>
                        </>
                    )}

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
                                options={settingsValue?.product_expiry_sale}
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
