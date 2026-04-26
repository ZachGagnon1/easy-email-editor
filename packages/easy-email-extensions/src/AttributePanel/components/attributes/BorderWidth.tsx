import React, { useMemo } from "react";
import { useFocusIdx } from "easy-email-editor";
import { InputWithUnitField } from "../../../components/Form";

export function BorderWidth() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <InputWithUnitField
        label={t("Width")}
        quickchange
        name={`${focusIdx}.attributes.border-width`}
      />
    );
  }, [focusIdx]);
}
