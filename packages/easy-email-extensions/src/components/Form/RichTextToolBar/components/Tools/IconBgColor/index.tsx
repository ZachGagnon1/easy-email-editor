import { IconFont } from "easy-email-editor";
import React from "react";
import { ToolItem } from "../../ToolItem";
import { ColorCommandWrapper } from "@extensions/components/Form/RichTextToolBar/components/ColorChanger/ColorCommandWrapper";

export function IconBgColor({
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
      command="hiliteColor" // Use "hiliteColor" for background text highlights
      selectionRange={selectionRange}
      execCommand={execCommand}
      getPopoverMountNode={getPopoverMountNode}
      styleKey="backgroundColor"
    >
      {(color) => (
        <ToolItem
          icon={
            <div style={{ position: "relative" }}>
              <IconFont
                size={12}
                iconName="icon-bg-color"
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
          title="Background color"
        />
      )}
    </ColorCommandWrapper>
  );
}
