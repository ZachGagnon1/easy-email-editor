import React from "react";

import { Grid } from "@arco-design/web-react";
import { AttributesPanelWrapper } from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { Padding } from "@extensions/AttributePanel/components/attributes/Padding";
import { Width } from "@extensions/AttributePanel/components/attributes/Width";
import { VerticalAlign } from "@extensions/AttributePanel/components/attributes/VerticalAlign";
import { Border } from "@extensions/AttributePanel/components/attributes/Border";
import { ClassName, BackgroundColor } from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

export function Column() {
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

        <Padding />
      </CollapsableItem>
      <CollapsableItem title={t("Background")}>
        <BackgroundColor />
      </CollapsableItem>
      <CollapsableItem title={t("Border")}>
        <Border />
      </CollapsableItem>
      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
