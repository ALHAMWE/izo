import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { TextField } from '@mui/material';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

const safeDate = (val) => {
    if (!val) return null;
    if (val instanceof Date && !isNaN(val)) return val;
    if (typeof val === 'string' || val instanceof String) {
        const parsed = new Date(val);

return isNaN(parsed) ? null : parsed;
    }

return null;
};
const RHFDatePicker = ({ name, control, label, ...rest }) => (
    <DatePickerWrapper>
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <DatePicker
                    selected={safeDate(field.value)} // Safely parse stored value
                    onChange={(date) => {
                        const validDate = safeDate(date);
                        field.onChange(validDate); // Always send a valid Date or null
                    }}
                    dateFormat="yyyy/MM/dd"
                    popperProps={{ strategy: 'fixed' }}
                    customInput={
                        <TextField
                            label={label}
                            fullWidth
                            type="text"
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                        />
                    }
                    {...rest}
                />
            )}
        />
    </DatePickerWrapper>
);

export default RHFDatePicker;
