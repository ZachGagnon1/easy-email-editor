import React from "react";
import {
  Padding,
  BackgroundColor,
  Color,
  TextAreaField,
  FontSize,
  FontWeight,
  FontFamily,
  AttributesPanelWrapper,
} from "@extensions";
import { useFocusIdx } from "easy-email-editor";
import { Grid, Space } from "@arco-design/web-react";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

export function AccordionTitle() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Setting")}>
        <Space direction="vertical">
          <TextAreaField
            label={t("Content")}
            name={`${focusIdx}.data.value.content`}
          />

          <Grid.Row>
            <Grid.Col span={11}>
              <Color />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <BackgroundColor />
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col span={11}>
              <FontSize />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <FontFamily />
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col span={11}>
              <FontWeight />
            </Grid.Col>
            <Grid.Col offset={1} span={11} />
          </Grid.Row>

          <Padding title={t("Padding")} attributeName="padding" />
        </Space>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
