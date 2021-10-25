import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function ImageSlide({ image }) {
  return (
    <GatsbyImage
      image={getImage(image) || ""}
      alt={image.description}
      loading="lazy"
    />
  );
}
