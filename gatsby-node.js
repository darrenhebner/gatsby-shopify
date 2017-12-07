const path = require('path');

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
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
      }
    `).then(result => {
      result.data.allProducts.edges.map(({node}) => {
        createPage({
          path: `products/${node.handle}`,
          component: path.resolve(`./src/templates/product.js`),
          context: {
            handle: node.handle
          }
        });
      });
      resolve();
    });
  });
};
