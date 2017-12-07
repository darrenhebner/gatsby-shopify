module.exports = {
  siteMetadata: {
    title: `Gatsby Shop`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-shopify`,
      options: {
        storeName: 'darrens-fake-furniture',
        accessToken: 'f4981146ae241b7d80ea034e83787115'
      }
    }
  ]
};
