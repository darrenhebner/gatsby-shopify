import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  return (
    <div className="product-show">
      <h1>{data.products.title}</h1>
      <img
        style={{ maxWidth: "300px" }}
        src={data.products.images.edges[0].node.src}
      />
      <p>{data.products.description}</p>

      <Link to={`/`}>Back</Link>
    </div>
  );
};

export const query = graphql`
  query ProductQuery($handle: String!) {
    products(handle: { eq: $handle }) {
      title
      description
      images {
        edges {
          node {
            src
          }
        }
      }
    }
  }
`;
