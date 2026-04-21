import React from "react";
import {
  ColorPickerField,
  EditTabField,
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  SelectField,
  TextField,
} from "@extensions/components/Form";
import { IconLink } from "@arco-design/web-react/icon";
import { Grid, Space } from "@arco-design/web-react";
import { Stack, useEditorProps, useFocusIdx } from "easy-email-editor";
import { AttributesPanelWrapper } from "@extensions/AttributePanel/components/attributes/AttributesPanelWrapper";
import { Align } from "@extensions/AttributePanel/components/attributes/Align";
import { ICarousel } from "easy-email-core";
import { ClassName } from "@extensions";
import { CollapsableItem } from "@extensions/components/Collapse/CollapsableItem";

const options = [
  {
    value: "hidden",
    get label() {
      return t("hidden");
    },
  },
  {
    value: "visible",
    get label() {
      return t("visible");
    },
  },
];

export function Carousel() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <CollapsableItem title={t("Dimension")}>
        <Space direction="vertical">
          <InputWithUnitField
            label={t("Thumbnail width")}
            name={`${focusIdx}.attributes.tb-width`}
            quickchange
            inline
          />

          <RadioGroupField
            label={t("Thumbnails")}
            name={`${focusIdx}.attributes.thumbnails`}
            options={options}
            inline
          />
          <Align inline />
        </Space>
      </CollapsableItem>
      <CollapsableItem title={t("Images")}>
        <Stack vertical spacing="tight">
          <EditTabField
            tabPosition="top"
            name={`${focusIdx}.data.value.images`}
            label=""
            labelHidden
            renderItem={(item, index) => (
              <CarouselImage item={item} index={index} />
            )}
            additionItem={{
              src: "https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg",
              target: "_blank",
            }}
          />
        </Stack>
      </CollapsableItem>
      <CollapsableItem title={t("Icon")}>
        <Grid.Row>
          <Grid.Col span={11}>
            <TextField
              label={t("Left icon")}
              name={`${focusIdx}.attributes.left-icon`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <TextField
              label={t("Right icon")}
              name={`${focusIdx}.attributes.right-icon`}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col span={11}>
            <InputWithUnitField
              label={t("Icon width")}
              name={`${focusIdx}.attributes.icon-width`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11} />
        </Grid.Row>
      </CollapsableItem>

      <CollapsableItem title={t("Border")}>
        <Grid.Row>
          <Grid.Col span={11}>
            <ColorPickerField
              label={t("Hovered border")}
              name={`${focusIdx}.attributes.tb-hover-border-color`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <ColorPickerField
              label={t("Selected Border")}
              name={`${focusIdx}.attributes.tb-selected-border-color`}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col span={11}>
            <TextField
              label={t("Border of the thumbnails")}
              name={`${focusIdx}.attributes.tb-border`}
            />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <TextField
              label={t("Border radius of the thumbnails")}
              name={`${focusIdx}.attributes.tb-border-radius`}
            />
          </Grid.Col>
        </Grid.Row>
      </CollapsableItem>
      <CollapsableItem title={t("Extra")} defaultExpanded={false}>
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </CollapsableItem>
    </AttributesPanelWrapper>
  );
}

function CarouselImage({
  item,
  index,
}: {
  item: ICarousel["data"]["value"]["images"];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  return (
    <Space direction="vertical">
      <ImageUploaderField
        label={t("Image")}
        labelHidden
        name={`${focusIdx}.data.value.images.[${index}].src`}
        helpText={t(
          "The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally."
        )}
        uploadHandler={onUploadImage}
      />
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            prefix={<IconLink />}
            label={t("Url")}
            name={`${focusIdx}.data.value.images.[${index}].href`}
          />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <SelectField
            label={t("Target")}
            name={`${focusIdx}.data.value.images.[${index}].target`}
            options={[
              {
                value: "",
                label: t("_self"),
              },
              {
                value: "_blank",
                label: t("_blank"),
              },
            ]}
          />
        </Grid.Col>
      </Grid.Row>

      <TextField
        label={t("Title")}
        name={`${focusIdx}.data.value.image.[${index}].title`}
      />
    </Space>
  );
}
