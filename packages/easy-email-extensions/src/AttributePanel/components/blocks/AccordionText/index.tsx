import React from "react";
import { useFocusIdx } from "easy-email-editor";

import {
  Padding,
  BackgroundColor,
  Color,
  TextAreaField,
  FontSize,
  FontWeight,
  FontFamily,
  LineHeight,
  AttributesPanelWrapper,
} from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";
import { Grid, Space } from "@arco-design/web-react";

export function AccordionText() {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Setting")}>
        <Space direction="vertical">
          <TextAreaField
            label={t("Content")}
            name={`${focusIdx}.data.value.content`}
            autoSize={{ minRows: 5 }}
          />
          <Grid.Row>
            <Grid.Col span={11}>
              <Color />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <FontSize />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={11}>
              <LineHeight />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <FontWeight />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={11}>
              <FontFamily />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <BackgroundColor />
            </Grid.Col>
          </Grid.Row>

          <Padding title={t("Padding")} attributeName="padding" />
        </Space>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
