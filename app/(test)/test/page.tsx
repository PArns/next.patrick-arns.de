// pages/index.tsx
import React from "react";
import client from "@/api/client";
import { TypeBackgroundImagesSkeleton } from "@/api/types";

import ContentfulImageAsset from "@/components/contentful/image-asset";

export default async function TestPage() {
  const backgroundImages = await getStaticProps();

  return (
    <div>
      {backgroundImages.map((image, index) => (
        <div key={index}>
          <h2>{image.fields.name}</h2>
          <p>Image: {JSON.stringify(image.fields.image)}</p>
          <p><ContentfulImageAsset asset={image.fields.image} width={200} height={200}/></p>
          <p>Position: {image.fields.position}</p>
        </div>
      ))}
    </div>
  );
}

async function getStaticProps() {
  const response = await client.getEntries<TypeBackgroundImagesSkeleton>({
    content_type: "backgroundImages"
  });

  return response.items;
}
