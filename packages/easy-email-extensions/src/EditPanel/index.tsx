import { Box, Tab, Tabs } from "@mui/material";
import { useEditorProps } from "easy-email-editor";
import React from "react";
import { Blocks } from "./Blocks";
import { BlockLayer } from "@extensions/BlockLayer";
import { FullHeightOverlayScrollbars } from "@extensions/components/FullHeightOverlayScrollbars";
import { useExtensionProps } from "@extensions/components/Providers/ExtensionProvider";

interface EditPanelProps {
  showSourceCode: boolean;
  jsonReadOnly: boolean;
  mjmlReadOnly: boolean;
}

export function EditPanel(props: Readonly<EditPanelProps>) {
  const { height } = useEditorProps();
  const { compact = true, showBlockLayer = true } = useExtensionProps();
  const [value, setValue] = React.useState("block");

  return (
    <Box
      sx={{
        padding: 0,
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={value}
        onChange={(_, newValue: string) => setValue(newValue)}
        sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
        textColor="inherit"
        indicatorColor="primary"
      >
        <Tab label={t("Block")} value="block" />
        {showBlockLayer && <Tab label={t("Layer")} value="layer" />}
      </Tabs>

      <Box sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
        {value === "block" && (
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
            <Blocks />
          </FullHeightOverlayScrollbars>
        )}
        {showBlockLayer && value === "layer" && (
          <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
            <div style={{ padding: 20 }}>
              <BlockLayer />
            </div>
          </FullHeightOverlayScrollbars>
        )}
      </Box>
    </Box>
  );
}
