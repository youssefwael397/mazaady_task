import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

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

        <MenuItem value="other" key="other">
          Other
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export const RenderOptions = ({
  options,
  handlePropertyChange,
  handleOtherInputChange,
  propertiesValues,
  otherValues,
}) => {
  return (
    <>
      {options.map((property) => (
        <div className="mt-3" key={property.id}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 550 }}>
            <InputLabel id={property.id}>{property.name}</InputLabel>
            <Select
              labelId={property.id}
              id={property.name}
              name={property.name}
              value={propertiesValues[property.name] || ''}
              onChange={(e) => handlePropertyChange(e)}
              label={property.name}
            >
              <MenuItem value="" key="select">
                Select
              </MenuItem>
              {property.options.map((option) => (
                <MenuItem value={option.name} key={option.id}>
                  {option.name}
                </MenuItem>
              ))}
              <MenuItem value="other">other</MenuItem>
            </Select>
            {propertiesValues[property.name] === 'other' && (
              <TextField
                id={`other-${property.name}`}
                label={`write ${property.name}`}
                value={otherValues[property.name]}
                onChange={handleOtherInputChange}
                sx={{ mt: 3 }}
              />
            )}
          </FormControl>
        </div>
      ))}
    </>
  );
};
