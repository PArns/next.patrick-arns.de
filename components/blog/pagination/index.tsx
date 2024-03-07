import Link from "next/link";
import classNames from "classnames";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

function getLinkForPage(
  baseUrl: string,
  paginationSlug: string,
  pageNumber: number,
) {
  const firstPage = pageNumber == 1;

  if (firstPage) return baseUrl;
  return `${baseUrl}/${paginationSlug}/${pageNumber}`;
}

function PageLink({
  baseUrl,
  paginationSlug,
  pageNumber,
  current,
}: {
  baseUrl: string;
  paginationSlug: string;
  pageNumber: number;
  current: boolean;
}) {
  const className = classNames(
    "relative inline-flex items-center px-4 py-2 text-sm text-neutral-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
    {
      "bg-sky-500/90 font-bold focus-visible:outline-sky-600 text-neutral-100 hover:text-neutral-900":
        current,
      "bg-gray-50/60 font-semibold": !current,
    },
  );

  return (
    <Link
      href={getLinkForPage(baseUrl, paginationSlug, pageNumber)}
      aria-current="page"
      className={className}
    >
      {pageNumber}
    </Link>
  );
}

export default function Pagination({
  baseUrl,
  paginationSlug,
  pageCount,
  currentPage,
  className,
}: {
  baseUrl: string;
  paginationSlug: string;
  pageCount: number;
  currentPage: number;
  className?: string;
}) {
  let previousLink: string = "";
  let nextLink: string = "";

  const firstPage = currentPage == 1;
  const lastPage = currentPage == pageCount;

  if (!firstPage) {
    previousLink = getLinkForPage(baseUrl, paginationSlug, currentPage - 1);
  }

  if (!lastPage) {
    nextLink = getLinkForPage(baseUrl, paginationSlug, currentPage + 1);
  }

  const pageLinks = [];

  for (var i = 1; i <= pageCount; i++) {
    pageLinks.push(
      <PageLink
        key={`page-${i}`}
        baseUrl={baseUrl}
        paginationSlug={paginationSlug}
        pageNumber={i}
        current={currentPage == i}
      />,
    );
  }

  return (
    <div className={className}>
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <Link
          href={previousLink}
          className="aria-disabled:hover-none relative inline-flex items-center rounded-l-md bg-gray-50/60 px-2 py-2 text-neutral-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 aria-disabled:pointer-events-none"
          aria-disabled={firstPage}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </Link>

        {pageLinks}

        <Link
          href={nextLink}
          className="aria-disabled:hover-none relative inline-flex items-center rounded-r-md bg-gray-50/60 px-2 py-2 text-neutral-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 aria-disabled:pointer-events-none"
          aria-disabled={lastPage}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
}
