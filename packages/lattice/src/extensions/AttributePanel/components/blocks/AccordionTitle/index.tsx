import React from "react";
import {
  AttributesPanelWrapper,
  BackgroundColor,
  Color,
  FontFamily,
  FontSize,
  FontWeight,
  Padding,
  TextAreaField,
} from "@/extensions";
import { useFocusIdx } from "@";
import { CollapsableItem } from "@/extensions/components/Collapse/CollapsableItem";
import { Stack } from "@mui/material";

export function AccordionTitle() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Setting")}>
        <Stack spacing={2}>
          <TextAreaField
            label={t("Content")}
            name={`${focusIdx}.data.value.content`}
          />
          <Color />
          <BackgroundColor />
          <FontSize />
          <FontFamily />
          <FontWeight />
          <Padding title={t("Padding")} attributeName="padding" />
        </Stack>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
