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
      cache: "force-cache",
      next: { tags: ["articles"] },
    },
  ).then((response) => response.json());
};
