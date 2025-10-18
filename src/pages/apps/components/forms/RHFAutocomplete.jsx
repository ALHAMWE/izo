import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const RHFAutocomplete = ({
    name,
    control,
    label,
    options = [],
    multiple = false,
    required = false,
    ...rest
}) => (
    <Controller
        name={name}
        control={control}
        render={({ field: { ref, onChange, value, ...field }, fieldState }) => (
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.value || ''}
                isOptionEqualToValue={(option, val) => option.value === (val?.value ?? val)}
                multiple={multiple}
                disableCloseOnSelect={multiple}
                value={
                    multiple
                        ? Array.isArray(value)
                            ? options.filter((opt) => value.includes(opt.value))
                            : []
                        : options.find((opt) => opt.value === value) || null
                }
                onChange={(_, data) => {
                    if (multiple) {
                        const values = Array.isArray(data) ? data.map((it) => it.value) : [];
                        onChange(values);
                    } else {
                        onChange(data ? data.value : null);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        required={required}
                        fullWidth
                        margin="normal"
                        inputRef={ref}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        FormHelperTextProps={{ sx: { marginLeft: 0 } }}
                    />
                )}
                {...field}
                {...rest}
            />
        )}
    />
);

export default RHFAutocomplete;