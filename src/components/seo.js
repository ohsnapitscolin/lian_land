import React from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

class SEO extends React.Component {
  render() {
    const data = this.props.data.allContentfulSeo.edges[0].node;

    const title = data.title;
    const description = data.description;
    const imageUrl = data.image.file.url;
    const imgWidth = data.image.file.details.image.width;
    const imgHeight = data.image.file.details.image.height;
    const pageUrl = "https://lian.land";

    return (
      <Helmet
        title={title}
        defaultTitle={title}
        meta={[
          { name: `description`, content: description },
          { name: "image", content: imageUrl },
          { name: "author", content: "Lian Fumerton-Liu" },
          { name: "keywords", content: "Lian Fumteron-Liu" },

          { property: "og:title", content: title },
          { property: "og:description", content: description },
          { property: "og:image", content: imageUrl },
          { property: "og:image:width", content: imgWidth },
          { property: "og:image:height", content: imgHeight },
          { property: "og:locale", content: "en_US" },
          { property: "og:type", content: "website" },
          { property: "og:site_name", content: title },
          { property: "og:url", content: pageUrl },

          { name: "twitter:title", content: title },
          { name: "twitter:description", content: description },
          { name: "twitter:image", content: imageUrl },
          { name: "twitter:card", content: "summary_large_image" },
        ]}
      />
    )
  }
}

export default props => (
  <StaticQuery
    query={query}
    render={data => <SEO {...props} data={data} />}
  />
);

const query = graphql`
  query {
    allContentfulSeo {
      edges {
        node {
          title
          description
          image {
            file {
              details {
               image {
                 width
                 height
               }
              }
              url
            }
          }
        }
      }
    }
  }
`
