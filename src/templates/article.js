import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  return (
    <div className="article-show">
      <h1>{data.articles.title}</h1>
      <img src={data.articles.image.src} alt={data.articles.image.altText} />
      <p>{data.articles.content}</p>

      <Link to={`/`}>Back</Link>
    </div>
  );
};

export const query = graphql`
  query ArticleQuery($id: String!) {
    articles(id: { eq: $id }) {
      title
      content
      image {
        altText
        src
      }
    }
  }
`;
