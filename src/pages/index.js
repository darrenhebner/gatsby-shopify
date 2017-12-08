import React from "react";
import Link from "gatsby-link";

import styles from "./index.module.css";

const IndexPage = ({ data }) => (
  <div className="index-page">
    <div className={styles.topSellers}>
      <h2>Top Sellers</h2>
      <ul>
        {data.allProducts.edges.map(({ node }) => {
          return (
            <li key={node.id}>
              <img src={node.images.edges[0].node.src} />
              <span className={styles.productName}>{node.title}</span>
              <Link
                className={styles.viewProduct}
                to={`products/${node.handle}`}
              >
                View
              </Link>
            </li>
          );
        })}
      </ul>
    </div>

    <div className={styles.latestArticles}>
      <h2>Latest Articles</h2>
      <ul>
        {data.allArticles.edges.map(({ node }) => {
          return (
            <li key={node.id}>
              {node.title}&nbsp;
              <Link to={`articles/${createHandleForTitle(node.title)}`}>
                View
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

function createHandleForTitle(title) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export const query = graphql`
  query allProducts {
    allProducts {
      edges {
        node {
          id
          title
          handle
          images {
            edges {
              node {
                src
              }
            }
          }
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
`;

export default IndexPage;
