import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const RHFSelectField = ({
    name,
    control,
    label,
    options,
    fullWidth = true,
    margin = "normal",
    ...props
}) => (
    <FormControl fullWidth={fullWidth} margin={margin} error={!!props.error}>
        <InputLabel>{label}</InputLabel>
        <Controller
            name={name}
            control={control}
            render={({ field  }) => (
                <Select
                    {...field}
                    label={label}
                    {...props}
                >
                    {options?.map(opt =>
                        <MenuItem value={opt.value} key={opt.id}>{opt.value}</MenuItem>
                    )}
                </Select>
            )}
        />
        <FormHelperText sx={{ marginLeft: 0 }}>{props.error}</FormHelperText>
    </FormControl>
);

export default RHFSelectField;
