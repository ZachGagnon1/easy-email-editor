import React from "react";
import { Padding } from "@extensions/AttributePanel/components/attributes/Padding";
import { Background } from "@extensions/AttributePanel/components/attributes/Background";
import { TextField } from "@extensions/components/Form";
import { AttributesPanelWrapper } from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { Grid } from "@arco-design/web-react";
import { Stack, useFocusIdx } from "easy-email-editor";
import { ClassName } from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

export function Wrapper() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapsableItem title={t("Dimension")}>
        <Stack vertical spacing="tight">
          <Padding />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Background")}>
        <Stack vertical spacing="tight">
          <Background />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Border")}>
        <Stack vertical spacing="tight">
          <TextField
            label={t("Border")}
            name={`${focusIdx}.attributes.border`}
            inline
          />
          <TextField
            label={t("Background border radius")}
            name={`${focusIdx}.attributes.border-radius`}
            inline
          />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
