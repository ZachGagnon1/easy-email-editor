import React from "react";
import {
  Align,
  AttributesPanelWrapper,
  BackgroundColor,
  Border,
  ClassName,
  Color,
  ContainerBackgroundColor,
  FontFamily,
  FontSize,
  FontStyle,
  FontWeight,
  LetterSpacing,
  LineHeight,
  Link,
  MergeTags,
  Padding,
  TextDecoration,
  TextField,
  Width,
} from "@extensions";
import { Button as ArcoButton, Popover } from "@arco-design/web-react";
import { IconFont, useEditorProps, useFocusIdx } from "easy-email-editor";
import { useField } from "react-final-form";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";
import { Stack } from "@mui/material";

export function Button() {
  const { focusIdx } = useFocusIdx();
  const { input } = useField(`${focusIdx}.data.value.content`, {
    parse: (v) => v,
  });

  const { mergeTags } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Setting")}>
        <Stack spacing={2}>
          <TextField
            label={
              <Stack spacing={2} direction={"row"}>
                <span>{t("Content")}</span>
                {mergeTags && (
                  <Popover
                    trigger="click"
                    content={
                      <MergeTags
                        value={input.value}
                        onChange={input.onChange}
                      />
                    }
                  >
                    <ArcoButton
                      type="text"
                      icon={<IconFont iconName="icon-merge-tags" />}
                    />
                  </Popover>
                )}
              </Stack>
            }
            name={`${focusIdx}.data.value.content`}
          />
          <Link />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Dimension")}>
        <Stack spacing={2}>
          <Width />
          <FontWeight />

          <Padding title={t("Padding")} attributeName="padding" showResetAll />
          <Padding title={t("Inner padding")} attributeName="inner-padding" />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Color")}>
        <Stack spacing={2}>
          <Color title={t("Text color")} />
          <BackgroundColor title={t("Button color")} />
          <ContainerBackgroundColor title={t("Background color")} />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Typography")}>
        <Stack spacing={2}>
          <FontFamily />
          <FontSize />
          <FontWeight />
          <LineHeight />
          <TextDecoration />
          <LetterSpacing />
          <Align />
          <FontStyle />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Border")}>
        <Border />
      </CollapsableItem>
      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <ClassName />
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
