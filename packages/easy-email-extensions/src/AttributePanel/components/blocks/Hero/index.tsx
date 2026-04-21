import React from "react";
import { BackgroundColor } from "@extensions/AttributePanel/components/attributes/BackgroundColor";
import {
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  TextField,
} from "@extensions/components/Form";
import { Width } from "@extensions/AttributePanel/components/attributes/Width";
import { Height } from "@extensions/AttributePanel/components/attributes/Height";
import { VerticalAlign } from "@extensions/AttributePanel/components/attributes/VerticalAlign";
import { Padding } from "@extensions/AttributePanel/components/attributes/Padding";
import { Grid, Space } from "@arco-design/web-react";
import { useEditorProps, useFocusIdx } from "easy-email-editor";
import { AttributesPanelWrapper } from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { ClassName } from "../../attributes/ClassName";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

const options = [
  {
    value: "fluid-height",
    get label() {
      return t("Fluid height");
    },
  },
  {
    value: "fixed-height",
    get label() {
      return t("Fixed height");
    },
  },
];

export function Hero() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <CollapsableItem title={t("Dimension")}>
        <Space direction="vertical">
          <RadioGroupField
            label={t("Mode")}
            name={`${focusIdx}.attributes.mode`}
            options={options}
          />
          <Grid.Row>
            <Grid.Col span={11}>
              <Width />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <Height />
            </Grid.Col>
          </Grid.Row>

          <Padding />
          <VerticalAlign />
        </Space>
      </CollapsableItem>
      <CollapsableItem title={t("Background")}>
        <Space direction="vertical">
          <ImageUploaderField
            label={t("src")}
            name={`${focusIdx}.attributes.background-url`}
            helpText={t(
              "The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally."
            )}
            uploadHandler={onUploadImage}
          />

          <Grid.Row>
            <Grid.Col span={11}>
              <InputWithUnitField
                label={t("Background width")}
                name={`${focusIdx}.attributes.background-width`}
              />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <InputWithUnitField
                label={t("Background height")}
                name={`${focusIdx}.attributes.background-height`}
              />
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col span={11}>
              <TextField
                label={t("Background position")}
                name={`${focusIdx}.attributes.background-position`}
              />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <InputWithUnitField
                label={t("Border radius")}
                name={`${focusIdx}.attributes.border-radius`}
                unitOptions="percent"
              />
            </Grid.Col>
            <Grid.Col span={11}>
              <BackgroundColor />
            </Grid.Col>
          </Grid.Row>
        </Space>
      </CollapsableItem>
      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}
