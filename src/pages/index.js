import React from "react";
import Link from "gatsby-link";

const IndexPage = ({ data }) => (
  <div className="index-page">
    <div className="top-sellers-products">
      <h1>Top Sellers</h1>
      <ul>
        {data.allProducts.edges.map(({ node }) => {
          return (
            <li key={node.id}>
              {node.title} <Link to={`products/${node.handle}`}>View</Link>
            </li>
          );
        })}
      </ul>
    </div>
    <div className="latest-articles">
      <h1>Latest Articles</h1>
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
