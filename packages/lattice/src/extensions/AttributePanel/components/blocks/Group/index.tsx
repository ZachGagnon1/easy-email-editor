import React from "react";
import { Width } from "@/extensions/AttributePanel/components/attributes/Width";
import { BackgroundColor } from "@/extensions/AttributePanel/components/attributes/BackgroundColor";
import { VerticalAlign } from "@/extensions/AttributePanel/components/attributes/VerticalAlign";
import { AttributesPanelWrapper } from "@/extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { ClassName } from "../../attributes/ClassName";
import { CollapsableItem } from "@/extensions/components/Collapse/CollapsableItem";
import { Stack } from "@mui/material";

export function Group() {
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Dimension")}>
        <Stack spacing={2}>
          <Width />
          <VerticalAlign />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Background")}>
        <BackgroundColor />
      </CollapsableItem>
      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <ClassName />
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
