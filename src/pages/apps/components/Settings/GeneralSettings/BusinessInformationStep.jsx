import { Box, Grid, Typography } from "@mui/material";
import RHFTextField from "../../forms/RHFTextField";
import RHFSelectField from "../../forms/RHFSelectField";
import { Controller } from "react-hook-form";
import ImageUpload from "../../forms/ImageUpload";
import CustomGridContainer from "../../Common/CustomGridContainer";
import RHFAutocomplete from "../../forms/RHFAutocomplete";
import RHFDatePicker from "../../forms/RHFDatePicker";

const BusinessInformationStep = ({ control, errors, setValue, settingsValue }) => {

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, my: 3 }}>Business Information</Typography>
            <CustomGridContainer>
                <Grid item xs={12} md={3}>
                    <RHFTextField
                        name="businessName"
                        control={control}
                        label="Business Name"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFSelectField
                        name="currency"
                        control={control}
                        label="Currencies"
                        options={settingsValue?.currencies}
                        error={errors.currency?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFSelectField
                        name="timeZone"
                        control={control}
                        label="Time Zone"
                        options={settingsValue?.timezones}
                        error={errors.timeZone?.message}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <RHFDatePicker
                        name="startDate"
                        control={control}
                        label="Start Date"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <RHFAutocomplete
                        name="openingBalanceVoucher"
                        control={control}
                        label="Opening Balance From Journal Voucher"
                        options={settingsValue?.daily}
                        multiple
                        error={errors.openingBalanceVoucher?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFSelectField
                        name="financialYearStartMonth"
                        control={control}
                        label="Financial Year Start Month"
                        options={settingsValue?.months}
                        error={errors.financialYearStartMonth?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <RHFDatePicker
                        name="fixingDate"
                        control={control}
                        label="Fixing Date"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Controller
                        name="logo"
                        control={control}
                        render={({ field, fieldState }) => (
                            <ImageUpload
                                value={field.value}
                                onChange={val => setValue('logo', val)}
                                error={fieldState.error?.message}
                                text='Upload Business Logo'
                            />
                        )}
                    />
                </Grid>

            </CustomGridContainer>
        </Box>
    );
}

export default BusinessInformationStep;