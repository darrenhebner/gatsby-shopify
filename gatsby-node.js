const path = require("path");

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allProducts {
          edges {
            node {
              handle
            }
          }
        }
        allArticles {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `).then(result => {
      // Create product pages
      result.data.allProducts.edges.map(({ node }) => {
        createPage({
          path: `products/${node.handle}`,
          component: path.resolve(`./src/templates/product.js`),
          context: {
            handle: node.handle
          }
        });
      });

      // Create articles pages
      result.data.allArticles.edges.map(({ node }) => {
        createPage({
          path: `articles/${createHandleForTitle(node.title)}`,
          component: path.resolve(`./src/templates/article.js`),
          context: {
            id: node.id
          }
        });
      });

      resolve();
    });
  });
};

// TODO: Create reusable helper (also defined in index.js)
function createHandleForTitle(title) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
