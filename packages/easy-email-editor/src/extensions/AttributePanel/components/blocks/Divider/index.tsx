import React from "react";
import { Padding } from "@/extensions/AttributePanel/components/attributes/Padding";
import { ContainerBackgroundColor } from "@/extensions/AttributePanel/components/attributes/ContainerBackgroundColor";
import { BorderWidth } from "@/extensions/AttributePanel/components/attributes/BorderWidth";
import { BorderStyle } from "@/extensions/AttributePanel/components/attributes/BorderStyle";
import { BorderColor } from "@/extensions/AttributePanel/components/attributes/BorderColor";
import { Width } from "@/extensions/AttributePanel/components/attributes/Width";
import { Align } from "@/extensions/AttributePanel/components/attributes/Align";

import { AttributesPanelWrapper } from "@/extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { ClassName } from "@/extensions";
import { CollapsableItem } from "@/extensions/components/Collapse/CollapsableItem";
import { Stack } from "@mui/material";

export function Divider() {
  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Dimension")}>
        <Stack spacing={2}>
          <Width unitOptions="percent" />

          <Align />
          <Padding />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Border")}>
        <Stack spacing={2}>
          <BorderWidth />
          <BorderStyle />
          <BorderColor />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Background")}>
        <ContainerBackgroundColor title={t("Background")} />
      </CollapsableItem>

      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <ClassName />
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
