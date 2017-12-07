const fetch = require('node-fetch');

exports.sourceNodes = async ({boundActionCreators}) => {
  const {createNode} = boundActionCreators;

  function processDatum(datum) {
    datum.id = datum.id.toString();
    return datum;
  }

  const data = await fetch(
    'https://darrens-fake-furniture.myshopify.com/products.json'
  )
    .then(data => data.json())
    .then(data => data.products);

  data.forEach(datum => createNode(processDatum(datum)));

  return;
};
