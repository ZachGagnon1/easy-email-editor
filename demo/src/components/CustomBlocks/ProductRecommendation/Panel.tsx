import {
  AttributesPanelWrapper,
  ColorPickerField,
  NumberField,
  TextField,
  useFocusIdx,
} from "lattice";
import React from "react";

export function Panel() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: "20px" }}>
      <NumberField label="Quantity" name={`${focusIdx}.data.value.quantity`} />
      <TextField label="Title" name={`${focusIdx}.data.value.title`} />
      <TextField
        label="Button text"
        name={`${focusIdx}.data.value.buttonText`}
      />
      <ColorPickerField
        label="Background color"
        name={`${focusIdx}.attributes.background-color`}
      />
      <ColorPickerField
        label="Title color"
        name={`${focusIdx}.attributes.title-color`}
      />
      <ColorPickerField
        label="Product name color"
        name={`${focusIdx}.attributes.product-name-color`}
      />
      <ColorPickerField
        label="Product price color"
        name={`${focusIdx}.attributes.product-price-color`}
      />
      <ColorPickerField
        label="Button color"
        name={`${focusIdx}.attributes.button-color`}
      />
      <ColorPickerField
        label="Button text color"
        name={`${focusIdx}.attributes.button-text-color`}
      />
    </AttributesPanelWrapper>
  );
}
