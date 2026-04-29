import React, { useMemo } from "react";
import { useFocusIdx }  from "@";
import { SelectField } from "../../../components/Form";
import { useFontFamily } from "@/extensions/hooks/useFontFamily";

export function FontFamily({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();
  const { fontList } = useFontFamily();

  return useMemo(() => {
    return (
      <SelectField
        label={t("Font family")}
        name={name ?? `${focusIdx}.attributes.font-family`}
        options={fontList}
      />
    );
  }, [focusIdx, fontList, name]);
}
