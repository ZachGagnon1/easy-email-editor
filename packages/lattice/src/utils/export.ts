import mjml from "mjml-browser";
import { JsonToMjml } from "@/core/utils/JsonToMjml";
import { IEmailTemplate } from "@/typings";

/**
 * Converts the email template state into a raw MJML string.
 */
export function exportToMjml(template: IEmailTemplate): string {
  return JsonToMjml({
    data: template.content,
    mode: "production",
    context: template.content,
  });
}

/**
 * Converts the email template state into production-ready HTML.
 */
export function exportToHtml(template: IEmailTemplate): string {
  const mjmlString = exportToMjml(template);
  return mjml(mjmlString).html;
}

/**
 * Converts the email template state into a JSON string.
 */
export function exportToJson(template: IEmailTemplate): string {
  return JSON.stringify(template, null, 2);
}

/**
 * Triggers a browser download for the provided content.
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
