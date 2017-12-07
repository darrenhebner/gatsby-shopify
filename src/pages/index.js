import React from 'react';
import Link from 'gatsby-link';

const IndexPage = ({data}) => (
  <ul>
    {data.allProducts.edges.map(({node}) => {
      return <li>{node.title}</li>;
    })}
  </ul>
);

export const query = graphql`
  query allProducts {
    allProducts {
      edges {
        node {
          title
        }
      }
    }
  }
`;

export default IndexPage;
