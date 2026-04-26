import { IconFont } from "easy-email-editor";
import React from "react";
import { ToolItem } from "../../ToolItem";
import { ColorCommandWrapper } from "@extensions/components/Form/RichTextToolBar/components/ColorChanger/ColorCommandWrapper";

export function IconFontColor({
  selectionRange,
  execCommand,
  getPopoverMountNode,
}: Readonly<{
  selectionRange: Range | null;
  execCommand: (cmd: string, val?: any) => void;
  getPopoverMountNode: () => HTMLElement;
}>) {
  return (
    <ColorCommandWrapper
      command="foreColor"
      selectionRange={selectionRange}
      execCommand={execCommand}
      getPopoverMountNode={getPopoverMountNode}
      styleKey="color"
    >
      {(color) => (
        <ToolItem
          icon={
            <div style={{ position: "relative" }}>
              <IconFont
                size={12}
                iconName="icon-font-color"
                style={{ position: "relative", top: "-1px" }}
              />
              <div
                style={{
                  borderBottom: `2px solid ${color || "currentColor"}`,
                  position: "absolute",
                  width: "130%",
                  left: "-15%",
                  top: 16,
                }}
              />
            </div>
          }
          title="Text color"
        />
      )}
    </ColorCommandWrapper>
  );
}
