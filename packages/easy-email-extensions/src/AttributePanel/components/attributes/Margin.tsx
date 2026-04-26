import React, { useMemo } from "react";
import { TextField } from "../../../components/Form";
import { Stack, TextStyle, useFocusIdx } from "easy-email-editor";

export function Margin() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack vertical spacing="extraTight">
        <TextStyle size="large">{t("Margin")}</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label={t("Top")}
              name={`${focusIdx}.attributes.marginTop`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label={t("Bottom")}
              name={`${focusIdx}.attributes.marginBottom`}
              inline
            />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label={t("Left")}
              name={`${focusIdx}.attributes.marginLeft`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label={t("Right")}
              name={`${focusIdx}.attributes.marginRight`}
              inline
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }, [focusIdx]);
}
