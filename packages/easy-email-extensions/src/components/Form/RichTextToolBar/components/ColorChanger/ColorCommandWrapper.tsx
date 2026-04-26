import { ColorPicker } from "../../../ColorPicker/ColorPickerInput";
import { getIframeDocument } from "easy-email-editor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "react-final-form";
import { Box, Button } from "@mui/material";

export interface ColorCommandWrapperProps {
  command: string; // e.g., "foreColor" or "hiliteColor"
  selectionRange: Range | null;
  execCommand: (cmd: string, val?: any) => void;
  getPopoverMountNode: () => HTMLElement;
  styleKey: "color" | "backgroundColor";
  children: (color: string | undefined) => React.ReactNode;
}

export function ColorCommandWrapper({
  command,
  selectionRange,
  execCommand,
  getPopoverMountNode,
  styleKey,
  children,
}: ColorCommandWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState<string | undefined>(undefined);

  const lastKnownRange = useRef<Range | null>(null);

  useEffect(() => {
    if (selectionRange) {
      lastKnownRange.current = selectionRange.cloneRange();
    }
  }, [selectionRange]);

  useEffect(() => {
    if (isOpen && lastKnownRange.current) {
      const range = lastKnownRange.current;
      let foundColor: string | undefined = undefined;

      if (range.commonAncestorContainer instanceof HTMLElement) {
        foundColor = getComputedStyle(range.commonAncestorContainer)[styleKey];
      } else if (range.commonAncestorContainer.parentNode) {
        foundColor = getComputedStyle(
          range.commonAncestorContainer.parentNode as HTMLElement
        )[styleKey];
      }

      setActiveColor(foundColor);
    }
  }, [isOpen, styleKey]);

  useEffect(() => {
    if (isOpen) {
      const iframeDocument = getIframeDocument();
      const iframeWindow = iframeDocument?.defaultView;
      const iframeBody = iframeDocument?.body;

      let prevUserSelect = "";
      let forwardEvent: ((e: MouseEvent) => void) | null = null;

      if (iframeBody && iframeWindow) {
        prevUserSelect = iframeBody.style.getPropertyValue("user-select");
        iframeBody.style.setProperty("user-select", "none", "important");

        forwardEvent = (e: MouseEvent) => {
          const clonedEvent = new MouseEvent(e.type, {
            bubbles: true,
            cancelable: e.cancelable,
            clientX: e.clientX,
            clientY: e.clientY,
            screenX: e.screenX,
            screenY: e.screenY,
          });
          window.dispatchEvent(clonedEvent);
        };

        iframeWindow.addEventListener("mousemove", forwardEvent);
        iframeWindow.addEventListener("mouseup", forwardEvent);
      }

      return () => {
        if (iframeBody) {
          if (prevUserSelect) {
            iframeBody.style.setProperty("user-select", prevUserSelect);
          } else {
            iframeBody.style.removeProperty("user-select");
          }
        }
        if (iframeWindow && forwardEvent) {
          iframeWindow.removeEventListener("mousemove", forwardEvent);
          iframeWindow.removeEventListener("mouseup", forwardEvent);
        }
      };
    }
  }, [isOpen]);

  // This ONLY fires when the user clicks the "Apply" button inside the form.
  const onSubmit = useCallback(
    (values: { color: string }) => {
      const iframeWindow = getIframeDocument()?.defaultView;
      const range = lastKnownRange.current;

      if (iframeWindow && range) {
        iframeWindow.focus();
        const selection = iframeWindow.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }

      execCommand(command, values.color);

      // Update the UI immediately
      setActiveColor(values.color);

      if (iframeWindow) {
        const newSelection = iframeWindow.getSelection();
        if (newSelection && newSelection.rangeCount > 0) {
          lastKnownRange.current = newSelection.getRangeAt(0).cloneRange();
        }
      }

      setIsOpen(false);
    },
    [command, execCommand]
  );

  return (
    <Form
      enableReinitialize
      initialValues={{ color: activeColor ?? "" }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, form, values }) => {
        return (
          <ColorPicker
            // We feed ColorPicker directly from the local form state
            value={values.color}
            // When react-color changes (via drag or textbox), update the form state ONLY.
            // Do NOT touch the iframe yet!
            onChange={(newColor) => form.change("color", newColor)}
            showInput={false}
            container={getPopoverMountNode}
            onVisibilityChange={setIsOpen}
            isOpen={isOpen} // Pass the controlled open state down to the picker
          >
            {/* The Trigger Button */}
            {children(activeColor)}

            {/* The Apply Button Footer (Injected via children into the Popover) */}
            <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleSubmit()}
              >
                Apply
              </Button>
            </Box>
          </ColorPicker>
        );
      }}
    </Form>
  );
}
