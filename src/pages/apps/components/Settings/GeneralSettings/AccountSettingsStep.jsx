import { Box, Grid, Typography } from "@mui/material";
import RHFSelectField from "../../forms/RHFSelectField";
import RHFDatePicker from "../../forms/RHFDatePicker";
import CustomGridContainer from "../../Common/CustomGridContainer";

const AccountSettingsStep = ({ control, errors, settingsValue }) => {

    console.log(control)

    return (
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, my: 3 }}>Account Settings</Typography>
            <CustomGridContainer>
                <Grid item xs={12} md={6}>
                    <RHFDatePicker
                        name="startDate"
                        control={control}
                        label="Start Date"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFSelectField
                        name="financialYearStartMonth"
                        control={control}
                        label="Financial Year Start Month"
                        options={settingsValue?.months}
                        error={errors.financialYearStartMonth?.message}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFDatePicker
                        name="fixingDate"
                        control={control}
                        label="Fixing Date"
                        fullWidth
                    />
                </Grid>
            </CustomGridContainer>
        </Box>
    );
}

export default AccountSettingsStep;