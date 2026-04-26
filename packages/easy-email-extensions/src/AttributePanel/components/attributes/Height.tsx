import React, { useMemo } from "react";
import { TextField } from "../../../components/Form";
import { Stack, useFocusIdx } from "easy-email-editor";
import { UseFieldConfig } from "react-final-form";

export function Height({
  inline,
  config,
}: {
  inline?: boolean;
  config?: UseFieldConfig<any>;
}) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label={t("Height")}
            name={`${focusIdx}.attributes.height`}
            inline={inline}
            config={config}
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx, inline]);
}
