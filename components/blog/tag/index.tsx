import Translate from "@/components/translate";
import Link from "next/link";

const tagColors = {
  blue: {
    bgColor: "bg-blue-100",
    color: "text-blue-800",
    border: "border-blue-400",
    darkColor: "dark:text-blue-400",
    darkBgColor: "dark:bg-gray-700",
  },
  red: {
    bgColor: "bg-red-100",
    color: "text-red-800",
    border: "border-red-400",
    darkColor: "dark:text-red-400",
    darkBgColor: "dark:bg-gray-700",
  },
  green: {
    bgColor: "bg-green-100",
    color: "text-green-800",
    border: "border-green-400",
    darkColor: "dark:text-green-400",
    darkBgColor: "dark:bg-gray-700",
  },
  yellow: {
    bgColor: "bg-yellow-100",
    color: "text-yellow-800",
    border: "border-yellow-400",
    darkColor: "dark:text-yellow-400",
    darkBgColor: "dark:bg-gray-700",
  },
  indigo: {
    bgColor: "bg-indigo-100",
    color: "text-indigo-800",
    border: "border-indigo-400",
    darkColor: "dark:text-indigo-400",
    darkBgColor: "dark:bg-gray-700",
  },
  purple: {
    bgColor: "bg-purple-100",
    color: "text-purple-800",
    border: "border-purple-400",
    darkColor: "dark:text-purple-400",
    darkBgColor: "dark:bg-gray-700",
  },
  orange: {
    bgColor: "bg-orange-100",
    color: "text-orange-800",
    border: "border-orange-400",
    darkColor: "dark:text-orange-400",
    darkBgColor: "dark:bg-gray-700",
  },
  teal: {
    bgColor: "bg-teal-100",
    color: "text-teal-800",
    border: "border-teal-400",
    darkColor: "dark:text-teal-400",
    darkBgColor: "dark:bg-gray-700",
  },
  cyan: {
    bgColor: "bg-cyan-100",
    color: "text-cyan-800",
    border: "border-cyan-400",
    darkColor: "dark:text-cyan-400",
    darkBgColor: "dark:bg-gray-700",
  },
  lime: {
    bgColor: "bg-lime-100",
    color: "text-lime-800",
    border: "border-lime-400",
    darkColor: "dark:text-lime-400",
    darkBgColor: "dark:bg-gray-700",
  },
};

function getTagColor(tag: string): string {
  // Hash the tag string to get a consistent color
  const hashCode = tag
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorNames = Object.keys(tagColors);
  const colorIndex = hashCode % colorNames.length;
  return colorNames[colorIndex];
}

interface TagProps {
  tag: string;
  href: string;
  locale: string;
}

export default function Tag({ tag, href, locale }: TagProps) {
  const color: string = getTagColor(tag);
  const config = tagColors[color as keyof typeof tagColors];

  return (
    <Link
      href={href}
      className={`
        inline-block rounded ${config.border} ${config.bgColor} px-2.5 py-0.5 text-xs font-medium ${config.color} ${config.darkBgColor} ${config.darkColor}
      `}
    >
      <Translate id={tag} locale={locale} ns={"tags"} />
    </Link>
  );
}
