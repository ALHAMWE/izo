import { Controller } from 'react-hook-form';
import { FormControlLabel, Switch } from '@mui/material';

const RHFSwitch = ({ name, control, label, sx }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormControlLabel
        control={
          <Switch
            checked={!!field.value}  // Converts field value to boolean for checked state
            onChange={(e) => field.onChange(e.target.checked)}  // Get the checked value from event
            {...field}  // Spread any other field props if necessary
          />
        }
        label={label}
        sx={sx}
      />
    )}
  />
);

export default RHFSwitch;
