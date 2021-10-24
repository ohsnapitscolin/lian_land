import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: node => {
      return (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {node.content[0].value}
        </a>
      );
    }
  }
};

export default raw => {
  return documentToReactComponents(JSON.parse(raw), options);
};
