import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const MazaadySelectInput = ({
  label,
  value,
  onChange,
  items,
  ...inputProps
}) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 550 }}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={label}
        id={value}
        value={value}
        onChange={onChange}
        label={label}
        {...inputProps}
      >
        <MenuItem value="" key="select">
          Select
        </MenuItem>

        {items.length &&
          items.map((item) => (
            <MenuItem value={item.id} key={item.id}>
              {item.name}
            </MenuItem>
          ))}

        <MenuItem value="" key="other">
          Other
        </MenuItem>
      </Select>
    </FormControl>
  );
};
