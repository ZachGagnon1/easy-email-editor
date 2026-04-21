import React, { useState } from "react";
import { Padding } from "@extensions/AttributePanel/components/attributes/Padding";
import { TextDecoration } from "@extensions/AttributePanel/components/attributes/TextDecoration";
import { FontWeight } from "@extensions/AttributePanel/components/attributes/FontWeight";
import { FontStyle } from "@extensions/AttributePanel/components/attributes/FontStyle";
import { FontFamily } from "@extensions/AttributePanel/components/attributes/FontFamily";
import { Height } from "@extensions/AttributePanel/components/attributes/Height";
import { ContainerBackgroundColor } from "@extensions/AttributePanel/components/attributes/ContainerBackgroundColor";
import { FontSize } from "@extensions/AttributePanel/components/attributes/FontSize";
import { Color } from "@extensions/AttributePanel/components/attributes/Color";
import { Align } from "@extensions/AttributePanel/components/attributes/Align";
import { LineHeight } from "@extensions/AttributePanel/components/attributes/LineHeight";
import { LetterSpacing } from "@extensions/AttributePanel/components/attributes/LetterSpacing";

import { AttributesPanelWrapper } from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { Button, Grid, Space, Tooltip } from "@arco-design/web-react";
import { IconFont } from "easy-email-editor";
import { HtmlEditor } from "../../UI/HtmlEditor";
import { ClassName } from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

export function Text() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      extra={
        <Tooltip content={t("Html mode")}>
          <Button
            onClick={() => setVisible(true)}
            icon={<IconFont iconName="icon-html" />}
          />
        </Tooltip>
      }
    >
      <CollapsableItem title={t("Dimension")}>
        <Space direction="vertical">
          <Height />
          <Padding showResetAll />
        </Space>
      </CollapsableItem>
      <CollapsableItem title={t("Color")}>
        <Grid.Row>
          <Grid.Col span={11}>
            <Color />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <ContainerBackgroundColor title={t("Background color")} />
          </Grid.Col>
        </Grid.Row>
      </CollapsableItem>
      <CollapsableItem title={t("Typography")}>
        <Space direction="vertical">
          <Grid.Row>
            <Grid.Col span={11}>
              <FontFamily />
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
              <LetterSpacing />
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col span={11}>
              <TextDecoration />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <FontWeight />
            </Grid.Col>
          </Grid.Row>

          <Align />

          <FontStyle />

          <Grid.Row>
            <Grid.Col span={11} />
            <Grid.Col offset={1} span={11} />
          </Grid.Row>
        </Space>
      </CollapsableItem>
      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </CollapsableItem>
      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>
  );
}
