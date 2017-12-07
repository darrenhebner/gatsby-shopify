import React from 'react';

export default ({data}) => {
  return <div>{data.products.title}</div>;
};

export const query = graphql`
  query ProductQuery($handle: String!) {
    products(handle: {eq: $handle}) {
      title
    }
  }
`;
