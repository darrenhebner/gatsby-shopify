import React from "react";
import Link from "gatsby-link";

import styles from "./index.module.css";

export default ({ data, shopifyClient }) => {
  return (
    <div className="product-show">
      <h2 className={styles.product__title}>{data.products.title}</h2>

      <span className={styles.product__price}>
        ${data.products.variants.edges[0].node.price}
      </span>

      <button
        id="buy-btn"
        className={styles.product__buy}
        onClick={() => handleBuyNow(data.products, shopifyClient)}
      >
        Buy Now
      </button>

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

function handleBuyNow(product, shopifyClient) {
  console.log("will buy ", product, shopifyClient);
  setCheckoutLoading();

  shopifyClient.checkout
    .create()
    .then(checkout => {
      const { id } = checkout;
      const lineItemsToAdd = [
        { variantId: product.variants.edges[0].node.id, quantity: 1 }
      ];

      // Add an item to the checkout
      shopifyClient.checkout.addLineItems(id, lineItemsToAdd).then(checkout => {
        const { webUrl } = checkout;
        // Redirect the user to the checkout URL
        window.location = webUrl;
      });
    })
    .catch(() => {
      resetCheckoutLoading();
      alert("Something went wrong with the checkout. Try again later.");
    });
}

function setCheckoutLoading() {
  const buyButton = document.querySelector("#buy-btn");
  buyButton.innerHTML = "Loading...";
  buyButton.style.cursor = "not-allowed";
}

function resetCheckoutLoading() {
  const buyButton = document.querySelector("#buy-btn");
  buyButton.innerHTML = "Buy Now";
  buyButton.style.cursor = "default";
}

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
            id
            price
          }
        }
      }
    }
  }
`;
