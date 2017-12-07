import React from "react";
import Link from "gatsby-link";

import styles from "./index.module.css";

export default ({ data }) => {
  return (
    <div className="article-show">
      <h2 className={styles.article__title}>{data.articles.title}</h2>
      <span className={styles.article__author}>
        By {data.articles.author.firstName} {data.articles.author.LastName}
      </span>
      <img src={data.articles.image.src} alt={data.articles.image.altText} />
      <p className={styles.article__content}>{data.articles.content}</p>

      <Link to={`/`} className={styles.back}>
        Back
      </Link>
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
      author {
        firstName
        lastName
      }
    }
  }
`;
