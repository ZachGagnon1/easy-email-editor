import React from "react";
import {
  Border,
  BackgroundColor,
  FontFamily,
  AttributesPanelWrapper,
} from "@extensions";
import { Space } from "@arco-design/web-react";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

export function AccordionElement() {
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Setting")}>
        <Space direction="vertical">
          <Border />
          <BackgroundColor />
          <FontFamily />
        </Space>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
