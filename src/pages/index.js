import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";

import styles from "./index.module.css";

const IndexPage = ({ data }) => (
  <div className="index-page">
    <div className={styles.hero}>
      <Img
        resolutions={data.heroImage.resolutions}
        className={styles.heroImage}
        alt="Gatsby Store"
      />
      <div className={styles.heroOverlay}>
        <p>The best furniture for your house</p>
      </div>
    </div>

    <div className={styles.topSellers}>
      <h2>Top Sellers</h2>
      <ul>
        {data.allProducts.edges.map(({ node }) => {
          return (
            <li key={node.id}>
              <img
                className={styles.productImage}
                src={node.images.edges[0].node.src}
              />
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
              <span className={styles.articleName}>{node.title}</span>
              <span className={styles.articleAuthor}>
                by&nbsp;{node.author.firstName}&nbsp;{node.author.lastName}
              </span>
              <Link
                className={styles.readArticle}
                to={`articles/${createHandleForTitle(node.title)}`}
              >
                Read
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
  query storeData {
    heroImage: imageSharp(id: { regex: "/hero/" }) {
      resolutions(width: 999, height: 450) {
        ...GatsbyImageSharpResolutions_tracedSVG
      }
    }
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
          author {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export default IndexPage;
