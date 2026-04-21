import React from "react";
import { Padding } from "@extensions/AttributePanel/components/attributes/Padding";
import { ContainerBackgroundColor } from "@extensions/AttributePanel/components/attributes/ContainerBackgroundColor";
import { BorderWidth } from "@extensions/AttributePanel/components/attributes/BorderWidth";
import { BorderStyle } from "@extensions/AttributePanel/components/attributes/BorderStyle";
import { BorderColor } from "@extensions/AttributePanel/components/attributes/BorderColor";
import { Width } from "@extensions/AttributePanel/components/attributes/Width";
import { Align } from "@extensions/AttributePanel/components/attributes/Align";

import { AttributesPanelWrapper } from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { Grid, Space } from "@arco-design/web-react";
import { ClassName } from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";
import { Stack } from "easy-email-editor";

export function Divider() {
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Dimension")}>
        <Space direction="vertical">
          <Grid.Row>
            <Grid.Col span={11}>
              <Width unitOptions="percent" />
            </Grid.Col>
            <Grid.Col offset={1} span={11} />
          </Grid.Row>

          <Align />
          <Padding />
        </Space>
      </CollapsableItem>

      <CollapsableItem title={t("Border")}>
        <Stack wrap={false} spacing="tight">
          <div style={{ width: 50 }}>
            <BorderWidth />
          </div>
          <div style={{ width: 100 }}>
            <BorderStyle />
          </div>
          <div style={{ width: 100 }}>
            <BorderColor />
          </div>
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Background")}>
        <Grid.Row>
          <Grid.Col span={11}>
            <ContainerBackgroundColor title={t("Background")} />
          </Grid.Col>
          <Grid.Col offset={1} span={11} />
        </Grid.Row>
      </CollapsableItem>

      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
