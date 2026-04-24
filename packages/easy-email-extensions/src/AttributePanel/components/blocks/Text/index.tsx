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
import { Button, Tooltip } from "@arco-design/web-react";
import { IconFont } from "easy-email-editor";
import { HtmlEditor } from "../../UI/HtmlEditor";
import { ClassName } from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";
import { Stack } from "@mui/material";

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
        <Height />
        <Padding showResetAll />
      </CollapsableItem>
      <CollapsableItem title={t("Color")}>
        <Stack spacing={2}>
          <Color />
          <ContainerBackgroundColor title={t("Background color")} />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Typography")}>
        <Stack spacing={2}>
          <FontFamily />
          <FontSize />
          <LineHeight />
          <LetterSpacing />
          <TextDecoration />
          <FontWeight />
          <Align />
          <FontStyle />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <ClassName />
      </CollapsableItem>
      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>
  );
}
