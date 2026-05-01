import React, { useState } from "react";
import { useFocusIdx } from "@";
import { TextAreaField } from "@/extensions/components/Form";
import { AttributesPanelWrapper } from "@/extensions";
import { IconButton, Tooltip } from "@mui/material";
import { HtmlEditor } from "../../UI/HtmlEditor";
import CodeIcon from "@mui/icons-material/Code";

export function Raw() {
  const { focusIdx } = useFocusIdx();
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      style={{ padding: 20 }}
      extra={
        <Tooltip title={t("Html mode")} placement="top">
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
      <TextAreaField
        label=""
        name={`${focusIdx}.data.value.content`}
        rows={5}
      />
      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>
  );
}
