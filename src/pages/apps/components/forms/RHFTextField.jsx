import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const RHFTextField = ({ name, control, label, type = 'text', required = false, ...rest }) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <TextField
                {...field}
                label={label}
                required={required}
                fullWidth
                type={type}
                margin="normal"
                FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...rest}
            />
        )}
    />
);

export default RHFTextField;