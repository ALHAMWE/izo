import { Box, Grid, Typography } from "@mui/material";
import RHFSelectField from "../../forms/RHFSelectField";
import CustomGridContainer from "../../Common/CustomGridContainer";

const FormatDisplayStep = ({ control, errors, settingsValue }) => {

    const timeFormats = [
        { label: '24 Hour', value: '24 Hour' },
        { label: '12 Hour', value: '12 Hour' },
    ];

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, my: 3 }}>Format and Display</Typography>
            <CustomGridContainer>
                <Grid item xs={12} md={6}>
                    <RHFSelectField
                        name="dateFormat"
                        control={control}
                        label="Date Format"
                        options={settingsValue?.date_formats}
                        error={errors.dateFormat?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFSelectField
                        name="timeFormat"
                        control={control}
                        label="Time Format"
                        options={timeFormats}
                        error={errors.timeFormat?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFSelectField
                        name="currencySymbolPlacement"
                        control={control}
                        label="Currency Symbol Placement"
                        options={settingsValue?.currency_symbol_placement}
                        error={errors.currencySymbolPlacement?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFSelectField
                        name="numbersAfterCommaAmount"
                        control={control}
                        label="Numbers After The Comma (Amounts)"
                        options={settingsValue?.amount_digit}
                        error={errors.numbersAfterCommaAmount?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFSelectField
                        name="numbersAfterCommaQty"
                        control={control}
                        label="Numbers After The Comma (Quantities)"
                        options={settingsValue?.amount_digit}
                        error={errors.numbersAfterCommaQty?.message}
                        fullWidth
                    />
                </Grid>
            </CustomGridContainer>
        </Box>
    );
}
export default FormatDisplayStep;