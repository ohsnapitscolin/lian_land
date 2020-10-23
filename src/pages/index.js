import React from "react"
import { graphql } from "gatsby";

import Layout from "../components/layout"
import Work from "../components/work";
import Hero from "../components/hero";

export default class IndexPage extends React.Component {
  render() {
    const workPages =
      this.props.data.allContentfulWorkPages.edges[0].node.pages;
    const hero = this.props.data.allContentfulHero.edges[0].node;

    return (
      <Layout data={this.props.data}>
        <Hero
          mainText={hero.mainText}
          subText={hero.subText}
          image={hero.image}
        />
        {workPages.map((work) => {
          return(
            <Work
              key={work.title}
              title={work.title}
              type={work.type}
              doodle={work.doodle}
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

export const query = graphql`
  query PortfolioQuery {
    allContentfulWorkPages {
      edges {
        node {
          pages {
            title
            type
            doodle {
              fixed {
                ...GatsbyContentfulFixed_withWebp_noBase64
              }
            }
            year
            images {
              description
              fluid(maxWidth: 1200, quality: 100) {
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
            description
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
            childMarkdownRemark {
              html
            }
          }
          image {
            description
            fluid(maxWidth: 1840, quality: 100) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`
