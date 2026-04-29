import React from "react";
import { Padding } from "@/extensions/AttributePanel/components/attributes/Padding";
import { Background } from "@/extensions/AttributePanel/components/attributes/Background";
import { TextField } from "@/extensions/components/Form";
import { AttributesPanelWrapper } from "@/extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { useFocusIdx } from "@";
import { ClassName } from "@/extensions";
import { CollapsableItem } from "@/extensions/components/Collapse/CollapsableItem";
import { Stack } from "@mui/material";

export function Wrapper() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapsableItem title={t("Dimension")}>
        <Padding />
      </CollapsableItem>
      <CollapsableItem title={t("Background")}>
        <Background />
      </CollapsableItem>
      <CollapsableItem title={t("Border")}>
        <Stack spacing={2}>
          <TextField
            label={t("Border")}
            name={`${focusIdx}.attributes.border`}
          />
          <TextField
            label={t("Background border radius")}
            name={`${focusIdx}.attributes.border-radius`}
          />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <ClassName />
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
