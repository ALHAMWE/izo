import { Controller } from 'react-hook-form';
import { FormControlLabel, Checkbox } from '@mui/material';

const RHFCheckBox = ({ name, control, label, sx }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel
        control={
          <Checkbox
            checked={!!field.value}
            onChange={field.onChange}
          />
        }
        label={label}
        sx={sx}
      />
    )}
  />
);

export default RHFCheckBox;
