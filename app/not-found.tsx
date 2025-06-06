import RootLayout from "@/components/layout/root-layout";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  openGraph: {
    type: "website",
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
  },
};

export default function NotFound() {
  return (
    <RootLayout>
      <div className="dark">
        <section className="bg-white dark:bg-gray-900">
          <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
            <div className="w-full lg:w-1/2">
              <p className="text-4xl font-extrabold text-blue-500 dark:text-blue-400">
                404
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
                Page not found
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Sorry, the page you are looking for doesn&apos;t exist.
              </p>

              <div className="mt-6 flex items-center gap-x-3">
                <Link
                  href="/"
                  className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>Go Home</span>
                </Link>

                <Link
                  href="/blog"
                  className="w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  Blog
                </Link>
              </div>
            </div>

            <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2">
              <Image
                className="w-full max-w-lg lg:mx-auto"
                src="/images/404.svg"
                alt="404"
                priority
                width={300}
                height={150}
              />
            </div>
          </div>
        </section>
      </div>
    </RootLayout>
  );
}
