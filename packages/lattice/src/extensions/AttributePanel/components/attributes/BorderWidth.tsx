import React, { useMemo } from "react";
import { useFocusIdx }  from "@";
import { InputWithUnitField } from "../../../components/Form";

export function BorderWidth() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <InputWithUnitField
        label={t("Width")}
        name={`${focusIdx}.attributes.border-width`}
      />
    );
  }, [focusIdx]);
}
