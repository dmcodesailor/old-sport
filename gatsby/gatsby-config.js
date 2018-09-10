// Optionally pull in environment variables
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Gatsby Janky Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'queries',
        path: `${__dirname}/src/queries/`,
      },
    },
    {
      resolve: '@wyze/gatsby-source-graphql',
      options: {
        url: 'http://localhost:4000/',
      },
    },
  ],
}

// url: 'https://api-euwest.graphcms.com/v1/cjjr1at6d0xb801c3scjrm0l0/master',
