import React from 'react';
import { Grid, Button, Box, Typography, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RHFTextField from '../../forms/RHFTextField';
import RHFSelectField from '../../forms/RHFSelectField';
import RHFCheckBox from '../../forms/RHFCheckBox';
import CustomGridContainer from '../../Common/CustomGridContainer';

const commissionAgentOptions = [
    { label: 'Disable', value: 'disable' },
    { label: 'Enable', value: 'enable' }
];
const itemAdditionMethodOptions = [
    { label: 'Add item in new row', value: 'new_row' },
    { label: 'Increase quantity if exists', value: 'increase_quantity' }
];
const sourceOfSalePriceOptions = [
    { label: 'CUSTOMER SALE PRICE AFTER TOTAL DISCOUNT', value: 'after_discount' },
    { label: 'CUSTOMER SALE PRICE BEFORE TOTAL DISCOUNT', value: 'before_discount' }
];
const roundingMethodOptions = [
    { label: 'None', value: 'none' },
    { label: 'Round Up', value: 'up' },
    { label: 'Round Down', value: 'down' }
];

const schema = yup.object({
    defaultSaleDiscount: yup.number().typeError('Must be a number').required('Required'),
    salesCommissionAgent: yup.string().required('Required'),
    salesItemAdditionMethod: yup.string().required('Required'),
    sourceOfSalePrice: yup.string().required('Required'),
    roundingMethod: yup.string().required('Required'),
    separateInvoiceByDeliveryNote: yup.boolean(),
    salesPriceIsMin: yup.boolean(),
    separateInvoiceByPayments: yup.boolean(),
    allowOverselling: yup.boolean()
});

export default function SalesSettingsForm() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            defaultCreditLimit: 10,
            defaultSaleDiscount: 0,
            salesCommissionAgent: 'disable',
            salesItemAdditionMethod: 'new_row',
            sourceOfSalePrice: 'after_discount',
            roundingMethod: 'none',
            separateInvoiceByDeliveryNote: false,
            salesPriceIsMin: false,
            separateInvoiceByPayments: false,
            allowOverselling: false
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        // Your save logic
        console.log('Sales Settings:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, p: 5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>
                    Sales Settings
                </Typography>
                <CustomGridContainer>
                    <Grid item xs={12} md={3}>
                        <RHFTextField
                            name="defaultCreditLimit"
                            control={control}
                            label="Default credit limit"
                            type="number"
                            error={!!errors.defaultCreditLimit}
                            helperText={errors.defaultCreditLimit?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFTextField
                            name="defaultSaleDiscount"
                            control={control}
                            label="Default Sale Discount"
                            type="number"
                            error={!!errors.defaultSaleDiscount}
                            helperText={errors.defaultSaleDiscount?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="salesCommissionAgent"
                            control={control}
                            label="Sales Commission Agent"
                            options={commissionAgentOptions}
                            error={errors.salesCommissionAgent?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="salesItemAdditionMethod"
                            control={control}
                            label="Sales Item Addition Method"
                            options={itemAdditionMethodOptions}
                            error={errors.salesItemAdditionMethod?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="sourceOfSalePrice"
                            control={control}
                            label="Source Of Sale Price"
                            options={sourceOfSalePriceOptions}
                            error={errors.sourceOfSalePrice?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFSelectField
                            name="roundingMethod"
                            control={control}
                            label="Amount rounding method"
                            options={roundingMethodOptions}
                            error={errors.roundingMethod?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFCheckBox
                            name="separateInvoiceByDeliveryNote"
                            control={control}
                            label="Create Separate Invoice By Delivery Note"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFCheckBox
                            name="salesPriceIsMin"
                            control={control}
                            label="Sales price is minimum selling price"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFCheckBox
                            name="separateInvoiceByPayments"
                            control={control}
                            label="Create Separate Invoice By Payments"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RHFCheckBox
                            name="allowOverselling"
                            control={control}
                            label="Allow Overselling"
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
