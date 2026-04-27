import React from "react";
import { IconFont } from "easy-email-editor";
import { useFontFamily } from "@/extensions/hooks/useFontFamily";
import { DropdownCommandWrapper } from "../DropdownCommandWrapper";

export interface FontFamilyProps {
  execCommand: (cmd: string, value: any) => void;
  selectionRange: Range | null | undefined;
  getPopoverMountNode?: () => HTMLElement | null;
}

export function FontFamily(props: FontFamilyProps) {
  const { fontList } = useFontFamily();

  if (fontList.length === 0) return null;

  return (
    <DropdownCommandWrapper
      title={t("Font family")}
      icon={<IconFont iconName="icon-font-family" />}
      options={fontList}
      selectionRange={props.selectionRange}
      getPopoverMountNode={props.getPopoverMountNode}
      onSelect={(val) => props.execCommand("fontName", val)}
    />
  );
}
