import React, { useState } from "react";
import { ToolItem } from "../../ToolItem";
import { ColorCommandWrapper } from "@/extensions/components/Form/RichTextToolBar/components/ColorChanger/ColorCommandWrapper";
import FontDownloadOutlinedIcon from "@mui/icons-material/FontDownloadOutlined";

export function IconFontColor({
  selectionRange,
  execCommand,
  getPopoverMountNode,
}: Readonly<{
  selectionRange: Range | null;
  execCommand: (cmd: string, val?: any) => void;
  getPopoverMountNode: () => HTMLElement;
}>) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <ColorCommandWrapper
      command="foreColor"
      selectionRange={selectionRange}
      execCommand={execCommand}
      anchorEl={anchorEl ?? undefined}
      getPopoverMountNode={getPopoverMountNode}
      styleKey="color"
    >
      {(color) => (
        <ToolItem
          onClick={(e) => setAnchorEl(e.currentTarget)}
          icon={
            <div style={{ position: "relative" }}>
              <FontDownloadOutlinedIcon
                sx={{ position: "relative", top: "-1px", fontSize: 15 }}
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
