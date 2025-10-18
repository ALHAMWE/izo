import React from 'react';
import { Grid, Button, Box, Typography, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RHFCheckBox from '../../forms/RHFCheckBox';
import RHFTextField from '../../forms/RHFTextField';
import CustomGridContainer from '../../Common/CustomGridContainer';

const schema = yup.object({
    inPurchaseRowUseDefaultPrice: yup.boolean(),
    enablePurchaseStatus: yup.boolean(),
    purchasePrintModule: yup.string(),
    returnPurchasePrintModule: yup.string()
});

export default function PurchaseSettingsForm() {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            inPurchaseRowUseDefaultPrice: false,
            enablePurchaseStatus: false,
            purchasePrintModule: '',
            returnPurchasePrintModule: ''
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        // Submit logic here
        console.log('Purchase Settings:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, p: 5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>
                    Purchase Settings
                </Typography>
                <CustomGridContainer>
                    <Grid item xs={12} md={4}>
                        <RHFCheckBox
                            name="inPurchaseRowUseDefaultPrice"
                            control={control}
                            label="In Purchase Row use Default Price"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <RHFCheckBox
                            name="enablePurchaseStatus"
                            control={control}
                            label="Enable Purchase Status"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}></Grid>
                    <Grid item xs={12} md={6}>
                        <RHFTextField
                            name="purchasePrintModule"
                            control={control}
                            label="Purchase Print Module"
                            error={!!errors.purchasePrintModule}
                            helperText={errors.purchasePrintModule?.message}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RHFTextField
                            name="returnPurchasePrintModule"
                            control={control}
                            label="Return Purchase Print Module"
                            error={!!errors.returnPurchasePrintModule}
                            helperText={errors.returnPurchasePrintModule?.message}
                        />
                    </Grid>
                </CustomGridContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{ px: 5, fontWeight: 600 }}
                    >
                        Save
                    </Button>
                </Box>
            </Card>
        </form>
    );
}
