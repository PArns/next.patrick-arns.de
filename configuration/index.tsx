export default function PageBaseConfiguration() {
  return {
    title: "Patrick Arns",
    description: "Coming soon ...",
    baseUrl: new URL("https://arns.dev"),
    publisher: "Patrick Arns",
    supportedLocales: ["de", "en"],
    defaultLocale: "en",
    blogPostsPerPage: 5,
    redirects: {
      "/": "/{lng}/welcome",
      "/en": "/en/welcome",
      "/de": "/de/welcome",
      "/coaster": "/{lng}/coaster",
      "/pictures": "/{lng}/pictures",
      "/blog": "/{lng}/blog",
      "/me": "/{lng}/me",
      "/welcome": "/{lng}/welcome",
    }
  };
}
