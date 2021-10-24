import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Work from "../components/work";
import Hero from "../components/hero";

export default class IndexPage extends React.Component {
  render() {
    const workPages = this.props.data.allContentfulWorkPages.edges[0].node
      .pages;
    const hero = this.props.data.allContentfulHero.edges[0].node;

    return (
      <Layout data={this.props.data}>
        <Hero
          mainText={hero.mainText}
          subText={hero.subText}
          image={hero.image}
        />
        {workPages.map(work => {
          return (
            <Work
              key={work.title}
              title={work.title}
              type={work.type}
              doodle={work.doodle}
              year={work.year}
              entries={work.entries}
              description={work.description}
              credits={work.credits}
            />
          );
        })}
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
              gatsbyImageData(width: 80, placeholder: NONE)
            }
            year
            entries {
              image {
                description
                gatsbyImageData(layout: FULL_WIDTH)
              }
              video {
                source {
                  file {
                    url
                  }
                }
              }
            }
            description {
              raw
            }
            credits {
              raw
            }
          }
        }
      }
    }
    allContentfulHero {
      edges {
        node {
          mainText {
            raw
          }
          subText {
            raw
          }
          image {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
    allContentfulFooter {
      edges {
        node {
          contactText {
            raw
          }
          aboutText {
            raw
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
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;
