export const fetchGraphQL = async function (
  query: string,
  variables?: any,
  preview = false,
) {
  const requestBody: { query: string; variables?: any } = { query };

  if (variables) {
    requestBody.variables = variables;
  }

  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify(requestBody),
      next: {
        revalidate: process.env.NODE_ENV === "development" ? 10 : 60 * 60 * 6, // 6H Cache Time
        tags: ["contentful"],
      },
    },
  ).then((response) => response.json());
};
