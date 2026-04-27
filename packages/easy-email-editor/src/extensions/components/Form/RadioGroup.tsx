import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  SxProps,
} from "@mui/material";
import { merge } from "lodash";
import React from "react";

export interface RadioGroupProps {
  options: Array<{ value: string; label: React.ReactNode }>;
  onChange: (value: string) => void;
  value?: string;
  type?: "radio" | "button";
  vertical?: boolean;
  name?: string;
  row?: boolean;
  size?: "small" | "medium";
  disabled?: boolean;
  error?: boolean;
  label?: string;
  sx?: SxProps;
}

export function RadioGroup(props: Readonly<RadioGroupProps>) {
  const {
    type,
    vertical,
    options,
    onChange,
    value,
    label,
    sx,
    disabled,
    ...rest
  } = props;

  const rowLayout = vertical ? false : rest.row ?? true;

  return (
    <FormControl sx={sx} disabled={disabled}>
      {label && <FormLabel>{label}</FormLabel>}
      <MuiRadioGroup
        {...rest}
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        row={rowLayout}
        sx={merge({ width: "100%" }, sx)}
      >
        {options.map((item, index) => (
          <FormControlLabel
            key={item.value ?? index}
            value={item.value}
            control={<Radio color="primary" />}
            label={item.label}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
}
