"use client";

export default function DateRenderer({
  date,
  locale,
  format,
}: {
  date: Date;
  locale?: string;
  format?: "short" | "long";
}) {
  const regionalLocale = locale === "en" ? "en-US" : locale;

  if (format === "long")
    return (
      <>
        {date.toLocaleDateString(regionalLocale, {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })}
      </>
    );

  if (regionalLocale) return date.toLocaleDateString(regionalLocale);

  return date.toLocaleDateString();
}
