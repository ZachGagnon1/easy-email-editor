import { AttributesPanelWrapper } from "@extensions/AttributePanel";
import { Stack, useFocusIdx } from "easy-email-editor";
import React from "react";
import {
  Color,
  ContainerBackgroundColor,
  FontFamily,
  FontSize,
  FontStyle,
  Padding,
  TextAlign,
  Width,
  ColorPickerField,
  InputWithUnitField,
  NumberField,
  TextField,
} from "@extensions";
import { pixelAdapter } from "../../adapter";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

export function AdvancedTable() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Dimension")}>
        <Stack>
          <Width />
          <Stack.Item />
        </Stack>
        <Stack vertical>
          <Padding />
        </Stack>
        <NumberField
          label="Cell padding (px)"
          name={`${focusIdx}.attributes.cellPadding`}
          config={pixelAdapter}
          max={20}
          min={0}
          step={1}
        />
      </CollapsableItem>

      <CollapsableItem title={t("Decoration")}>
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
      </CollapsableItem>

      <CollapsableItem title={t("Typography")}>
        <FontFamily />
        <FontSize />
        <InputWithUnitField
          label={t("Line height")}
          unitOptions="percent"
          name={`${focusIdx}.attributes.line-height`}
        />
        <FontStyle />
        <TextAlign />
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
