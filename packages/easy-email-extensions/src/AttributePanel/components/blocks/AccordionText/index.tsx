import React from "react";
import { useFocusIdx } from "easy-email-editor";

import {
  AttributesPanelWrapper,
  BackgroundColor,
  Color,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  Padding,
  TextAreaField,
} from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";
import { Stack } from "@mui/material";

export function AccordionText() {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Setting")}>
        <Stack spacing={2}>
          <TextAreaField
            label={t("Content")}
            name={`${focusIdx}.data.value.content`}
            autoSize={{ minRows: 5 }}
          />

          <Color />

          <FontSize />

          <LineHeight />

          <FontWeight />

          <FontFamily />

          <BackgroundColor />

          <Padding title={t("Padding")} attributeName="padding" />
        </Stack>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
