import React, { useMemo } from "react";
import { getIframeDocument, IconFont, useFocusIdx } from "easy-email-editor";
import { IconLink } from "@arco-design/web-react/icon";
import { SelectField, TextField } from "../../../components/Form";
import { Button as ArcoButton, Popover } from "@arco-design/web-react";
import { MergeTags } from "./MergeTags";
import { useField } from "react-final-form";
import { Stack } from "@mui/material";

export function Link() {
  const { focusIdx } = useFocusIdx();
  const { input } = useField(`${focusIdx}.attributes.href`, {
    parse: (v) => v,
  });

  // TODO: make sure this still looks good
  return useMemo(() => {
    return (
      <Stack spacing={1} direction="row">
        <TextField
          prefix={<IconLink />}
          label={
            <>
              <span>{t("Href")}&nbsp;&nbsp;&nbsp;</span>
              <Popover
                triggerProps={{
                  // @ts-ignore I am ignoring this type error here since this is expecting an
                  // element but the function returns a document. This works fine and isn't an issue.
                  getDocument: getIframeDocument,
                }}
                trigger="click"
                content={
                  <MergeTags value={input.value} onChange={input.onChange} />
                }
              >
                <ArcoButton
                  type="text"
                  icon={<IconFont iconName="icon-merge-tags" />}
                />
              </Popover>
            </>
          }
          name={`${focusIdx}.attributes.href`}
        />
        <SelectField
          label={t("Target")}
          name={`${focusIdx}.attributes.target`}
          options={[
            {
              value: "",
              label: t("_self"),
            },
            {
              value: "_blank",
              label: t("_blank"),
            },
          ]}
        />
      </Stack>
    );
  }, [focusIdx]);
}
