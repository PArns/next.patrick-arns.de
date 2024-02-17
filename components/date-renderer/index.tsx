"use client";

export default function DateRenderer({ date }: { date: Date }) {
  return <>{date.toLocaleDateString()}</>;
}
