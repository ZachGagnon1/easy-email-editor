import { AttributesPanelWrapper } from "@extensions/AttributePanel";
import { Button, Tooltip } from "@arco-design/web-react";
import { IconFont, Stack } from "easy-email-editor";
import React, { useState } from "react";
import {
  Border,
  Color,
  ContainerBackgroundColor,
  FontFamily,
  FontSize,
  FontStyle,
  Padding,
  TextAlign,
  Width,
} from "@extensions";
import { HtmlEditor } from "../../UI/HtmlEditor";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

export function Table() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      extra={
        <Tooltip content={t("Edit")}>
          <Button
            onClick={() => setVisible(true)}
            icon={<IconFont iconName="icon-html" />}
          />
        </Tooltip>
      }
    >
      <CollapsableItem title={t("Dimension")}>
        <Stack>
          <Width />
          <Stack.Item />
        </Stack>
        <Stack vertical>
          <Padding />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Decoration")}>
        <Color />
        <ContainerBackgroundColor />
        <Border />
      </CollapsableItem>

      <CollapsableItem title={t("Typography")}>
        <Stack>
          <FontFamily />
          <FontSize />
        </Stack>
        <FontStyle />
        <TextAlign />
      </CollapsableItem>

      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>
  );
}
