import { getIframeDocument } from "@/utils/getEditorRoot";

export const getBlockNodes = () =>
  Array.from(getIframeDocument()?.querySelectorAll(".email-block") || []);
