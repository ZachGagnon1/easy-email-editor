import React from "react";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export function Help(
  props: React.ComponentProps<typeof Tooltip> &
    Partial<{ style: React.CSSProperties }> & {
      title: React.ReactNode;
    }
) {
  const { title, ...otherProps } = props;
  return (
    <Tooltip title={title} {...otherProps}>
      <span style={{ cursor: "pointer" }}>
        <HelpOutlineOutlinedIcon fontSize="small" />
      </span>
    </Tooltip>
  );
}
