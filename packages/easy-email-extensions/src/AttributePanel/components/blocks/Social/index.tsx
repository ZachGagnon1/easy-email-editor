import React, { useMemo } from "react";
import { Padding } from "@extensions/AttributePanel/components/attributes/Padding";
import {
  EditGridTabField,
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  TextField,
} from "@extensions/components/Form";
import { Align } from "@extensions/AttributePanel/components/attributes/Align";
import { IconLink } from "@arco-design/web-react/icon";
import { Color } from "@extensions/AttributePanel/components/attributes/Color";
import { ContainerBackgroundColor } from "@extensions/AttributePanel/components/attributes/ContainerBackgroundColor";
import { FontFamily } from "@extensions/AttributePanel/components/attributes/FontFamily";
import { FontSize } from "@extensions/AttributePanel/components/attributes/FontSize";
import { FontStyle } from "@extensions/AttributePanel/components/attributes/FontStyle";
import { FontWeight } from "@extensions/AttributePanel/components/attributes/FontWeight";

import { AttributesPanelWrapper } from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { TextDecoration } from "@extensions/AttributePanel/components/attributes/TextDecoration";
import { LineHeight } from "@extensions/AttributePanel/components/attributes/LineHeight";
import { useBlock, useEditorProps, useFocusIdx } from "easy-email-editor";
import { ISocial } from "easy-email-core";
import { ClassName } from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";
import { Stack } from "@mui/material";

const options = [
  {
    value: "vertical",
    get label() {
      return t("vertical");
    },
  },
  {
    value: "horizontal",
    get label() {
      return t("horizontal");
    },
  },
];

export function Social() {
  const { focusIdx } = useFocusIdx();
  const { focusBlock } = useBlock();
  const value = focusBlock?.data.value as ISocial["data"]["value"];
  if (!value) {
    return null;
  }

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapsableItem title={t("Setting")}>
        <RadioGroupField
          label={t("Mode")}
          name={`${focusIdx}.attributes.mode`}
          options={options}
        />

        <Align />
      </CollapsableItem>

      <CollapsableItem title={t("Typography")}>
        <Stack spacing={2}>
          <FontFamily />
          <FontSize />
          <FontWeight />
          <LineHeight />
          <Color />
          <ContainerBackgroundColor title={t("Background color")} />
          <TextDecoration />
          <FontStyle />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Social item")} defaultExpanded={false}>
        <EditGridTabField
          tabPosition="top"
          name={`${focusIdx}.data.value.elements`}
          label=""
          labelHidden
          renderItem={(item, index) => (
            <SocialElement item={item} index={index} />
          )}
        />
      </CollapsableItem>

      <CollapsableItem title={t("Dimension")}>
        <Stack spacing={2}>
          <InputWithUnitField
            label={t("Icon width")}
            name={`${focusIdx}.attributes.icon-size`}
          />
          <TextField
            label={t("Border radius")}
            name={`${focusIdx}.attributes.border-radius`}
          />

          <Padding />
          <Padding attributeName="inner-padding" title={t("Icon padding")} />
          <Padding attributeName="text-padding" title={t("Text padding")} />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Extra")}>
        <ClassName />
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}

function SocialElement({
  index,
}: {
  item: ISocial["data"]["value"]["elements"][0];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage, socialIcons } = useEditorProps();

  const autoCompleteOptions = useMemo(() => {
    if (!socialIcons) {
      return undefined;
    }

    return socialIcons.map((icon) => {
      return {
        label: icon.content,
        value: icon.image,
      };
    });
  }, [socialIcons]);

  return (
    <Stack spacing={2}>
      <ImageUploaderField
        label={t("Image")}
        autoCompleteOptions={autoCompleteOptions}
        labelHidden
        name={`${focusIdx}.data.value.elements.[${index}].src`}
        uploadHandler={onUploadImage}
      />
      <TextField
        label={t("Content")}
        name={`${focusIdx}.data.value.elements.[${index}].content`}
        quickchange
      />

      <TextField
        prefix={<IconLink />}
        label={t("Link")}
        name={`${focusIdx}.data.value.elements.[${index}].href`}
      />
    </Stack>
  );
}
