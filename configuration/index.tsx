export default function PageBaseConfiguration() {
  return {
    title: "Patrick Arns",
    description: "Coming soon ...",
    baseUrl: new URL("https://arns.dev"),
    publisher: "Patrick Arns",
    supportedLocales: ["de", "en"],
    defaultLocale: "en",
    blogPostsPerPage: 5,
    startRoute: "/welcome",
  };
}
