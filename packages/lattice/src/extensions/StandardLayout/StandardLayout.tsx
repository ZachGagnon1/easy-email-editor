import { useEditorProps, useFocusIdx } from "@";
import React, { useEffect } from "react";
import { InteractivePrompt } from "../InteractivePrompt";
import { MergeTagBadgePrompt } from "@/extensions/MergeTagBadgePrompt";
import { EditPanel } from "../EditPanel";
import { ConfigurationPanel } from "@/extensions/ConfigurationPanel";
import {
  ExtensionProps,
  ExtensionProvider
} from "@/extensions/components/Providers/ExtensionProvider";
import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material";

export const StandardLayout: React.FC<Omit<ExtensionProps, "compact">> = (
  props
) => {
  const { height: containerHeight } = useEditorProps();
  const {
    showSourceCode = true,
    categories,
    jsonReadOnly = false,
    mjmlReadOnly = true,
  } = props;

  const theme = useTheme();
  const { setFocusIdx } = useFocusIdx();

  // Replaces the `compact` check: returns true on desktop (>=900px), false on mobile/tablet
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    // Replicates the exact behavior you had with !compact
    if (!isDesktop) {
      setFocusIdx("");
    }
  }, [isDesktop, setFocusIdx]);

  return (
    <ExtensionProvider {...props} categories={categories}>
      <Paper
        sx={{
          padding: 0,
          height: containerHeight,
          overflow: "hidden", // Keeps the layout contained
        }}
      >
        <Grid
          container
          sx={{
            height: "100%",
            // Stacks items on mobile, forces them onto one row on desktop
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          {/* LEFT PANEL: Editor Tools */}
          <Grid
            component="aside"
            aria-label="Editor Tools"
            size={{ xs: 12, md: 2.5 }} // Explicit size ensures it doesn't get crushed
            sx={{
              display: { xs: "none", md: "block" }, // Hides completely on mobile
              height: "100%",
              overflowY: "auto", // Allows independent scrolling if panel content gets long
            }}
          >
            <EditPanel />
          </Grid>

          {/* MIDDLE PANEL: Email Canvas */}
          <Grid
            component="main"
            aria-label="Email Canvas"
            size={{ xs: 12, md: 7 }} // 7/12 columns on desktop
            sx={{
              height: "100%",
              overflowY: "auto",
            }}
          >
            {props.children}
          </Grid>

          {/* RIGHT PANEL: Configuration Settings */}
          <Grid
            component="aside"
            aria-label="Configuration Settings"
            size={{ xs: 12, md: 2.5 }} // 3/12 columns on desktop (2 + 7 + 3 = 12 total columns)
            sx={{
              display: { xs: "none", md: "block" }, // Hides completely on mobile
              height: "100%",
              overflowY: "auto",
            }}
          >
            <ConfigurationPanel
              height={containerHeight}
              showSourceCode={showSourceCode}
              jsonReadOnly={jsonReadOnly}
              mjmlReadOnly={mjmlReadOnly}
            />
          </Grid>
        </Grid>
      </Paper>
      <InteractivePrompt />
      <MergeTagBadgePrompt />
    </ExtensionProvider>
  );
};
