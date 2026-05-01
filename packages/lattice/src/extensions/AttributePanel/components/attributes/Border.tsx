import React, { useMemo } from "react";
import { InputWithUnitField, TextField } from "../../../components/Form";
import { useFocusIdx } from "@";
import { Stack } from "@mui/material";

export function Border() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack direction="row" spacing={2}>
        <TextField label={t("Border")} name={`${focusIdx}.attributes.border`} />
        <InputWithUnitField
          label={t("Border radius")}
          name={`${focusIdx}.attributes.border-radius`}
          unitOptions="percent"
        />
      </Stack>
    );
  }, [focusIdx]);
}
