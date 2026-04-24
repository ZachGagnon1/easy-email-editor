import { PopoverProps, Tooltip } from "@arco-design/web-react";
import React, { useCallback, useMemo } from "react";
import { Form } from "react-final-form";
import { getIframeDocument, IconFont, TextStyle } from "easy-email-editor";
import { SearchField, SwitchField } from "@extensions/components/Form";
import { ToolItem } from "../ToolItem";
import { EMAIL_BLOCK_CLASS_NAME } from "easy-email-core";
import { Stack, Typography } from "@mui/material";

export interface LinkParams {
  link: string;
  blank: boolean;
  underline: boolean;
  linkNode: HTMLAnchorElement | null;
}

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: (val: LinkParams) => void;
}

function getAnchorElement(node: Node | null): HTMLAnchorElement | null {
  if (!node) {
    return null;
  }
  if ((node as Element).classList?.contains(EMAIL_BLOCK_CLASS_NAME)) {
    return null;
  }
  if ((node as Element).tagName?.toLocaleLowerCase() === "a") {
    return node as HTMLAnchorElement;
  }
  return getAnchorElement(node.parentNode);
}

export function getLinkNode(
  currentRange: Range | null | undefined
): HTMLAnchorElement | null {
  let linkNode: HTMLAnchorElement | null = null;
  if (!currentRange) {
    return null;
  }
  linkNode = getAnchorElement(currentRange.startContainer);
  return linkNode;
}

export function Link(props: LinkProps) {
  const initialValues = useMemo((): LinkParams => {
    let link = "";
    let blank = true;
    let underline = true;
    const linkNode: HTMLAnchorElement | null = getLinkNode(props.currentRange);
    if (linkNode) {
      link = linkNode.getAttribute("href") || "";
      blank = linkNode.getAttribute("target") === "_blank";
      underline = linkNode.style.textDecoration === "underline";
    }
    return {
      link,
      blank,
      underline,
      linkNode,
    };
  }, [props.currentRange]);

  const onSubmit = useCallback(
    (values: LinkParams) => {
      props.onChange(values);
    },
    [props]
  );

  return (
    <Form
      key={initialValues.link}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <Tooltip
            {...props}
            triggerProps={{
              // @ts-ignore I am ignoring this type error here since this is expecting an
              // element but the function returns a document. This works fine and isn't an issue.
              getDocument: getIframeDocument,
            }}
            trigger="click"
            color="#fff"
            position="tl"
            content={
              <>
                <SearchField
                  size="small"
                  name="link"
                  label={t("Link")}
                  labelHidden
                  searchButton={t("Apply")}
                  placeholder={t("https://www.example.com")}
                  onSearch={() => handleSubmit()}
                />
                {/* TODO: fix this shit idk why it's not working but the text is invisible */}
                <Stack direction="row">
                  <Stack direction="row" spacing={1}>
                    <Typography color="primary">{t("Target")}</Typography>
                    <SwitchField
                      size="small"
                      label={t("Target")}
                      labelHidden
                      name="blank"
                      checkedText={t("blank")}
                      uncheckedText={t("self")}
                      inline
                    />
                  </Stack>
                  <TextStyle size="smallest">{t("Underline")}</TextStyle>
                  <SwitchField
                    size="small"
                    label={t("Underline")}
                    labelHidden
                    name="underline"
                    checkedText={t("off")}
                    uncheckedText={t("on")}
                    inline
                  />
                </Stack>
              </>
            }
          >
            <ToolItem
              isActive={Boolean(initialValues.link)}
              title={t("Link")}
              icon={<IconFont iconName="icon-link" />}
            />
          </Tooltip>
        );
      }}
    </Form>
  );
}
