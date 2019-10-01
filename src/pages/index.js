import React from "react"
import { graphql } from "gatsby";

import Layout from "../components/layout"
import Work from "../components/work";
import Hero from "../components/hero";

export default class IndexPage extends React.Component {
  render() {
    const workPages = this.props.data.allContentfulWorkPage.edges;
    const hero = this.props.data.allContentfulHero.edges[0].node;

    return (
      <Layout data={this.props.data}>
        <Hero
          mainText={hero.mainText}
          subText={hero.subText}
          image={hero.image}
        />
        {workPages.map((workEdge) => {
          const work = workEdge.node;
          return(
            <Work
              key={work.title}
              title={work.title}
              type={work.type}
              year={work.year}
              images={work.images}
              description={work.description}
              credits={work.credits}
            />
          )})}
      </Layout>
    );
  }
}
// export default ({ data }) => (
//   const work = data.allContentfulWorkPage.edges.node[0];
//     <Work
//       title={work.title}
//       type={work.allContentfulWorkPage.type}
//     />
//   );

export const query = graphql`
  query PortfolioQuery {
    allContentfulWorkPage {
      edges {
        node {
          title
          type
          year
          images {
            fluid(maxWidth: 1840, quality: 100) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          description {
            json
          }
          credits {
            json
          }
        }
      }
    }
    allContentfulHero {
      edges {
        node {
          mainText {
            json
          }
          subText {
            json
          }
          image {
            fluid(maxWidth: 1840, quality: 100) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
      }
    }
    allContentfulFooter {
      edges {
        node {
          contactText {
            json
          }
          aboutText {
            json
          }
        }
      }
    }
    allContentfulCredits {
      edges {
        node {
          text {
            json
          }
          image {
            fluid(maxWidth: 1840, quality: 100) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`
