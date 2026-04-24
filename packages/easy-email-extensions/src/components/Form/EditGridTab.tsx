import { Card, TabsProps, Typography } from "@arco-design/web-react";
import { IconClose, IconPlus } from "@arco-design/web-react/icon";
import { cloneDeep } from "lodash";
import React from "react";
import { Stack } from "@mui/material";

export interface EditGridTabProps<T extends any = any>
  extends Omit<TabsProps, "onChange"> {
  value: Array<T>;
  renderItem: (item: T, index: number) => React.ReactNode;
  onChange: (vals: Array<T>) => any;
  additionItem?: T;
  label: string;
}
export function EditGridTab<T extends any = any>(props: EditGridTabProps<T>) {
  const { value, additionItem } = props;

  const onAdd = (index: number) => {
    const newItem = additionItem || cloneDeep(value[index]);
    value.splice(index + 1, 0, newItem);
    props.onChange([...value]);
  };

  const onDelete = (index: number) => {
    props.onChange(value.filter((_, vIndex) => Number(index) !== vIndex));
  };
  return (
    <Card bordered={false}>
      {(Array.isArray(value) ? value : []).map((item, index) => (
        <Card.Grid style={{ width: "100%" }} key={index}>
          <Card
            title={
              <Typography.Text>
                {t("Item")} {index + 1}
              </Typography.Text>
            }
            extra={
              <Stack spacing={2}>
                <IconPlus
                  style={{ color: "#000", cursor: "pointer" }}
                  onClick={() => onAdd(index)}
                />
                <IconClose
                  style={{ color: "#000", cursor: "pointer" }}
                  onClick={() => onDelete(index)}
                />
              </Stack>
            }
          >
            {props.renderItem(item, index)}
          </Card>
        </Card.Grid>
      ))}
    </Card>
  );
}
