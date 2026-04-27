import React, { useMemo } from "react";
import { InputWithUnitField } from "@/extensions";
import { useFocusIdx } from "easy-email-editor";
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
      <InputWithUnitField
        label={t("Height")}
        name={`${focusIdx}.attributes.height`}
        inline={inline}
        config={config}
      />
    );
  }, [focusIdx, inline]);
}
