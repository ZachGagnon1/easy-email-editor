import React, { useEffect, useState } from "react";
import { MjmlDomRender } from "../EditEmailPreview/components/MjmlDomRender";
import { useDropBlock } from "@/hooks/useDropBlock";
import { useHotKeys } from "@/hooks/useHotKeys";
import { ShadowStyle } from "./components/ShadowStyle";
import { useEditorContext } from "@/hooks/useEditorContext";
import {
  DATA_ATTRIBUTE_DROP_CONTAINER,
  PLUGINS_CONTAINER_ID,
  SYNC_SCROLL_ELEMENT_CLASS_NAME,
} from "@/constants";
import { classnames } from "@/utils/classnames";
import { ActiveTabKeys } from "@/components/Provider/BlocksProvider";
import { useActiveTab } from "@/hooks/useActiveTab";
import { SyncScrollIframeComponent } from "@/components/UI/SyncScrollIframeComponent";
import { IframeCacheProvider } from "@/components/Provider/IframeCacheProvider";

export function EditEmailPreview() {
  useHotKeys();
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const { setRef } = useDropBlock();
  const { activeTab } = useActiveTab();

  const { setInitialized } = useEditorContext();

  useEffect(() => {
    setRef(containerRef);
  }, [containerRef, setRef]);

  useEffect(() => {
    if (containerRef) {
      setInitialized(true);
    }
  }, [containerRef, setInitialized]);

  return (
    <SyncScrollIframeComponent
      isActive={activeTab === ActiveTabKeys.EDIT}
      id="VisualEditorEditMode"
      iframeWrapper={IframeCacheProvider} // <-- Pass it cleanly here
      {...{
        [DATA_ATTRIBUTE_DROP_CONTAINER]: "true",
      }}
      style={{
        height: "100%",
        width: "100%",
        zIndex: 10,
        position: "relative",
        outline: "none",
        border: "none",
      }}
    >
      <div
        id={PLUGINS_CONTAINER_ID}
        style={{
          position: "relative",
        }}
      />
      <div
        className={classnames(
          "shadow-container",
          SYNC_SCROLL_ELEMENT_CLASS_NAME
        )}
        style={{
          height: "100%",
          overflowY: "auto",
          zIndex: 10,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 40,
          paddingBottom: 40,
          boxSizing: "border-box",
        }}
        ref={setContainerRef}
      >
        <MjmlDomRender />
      </div>
      <ShadowStyle />
    </SyncScrollIframeComponent>
  );
}
