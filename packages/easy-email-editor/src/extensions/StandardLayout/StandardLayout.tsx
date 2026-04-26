import { useEditorProps, useFocusIdx } from "easy-email-editor";
import React, { useEffect } from "react";
import { InteractivePrompt } from "../InteractivePrompt";
import { MergeTagBadgePrompt } from "@/extensions/MergeTagBadgePrompt";
import { EditPanel } from "../EditPanel";
import { ConfigurationPanel } from "@/extensions/ConfigurationPanel";
import {
  ExtensionProps,
  ExtensionProvider,
} from "@/extensions/components/Providers/ExtensionProvider";
import { AdvancedType } from "easy-email-core";
import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material";

const defaultCategories: ExtensionProps["categories"] = [
  {
    get label() {
      return t("Content");
    },
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: "0px 0px 0px 0px" } },
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
    ],
  },
  {
    get label() {
      return t("Layout");
    },
    active: true,
    displayType: "column",
    blocks: [
      {
        get title() {
          return t("2 columns");
        },
        payload: [
          ["50%", "50%"],
          ["33%", "67%"],
          ["67%", "33%"],
          ["25%", "75%"],
          ["75%", "25%"],
        ],
      },
      {
        get title() {
          return t("3 columns");
        },
        payload: [
          ["33.33%", "33.33%", "33.33%"],
          ["25%", "25%", "50%"],
          ["50%", "25%", "25%"],
        ],
      },
      {
        get title() {
          return t("4 columns");
        },
        payload: [["25%", "25%", "25%", "25%"]],
      },
    ],
  },
];

export const StandardLayout: React.FC<Omit<ExtensionProps, "compact">> = (
  props
) => {
  const { height: containerHeight } = useEditorProps();
  const {
    showSourceCode = true,
    categories = defaultCategories,
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
