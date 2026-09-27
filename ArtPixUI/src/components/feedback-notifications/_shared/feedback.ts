export type FeedbackSeverity = "info" | "success" | "warning" | "error";
export type FeedbackAnnouncement = "polite" | "assertive" | "off";

export const feedbackSymbols = {
  info: "M7 2h2v2H7z M6 6h3v6h2v2H5v-2h2V8H6z",
  success: "M1 7h3v3h3V7h3V4h3V1h2v5h-3v3H9v3H6v3H4v-3H1z",
  warning: "M7 1h2v2h2v3h2v3h2v6H1V9h2V6h2V3h2z M7 5v5h2V5z M7 12v2h2v-2z",
  error: "M2 1h3v3h3v3h3V4h3V1h2v5h-3v3h3v6h-3v-3h-3V9H7v3H4v3H1v-6h3V6H2z",
};
export const feedbackNames = { info: "Information", success: "Success", warning: "Warning", error: "Error" };

/** Urgency is caller-selected, never inferred from visual severity. */
export function feedbackAnnouncementProps(announcement: FeedbackAnnouncement) {
  return {
    role: announcement === "assertive" ? "alert" : announcement === "polite" ? "status" : undefined,
    "aria-live": announcement,
    "aria-atomic": announcement === "off" ? undefined : true,
  };
}
