import React, { useState } from "react";
import { AttributesPanelWrapper } from "@/extensions/AttributePanel";
import {
  Border,
  Color,
  ContainerBackgroundColor,
  FontFamily,
  FontSize,
  FontStyle,
  Padding,
  TextAlign,
  Width,
} from "@/extensions";
import { HtmlEditor } from "../../UI/HtmlEditor";
import { CollapsableItem } from "@/extensions/components/Collapse/CollapsableItem";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

export function Table() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      extra={
        <Tooltip title={t("Edit")} placement="top">
          <IconButton
            onClick={() => setVisible(true)}
            size="small"
            sx={{ p: 0.5 }} // Keeps the icon neatly aligned within the header
          >
            <CodeIcon />
          </IconButton>
        </Tooltip>
      }
    >
      <CollapsableItem title={t("Dimension")}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Width />
            </Box>
            {/* Acts as the empty Stack.Item spacer to keep Width at 50% */}
            <Box sx={{ flex: 1 }} />
          </Stack>
          <Padding />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Decoration")}>
        {/* Added a vertical stack to give these fields consistent breathing room */}
        <Stack spacing={2}>
          <Color />
          <ContainerBackgroundColor />
          <Border />
        </Stack>
      </CollapsableItem>

      <CollapsableItem title={t("Typography")}>
        <Stack spacing={2}>
          <FontFamily />
          <FontSize />
          <FontStyle />
          <TextAlign />
        </Stack>
      </CollapsableItem>

      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>
  );
}
