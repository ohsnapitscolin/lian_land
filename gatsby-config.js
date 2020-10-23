require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Lian Land`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: 'src/images/ic_cursor.png'
      },
    },
    {
      resolve: `gatsby-source-contentful`,
       options: {
         spaceId: process.env.CONTENTFUL_SPACE_ID,
         accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
       },
     },
     {
       resolve: `gatsby-plugin-styled-components`,
        options: {
          displayName: false
        },
      },
     {
       resolve: `gatsby-transformer-remark`,
         options: {
          plugins: [],
        },
      },
      {
        resolve: "gatsby-plugin-sass",
        options: {
          includePaths: [],
        },
      },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
