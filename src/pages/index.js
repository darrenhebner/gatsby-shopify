import React from 'react';
import Link from 'gatsby-link';

const IndexPage = ({data}) => (
  <ul>
    {data.allProducts.edges.map(({node}) => {
      return (
        <li>
          {node.title} <Link to={`products/${node.handle}`}>View</Link>
        </li>
      );
    })}
  </ul>
);

export const query = graphql`
  query allProducts {
    allProducts {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
`;

export default IndexPage;
