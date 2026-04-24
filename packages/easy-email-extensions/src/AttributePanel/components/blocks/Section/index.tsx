import React, { useCallback } from "react";
import { Padding } from "@extensions/AttributePanel/components/attributes/Padding";
import { Background } from "@extensions/AttributePanel/components/attributes/Background";
import { Border } from "@extensions/AttributePanel/components/attributes/Border";
import { AttributesPanelWrapper } from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { Switch } from "@arco-design/web-react";
import { useBlock, useFocusIdx } from "easy-email-editor";
import { BasicType, BlockManager } from "easy-email-core";
import { ClassName } from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";
import { TextField } from "@extensions/components/Form";
import { Stack } from "@mui/material";

export function Section() {
  const { focusBlock, setFocusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();
  const noWrap = focusBlock?.data.value.noWrap;

  const onChange = useCallback(
    (checked) => {
      if (!focusBlock) {
        return;
      }
      focusBlock.data.value.noWrap = checked;
      if (checked) {
        const children = [...focusBlock.children];
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (!child) {
            continue;
          }
          if (child.type === BasicType.GROUP) {
            children.splice(i, 1, ...child.children);
          }
        }
        focusBlock.children = [
          BlockManager.getBlockByType(BasicType.GROUP)!.create({
            children: children,
          }),
        ];
      } else {
        if (
          focusBlock.children.length === 1 &&
          focusBlock.children[0].type === BasicType.GROUP
        ) {
          focusBlock.children = focusBlock.children[0]?.children || [];
        }
      }
      setFocusBlock({ ...focusBlock });
    },
    [focusBlock, setFocusBlock]
  );

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapsableItem title={t("Dimension")}>
        <Stack spacing={2}>
          <label style={{ width: "100%", display: "flex" }}>
            <div style={{ flex: 1 }}>{t("Group")}</div>
          </label>
          <Switch
            checked={noWrap}
            checkedText={t("True")}
            uncheckedText={t("False")}
            onChange={onChange}
          />
          <label style={{ width: "100%", display: "flex" }}>
            <div style={{ flex: 1 }}>{t("Full Width")}</div>
          </label>
          <TextField name={`${focusIdx}.attributes.full-width`} />

          <Padding />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Background")}>
        <Background />
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
