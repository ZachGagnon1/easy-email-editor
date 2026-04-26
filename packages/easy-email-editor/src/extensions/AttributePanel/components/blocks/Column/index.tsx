import React from "react";
import { AttributesPanelWrapper } from "@/extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { Padding } from "@/extensions/AttributePanel/components/attributes/Padding";
import { Width } from "@/extensions/AttributePanel/components/attributes/Width";
import { VerticalAlign } from "@/extensions/AttributePanel/components/attributes/VerticalAlign";
import { Border } from "@/extensions/AttributePanel/components/attributes/Border";
import { BackgroundColor, ClassName } from "@/extensions";
import { CollapsableItem } from "@/extensions/components/Collapse/CollapsableItem";
import { Stack } from "@mui/material";

export function Column() {
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Dimension")}>
        <Stack spacing={2}>
          <Width />
          <VerticalAlign />
          <Padding />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Background")}>
        <BackgroundColor />
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
