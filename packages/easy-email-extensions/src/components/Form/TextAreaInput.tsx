import {
  TextInput,
  TextInputProps,
} from "@extensions/components/Form/TextInput";

export function TextAreaInput(props: TextInputProps) {
  return <TextInput {...props} multiline minRows={3} />;
}
