export default function PageBaseConfiguration() {
  return {
    title: "Patrick-Arns.de",
    description: "Coming soon ...",
    baseUrl: new URL("https://patrick-arns.de"),
    publisher: "Patrick Arns",
    supportedLocales: ["de", "en"],
    defaultLocale: "en",
    blogPostsPerPage: 5,
    startRoute: "/welcome"
  };
}
