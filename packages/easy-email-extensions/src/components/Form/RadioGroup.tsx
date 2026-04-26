import { FormControlLabel, Radio, RadioGroup as MuiRadioGroup, SxProps } from "@mui/material";
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
  sx?: SxProps;
}

export function RadioGroup(props: Readonly<RadioGroupProps>) {
  const { type, vertical, options, onChange, value, ...rest } = props;

  const rowLayout = vertical ? false : rest.row ?? true;

  return (
    <MuiRadioGroup
      {...rest}
      value={value}
      onChange={(e, newValue) => onChange(newValue)}
      row={rowLayout}
      sx={merge({ width: "100%" }, rest.sx)}
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
  );
}
