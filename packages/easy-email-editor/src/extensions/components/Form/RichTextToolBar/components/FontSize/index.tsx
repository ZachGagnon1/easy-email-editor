import React from "react";
import { IconFont } from "easy-email-editor";
import { DropdownCommandWrapper } from "../DropdownCommandWrapper";

const list = [
  { value: "1", label: "12px" },
  { value: "2", label: "13px" },
  { value: "3", label: "16px" },
  { value: "4", label: "18px" },
  { value: "5", label: "24px" },
  { value: "6", label: "32px" },
  { value: "7", label: "48px" },
];

export interface FontSizeProps {
  execCommand: (cmd: string, value: any) => void;
  selectionRange: Range | null | undefined;
  getPopoverMountNode?: () => HTMLElement | null;
}

export function FontSize(props: FontSizeProps) {
  return (
    <DropdownCommandWrapper
      title={t("Font size")}
      icon={<IconFont iconName="icon-font-color" />} // Note: Kept your original icon name, but "icon-font-size" might be better if it exists!
      options={list}
      selectionRange={props.selectionRange}
      getPopoverMountNode={props.getPopoverMountNode}
      onSelect={(val) => props.execCommand("fontSize", val)}
    />
  );
}
