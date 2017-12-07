const fetch = require('node-fetch');
const crypto = require('crypto');

exports.sourceNodes = async ({boundActionCreators}) => {
  const {createNode} = boundActionCreators;

  function processDatum(datum) {
    datum.id = datum.id.toString();
    return {
      ...datum,
      parent: null,
      children: [],
      internal: {
        type: 'product',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(datum))
          .digest(`hex`)
      }
    };
  }

  const data = await fetch(
    'https://darrens-fake-furniture.myshopify.com/products.json'
  )
    .then(data => data.json())
    .then(data => data.products);

  data.forEach(datum => createNode(processDatum(datum)));

  return;
};
