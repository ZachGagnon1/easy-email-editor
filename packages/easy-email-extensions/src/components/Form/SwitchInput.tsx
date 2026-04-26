import React from "react";
import {
  FormControlLabel,
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";

export interface SwitchInputProps
  extends Omit<MuiSwitchProps, "onChange" | "value"> {
  value?: boolean;
  checked?: boolean;
  onChange?: (val: boolean) => void;
  label?: React.ReactNode;
}

export function SwitchInput(props: Readonly<SwitchInputProps>) {
  const { value, checked, onChange, label, ...rest } = props;

  // The enhancer passes both `value` and `checked`, so we safely fallback to either
  const isChecked = Boolean(checked ?? value ?? false);

  const switchComponent = (
    <MuiSwitch
      {...rest}
      checked={isChecked}
      onChange={(e, newChecked) => {
        if (onChange) {
          onChange(newChecked);
        }
      }}
      size="small"
      color="primary"
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={switchComponent}
        label={label}
        sx={{ margin: 0 }}
      />
    );
  }

  // Otherwise, just render the standard switch
  return switchComponent;
}
