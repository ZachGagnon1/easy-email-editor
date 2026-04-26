import React from "react";
import { Box } from "@mui/material";
import { useEditorProps } from "easy-email-editor";
import { Blocks } from "./Blocks";
import { BlockLayer } from "@extensions/BlockLayer";
import { FullHeightOverlayScrollbars } from "@extensions/components/FullHeightOverlayScrollbars";
import { useExtensionProps } from "@extensions/components/Providers/ExtensionProvider";
// Adjust import path to where you placed the components
import {
  EditorTab,
  EditorTabPanel,
  EditorTabs,
} from "@extensions/components/EditorTabs/EditorTabs";

export function EditPanel() {
  const { height } = useEditorProps();
  const { showBlockLayer = true } = useExtensionProps();
  const [value, setValue] = React.useState("block");

  return (
    <Box
      sx={{
        padding: 0,
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <EditorTabs
        value={value}
        onChange={(_, newValue: string) => setValue(newValue)}
      >
        <EditorTab label={t("Block")} value="block" />
        {showBlockLayer && <EditorTab label={t("Layer")} value="layer" />}
      </EditorTabs>

      <EditorTabPanel value={value} index="block" destroyOnHide={false}>
        <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
          <Blocks />
        </FullHeightOverlayScrollbars>
      </EditorTabPanel>

      {showBlockLayer && (
        <EditorTabPanel value={value} index="layer" destroyOnHide={false}>
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
            <div style={{ padding: 20 }}>
              <BlockLayer />
            </div>
          </FullHeightOverlayScrollbars>
        </EditorTabPanel>
      )}
    </Box>
  );
}
