import React from "react";
import {
  ColorPickerField,
  EditTabField,
  SelectField,
  TextField
} from "@extensions/components/Form";
import { Align } from "@extensions/AttributePanel/components/attributes/Align";
import {
  AttributesPanelWrapper
} from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { Grid, Space } from "@arco-design/web-react";
import { IconLink } from "@arco-design/web-react/icon";
import {
  NavbarLinkPadding
} from "@extensions/AttributePanel/components/attributes/NavbarLinkPadding";
import { Stack, useFocusIdx } from "easy-email-editor";
import { INavbar } from "easy-email-core";
import { ClassName } from "../../attributes/ClassName";
import {
  FontFamily,
  FontStyle,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TextDecoration,
  TextTransform
} from "../../attributes";
import { pixelAdapter } from "../../adapter";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

export function Navbar() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapsableItem title={t("Layout")}>
        <Stack vertical spacing="tight">
          <Align />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Navbar links")}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <EditTabField
            tabPosition="top"
            name={`${focusIdx}.data.value.links`}
            label={t("Links")}
            labelHidden
            renderItem={(item, index) => (
              <NavbarLink item={item} index={index} />
            )}
            additionItem={{
              src: "https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg",
              target: "_blank",
              content: "New link",
              color: "#1890ff",
              "font-size": "13px",
            }}
          />
          <div />
        </Space>
      </CollapsableItem>
      <CollapsableItem title={t("Extra")}>
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}

function NavbarLink({
  item,
  index,
}: {
  item: INavbar["data"]["value"]["links"];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  return (
    <div className="NavbarLink">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Grid.Row>
          <Grid.Col span={11}>
            <TextField
              label={t("Content")}
              name={`${focusIdx}.data.value.links.[${index}].content`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <ColorPickerField
              label={t("Color")}
              name={`${focusIdx}.data.value.links.[${index}].color`}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <FontFamily
              name={`${focusIdx}.data.value.links.[${index}].font-family`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <TextField
              label={t("Font size (px)")}
              name={`${focusIdx}.data.value.links.[${index}].font-size`}
              config={pixelAdapter}
              autoComplete="off"
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <LineHeight
              name={`${focusIdx}.data.value.links.[${index}].line-height`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <LetterSpacing
              name={`${focusIdx}.data.value.links.[${index}].letter-spacing`}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <TextDecoration
              name={`${focusIdx}.data.value.links.[${index}].text-decoration`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <FontWeight
              name={`${focusIdx}.data.value.links.[${index}].font-weight`}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <TextTransform
              name={`${focusIdx}.data.value.links.[${index}].text-transform`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11} />
        </Grid.Row>
        <FontStyle
          name={`${focusIdx}.data.value.links.[${index}].font-style`}
        />
        <Grid.Row>
          <Grid.Col span={11}>
            <TextField
              prefix={<IconLink />}
              label={<span>{t("Url")}</span>}
              name={`${focusIdx}.data.value.links.[${index}].href`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <SelectField
              style={{ minWidth: 65 }}
              label={t("Target")}
              name={`${focusIdx}.data.value.links.[${index}].target`}
              options={[
                {
                  value: "_blank",
                  label: t("_blank"),
                },
                {
                  value: "_self",
                  label: t("_self"),
                },
              ]}
            />
          </Grid.Col>
        </Grid.Row>
        <NavbarLinkPadding
          key={index}
          name={`${focusIdx}.data.value.links.[${index}].padding`}
        />
        <div />
      </Space>
    </div>
  );
}
