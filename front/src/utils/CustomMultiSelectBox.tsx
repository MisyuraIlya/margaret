import { Box, Checkbox, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import React, { FC } from 'react';

type Option = {
  value: string;
  label: string;
};

interface CustomMultiSelectBoxProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  options: Option[];
}

const CustomMultiSelectBox: FC<CustomMultiSelectBoxProps> = ({
  label,
  values,
  onChange,
  options,
}) => {
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    onChange(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const selectedLabels = options
    .filter((option) => values.includes(option.value))
    .map((option) => option.label);

  return (
    <Select
      multiple
      sx={{
        minWidth: '200px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E0E0E0',
        },
      }}
      value={values}
      onChange={handleChange}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
          <Typography fontWeight={600} lineHeight={'12px'}>
            {label}:
          </Typography>
          <Typography>{selectedLabels.join(', ')}</Typography>
        </Box>
      )}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Checkbox checked={values.indexOf(option.value) > -1} />
          <ListItemText primary={option.label} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomMultiSelectBox;
