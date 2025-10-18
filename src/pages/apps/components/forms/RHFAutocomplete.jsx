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
                getOptionLabel={option => option.label || ''}
                isOptionEqualToValue={(option, val) => option.value === val.value}
                multiple={multiple}
                disableCloseOnSelect={multiple}
                value={
                    multiple
                        ? options.filter(opt =>
                            Array.isArray(value)
                                ? value.includes(opt.value)
                                : value === opt.value
                        )
                        : options.find(opt => opt.value === value) || null
                }
                onChange={(_, data) =>
                    multiple
                        ? onChange(data.map(item => item.value))
                        : onChange(data ? data.value : null)
                }
                renderInput={params => (
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