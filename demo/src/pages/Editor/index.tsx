import React, { useCallback } from "react";
import { Button, ConfigProvider, Dropdown, Menu, PageHeader } from "@arco-design/web-react";
import { cloneDeep } from "lodash";
import mjml from "mjml-browser";

import { saveAs } from "file-saver";
import { EmailEditor, EmailEditorProvider, IEmailTemplate } from "easy-email-editor";

import { pushEvent } from "@demo/utils/pushEvent";

import { AdvancedType, BasicType, IBlockData, JsonToMjml } from "easy-email-core";
import { ExtensionProps, StandardLayout } from "easy-email-extensions";

import "easy-email-editor/lib/style.css";
import "easy-email-extensions/lib/style.css";
import blueTheme from "@arco-themes/react-easy-email-theme/css/arco.css?inline";
import enUS from "@arco-design/web-react/es/locale/en-US";

import { useWindowSize } from "react-use";
import { TEMPLATE_DATA } from "@demo/pages/Editor/Arturia - Newsletter";

const defaultCategories: ExtensionProps["categories"] = [
  {
    label: "Content",
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
      {
        type: AdvancedType.TABLE,
      },
      {
        type: AdvancedType.GROUP,
      },
      {
        type: AdvancedType.NAVBAR,
      },
      {
        type: AdvancedType.SECTION,
      },
      {
        type: AdvancedType.CAROUSEL,
      },
      {
        type: AdvancedType.TABLE,
      },
      {
        type: BasicType.TABLE,
      },
    ],
  },
  {
    label: "Layout",
    active: true,
    displayType: "column",
    blocks: [
      {
        title: "2 columns",
        payload: [
          ["50%", "50%"],
          ["33%", "67%"],
          ["67%", "33%"],
          ["25%", "75%"],
          ["75%", "25%"],
        ],
      },
      {
        title: "3 columns",
        payload: [
          ["33.33%", "33.33%", "33.33%"],
          ["25%", "25%", "50%"],
          ["50%", "25%", "25%"],
        ],
      },
      {
        title: "4 columns",
        payload: [["25%", "25%", "25%", "25%"]],
      },
    ],
  },
];

export default function Editor() {
  const { width } = useWindowSize();
  const compact = width > 1600;

  const onExportMJML = (values: IEmailTemplate) => {
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: "production",
      context: values.content,
    });

    pushEvent({ event: "MJMLExport", payload: { values } });
    navigator.clipboard.writeText(mjmlString);
    saveAs(new Blob([mjmlString], { type: "text/mjml" }), "easy-email.mjml");
  };

  const onExportHTML = (values: IEmailTemplate) => {
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: "production",
      context: values.content,
    });

    const html = mjml(mjmlString, {}).html;

    pushEvent({ event: "HTMLExport", payload: { values } });
    navigator.clipboard.writeText(html);
    saveAs(new Blob([html], { type: "text/html" }), "easy-email.html");
  };

  const onExportJSON = (values: IEmailTemplate) => {
    navigator.clipboard.writeText(JSON.stringify(values, null, 2));
    saveAs(
      new Blob([JSON.stringify(values, null, 2)], { type: "application/json" }),
      "easy-email.json"
    );
  };

  if (!TEMPLATE_DATA) return null;

  const sourceData = cloneDeep(
    JSON.parse(TEMPLATE_DATA.content.content)
  ) as IBlockData;

  const initialValues = {
    ...TEMPLATE_DATA,
    content: sourceData, // replace standard block
  };

  console.log(TEMPLATE_DATA);

  const onSubmit = useCallback(
    async (values: IEmailTemplate) => {
      console.log(values);
    },
    [initialValues]
  );

  if (!initialValues) return null;

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <style>{blueTheme}</style>
        <EmailEditorProvider
          enabledLogic={true}
          height={"calc(100vh - 108px)"}
          data={initialValues}
          onUploadImage={(file) => {
            console.log(file);
            return Promise.resolve(file.text());
          }}
          onSubmit={onSubmit}
          dashed={false}
          compact={compact}
          mergeTags={{
            test: "test",
            test2: [
              {
                label: "test2",
                value: "test2",
              },
              {
                label: "test3",
                value: "test3",
              },
            ],
            test4: {
              label: "test4",
              value: "test4",
            },
          }}
          fontList={[
            { label: "Arial", value: "Arial" },
            { label: "Arial Black", value: "Arial Black" },
            { label: "Arial Narrow", value: "Arial Narrow" },
            { label: "Book Antiqua", value: "Book Antiqua" },
            { label: "Calibri", value: "Calibri" },
            { label: "Cambria", value: "Cambria" },
            { label: "Candara", value: "Candara" },
            { label: "Century Gothic", value: "Century Gothic" },
            { label: "Comic Sans MS", value: "Comic Sans MS" },
            { label: "Constantia", value: "Constantia" },
            { label: "Corbel", value: "Corbel" },
            { label: "Courier New", value: "Courier New" },
            {
              label: "Franklin Gothic Medium",
              value: "Franklin Gothic Medium",
            },
            { label: "Garamond", value: "Garamond" },
            { label: "Georgia", value: "Georgia" },
            { label: "Helvetica", value: "Helvetica" },
            { label: "Impact", value: "Impact" },
            { label: "Lato", value: "Lato, Arial, sans-serif" },
            { label: "Lucida Console", value: "Lucida Console" },
            { label: "Open Sans", value: "Open Sans, Arial, sans-serif" },
            { label: "Palatino Linotype", value: "Palatino Linotype" },
            { label: "Roboto", value: "Roboto, Arial, sans-serif" },
            { label: "Segoe UI", value: "Segoe UI" },
            { label: "Tahoma", value: "Tahoma" },
            { label: "Times New Roman", value: "Times New Roman" },
            { label: "Trebuchet MS", value: "Trebuchet MS" },
            { label: "Verdana", value: "Verdana" },
          ]}
        >
          {({ values }, { submit, restart }) => {
            return (
              <>
                <PageHeader
                  style={{ background: "var(--color-bg-2)" }}
                  backIcon
                  title="Edit"
                  extra={
                    <Dropdown
                      droplist={
                        <Menu>
                          <Menu.Item
                            key="Export MJML"
                            onClick={() => onExportMJML(values)}
                          >
                            Export MJML
                          </Menu.Item>
                          <Menu.Item
                            key="Export HTML"
                            onClick={() => onExportHTML(values)}
                          >
                            Export HTML
                          </Menu.Item>
                          <Menu.Item
                            key="Export JSON"
                            onClick={() => onExportJSON(values)}
                          >
                            Export JSON
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <Button>
                        <strong>Export</strong>
                      </Button>
                    </Dropdown>
                  }
                />

                <StandardLayout
                  categories={defaultCategories}
                  showSourceCode={true}
                  mjmlReadOnly={false}
                  showBlockLayer={true}
                >
                  <EmailEditor />
                </StandardLayout>
              </>
            );
          }}
        </EmailEditorProvider>
      </div>
    </ConfigProvider>
  );
}
