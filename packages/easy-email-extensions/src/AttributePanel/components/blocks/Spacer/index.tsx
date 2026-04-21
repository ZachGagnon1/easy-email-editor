import React from "react";
import { Height } from "@extensions/AttributePanel/components/attributes/Height";
import { ContainerBackgroundColor } from "@extensions/AttributePanel/components/attributes/ContainerBackgroundColor";
import { Padding } from "@extensions/AttributePanel/components/attributes/Padding";
import { AttributesPanelWrapper } from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { Grid, Space } from "@arco-design/web-react";
import { ClassName } from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

export function Spacer() {
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Dimension")}>
        <Space direction="vertical">
          <Height />
          <Padding />
        </Space>
      </CollapsableItem>

      <CollapsableItem title={t("Background")}>
        <ContainerBackgroundColor title={t("Background color")} />
      </CollapsableItem>

      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
