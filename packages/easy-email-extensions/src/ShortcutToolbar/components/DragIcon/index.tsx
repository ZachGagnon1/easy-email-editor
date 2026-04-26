import React from "react";
import { BlockAvatarWrapper, IconFont } from "easy-email-editor";
import { getIconNameByBlockType } from "@extensions";
import { BlockManager, IBlockData, RecursivePartial } from "easy-email-core";
import { IconButton, Tooltip } from "@mui/material";

export interface DragIconProps<T extends IBlockData> {
  type: string;
  payload?: RecursivePartial<T>;
  color: string;
}

export function DragIcon<T extends IBlockData = any>(props: DragIconProps<T>) {
  const block = BlockManager.getBlockByType(props.type);

  return (
    <BlockAvatarWrapper type={props.type} payload={props.payload}>
      <Tooltip title={block?.name ?? ""} placement="top">
        <IconButton
          size="small"
          sx={{
            cursor: "move",
            "&:active": { cursor: "grabbing" },
          }}
        >
          <IconFont
            iconName={getIconNameByBlockType(props.type)}
            style={{
              fontSize: 16,
              textAlign: "center",
              color: props.color,
              cursor: "inherit", // Inherits from the IconButton wrapper
            }}
          />
        </IconButton>
      </Tooltip>
    </BlockAvatarWrapper>
  );
}
