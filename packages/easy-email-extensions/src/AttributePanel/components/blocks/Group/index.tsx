import React from "react";
import { Width } from "@extensions/AttributePanel/components/attributes/Width";
import { BackgroundColor } from "@extensions/AttributePanel/components/attributes/BackgroundColor";
import { VerticalAlign } from "@extensions/AttributePanel/components/attributes/VerticalAlign";
import { AttributesPanelWrapper } from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { ClassName } from "../../attributes/ClassName";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";
import { Grid } from "@arco-design/web-react";

export function Group() {
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Dimension")}>
        <Grid.Row>
          <Grid.Col span={11}>
            <Width />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <VerticalAlign />
          </Grid.Col>
        </Grid.Row>
      </CollapsableItem>
      <CollapsableItem title={t("Background")}>
        <Grid.Row>
          <Grid.Col span={11}>
            <BackgroundColor />
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
