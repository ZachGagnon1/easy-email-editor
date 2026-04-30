import React, { useState } from "react";
import { cloneDeep } from "lodash";
import { useWindowSize } from "react-use";

// 1. One-stop import!
import {
  downloadFile,
  exportToHtml,
  exportToJson,
  exportToMjml,
  IEmailTemplate,
  LatticeEditor
} from "lattice";
import { TEMPLATE_DATA } from "@demo/pages/Editor/Arturia - Newsletter";

export default function Editor() {
  const { width } = useWindowSize();
  const compact = width > 1600;

  // 2. Keep track of the current template state effortlessly
  const [template, setTemplate] = useState<IEmailTemplate>(() => ({
    ...TEMPLATE_DATA,
    content: cloneDeep(JSON.parse(TEMPLATE_DATA.content.content)),
  }));

  const handleExportHTML = () => {
    const html = exportToHtml(template);
    downloadFile(html, "lattice-email.html", "text/html");
  };

  if (!template) return null;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          height: "30px",
          alignItems: "center",
        }}
      >
        <h1>Lattice Editor</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              height: "30px",
            }}
            onClick={() =>
              downloadFile(exportToMjml(template), "email.mjml", "text/mjml")
            }
          >
            Export MJML
          </button>
          <button
            style={{
              height: "30px",
            }}
            onClick={handleExportHTML}
          >
            Export HTML
          </button>
          <button
            style={{
              height: "30px",
            }}
            onClick={() =>
              downloadFile(
                exportToJson(template),
                "email.json",
                "application/json"
              )
            }
          >
            Export JSON
          </button>
        </div>
      </div>

      <LatticeEditor
        data={template}
        onChange={setTemplate} // Automatically syncs state!
        onUploadImage={(file) => Promise.resolve(file.text())}
        config={{
          compact,
          showSourceCode: true,
        }}
        mergeTags={{
          test: "test",
          test2: [{ label: "test2", value: "test2" }],
        }}
      />
    </div>
  );
}
