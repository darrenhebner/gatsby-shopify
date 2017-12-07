import React from 'react';
import Link from 'gatsby-link';

const ProductIndex = ({data}) => (
  <ul>
    {data.allProducts.edges.map(({node}) => (
      <li>
        {node.title} <Link to={`products/${node.handle}`}>View</Link>
      </li>
    ))}
  </ul>
);

export const query = graphql`
  query productIndex {
    allProducts {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

export default ProductIndex;
