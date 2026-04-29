import React from "react";
import { RICH_TEXT_BAR_ID, useEditorContext, useFocusBlockLayout } from "@";
import { Tools } from "./components/Tools";
import styleText from "./shadow-dom.scss?inline";
import { createPortal } from "react-dom";
import { IframeCacheProvider } from "@/components/Provider/IframeCacheProvider";

export function RichTextToolBar(props: { onChange: (s: string) => void }) {
  const { initialized } = useEditorContext();
  const { focusBlockNode } = useFocusBlockLayout();

  const root = initialized && focusBlockNode;

  if (!root) return null;

  return createPortal(
    <IframeCacheProvider>
      <>
        <style dangerouslySetInnerHTML={{ __html: styleText }} />
        <div
          id={RICH_TEXT_BAR_ID}
          style={{
            transform: "translate(0,-35px)",
            padding: "4px 8px",
            boxSizing: "border-box",
            position: "absolute",
            left: -36,
            top: 0,
            zIndex: 100,
          }}
        >
          <div
            style={{
              position: "absolute",
              backgroundColor: "#41444d",
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
            }}
          />

          <Tools onChange={props.onChange} />
        </div>
      </>
    </IframeCacheProvider>,
    root
  );
}
