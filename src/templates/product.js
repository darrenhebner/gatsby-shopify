import React from "react";
import Link from "gatsby-link";

import styles from "./index.module.css";

export default ({ data }) => {
  return (
    <div className="product-show">
      <h2 className={styles.product__title}>{data.products.title}</h2>

      <span className={styles.product__price}>
        ${data.products.variants.edges[0].node.price}
      </span>

      <img
        className={styles.product__image}
        src={data.products.images.edges[0].node.src}
      />
      <p className={styles.product__description}>{data.products.description}</p>

      <Link to={`/`} className={styles.back}>
        Back
      </Link>
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
      variants {
        edges {
          node {
            price
          }
        }
      }
    }
  }
`;
