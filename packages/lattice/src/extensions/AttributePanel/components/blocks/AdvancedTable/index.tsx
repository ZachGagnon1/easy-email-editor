import { AttributesPanelWrapper } from "@/extensions/AttributePanel";
import { useFocusIdx } from "@";
import React from "react";
import {
  Color,
  ColorPickerField,
  ContainerBackgroundColor,
  FontFamily,
  FontSize,
  FontStyle,
  InputWithUnitField,
  NumberField,
  Padding,
  TextAlign,
  TextField,
  Width,
} from "@/extensions";
import { pixelAdapter } from "../../adapter";
import { CollapsableItem } from "@/extensions/components/Collapse/CollapsableItem";
import { Stack } from "@mui/material";

export function AdvancedTable() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Dimension")}>
        <Stack spacing={2}>
          <Width />
          <Padding />
          <NumberField
            label="Cell padding (px)"
            name={`${focusIdx}.attributes.cellPadding`}
            config={pixelAdapter}
            max={20}
            min={0}
            step={1}
          />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Decoration")}>
        <Stack spacing={2}>
          <Color />
          <ContainerBackgroundColor />
          <TextField
            label="Table border"
            name={`${focusIdx}.attributes.border`}
          />
          <ColorPickerField
            label="Cell border color"
            name={`${focusIdx}.attributes.cellBorderColor`}
          />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Typography")}>
        <Stack spacing={2}>
          <FontFamily />
          <FontSize />
          <InputWithUnitField
            label={t("Line height")}
            unitOptions="percent"
            name={`${focusIdx}.attributes.line-height`}
          />
          <FontStyle />
          <TextAlign />
        </Stack>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
