import React from "react";
import Link from "gatsby-link";

const ArticleIndex = ({ data }) => (
  <ul style={{ margin: 0 }}>
    {data.allArticles.edges.map(({ node }) => (
      <li>
        {node.title}{" "}
        <Link to={`articles/${createHandleForTitle(node.title)}`}>View</Link>
      </li>
    ))}
  </ul>
);

function createHandleForTitle(title) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export const query = graphql`
  query articlesIndex {
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

export default ArticleIndex;
