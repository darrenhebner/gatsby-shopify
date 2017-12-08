import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styles from './index.module.css';

export default ({data, shopifyClient}) => {
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

      <Img
        className={styles.product__image}
        resolutions={data.productImage.resolutions}
      />

      <p className={styles.product__description}>{data.products.description}</p>

      <Link to={`/`} className={styles.back}>
        Back
      </Link>
    </div>
  );
};

function handleBuyNow(product, shopifyClient) {
  setCheckoutLoading();

  shopifyClient.checkout
    .create()
    .then(checkout => {
      const {id} = checkout;
      const lineItemsToAdd = [
        {variantId: product.variants.edges[0].node.id, quantity: 1}
      ];

      // Add an item to the checkout
      shopifyClient.checkout.addLineItems(id, lineItemsToAdd).then(checkout => {
        const {webUrl} = checkout;
        // Redirect the user to the checkout URL
        window.location = webUrl;
      });
    })
    .catch(() => {
      resetCheckoutLoading();
      alert('Something went wrong with the checkout. Try again later.');
    });
}

function setCheckoutLoading() {
  const buyButton = document.querySelector('#buy-btn');
  buyButton.innerHTML = 'Loading...';
  buyButton.style.cursor = 'not-allowed';
}

function resetCheckoutLoading() {
  const buyButton = document.querySelector('#buy-btn');
  buyButton.innerHTML = 'Buy Now';
  buyButton.style.cursor = 'default';
}

export const query = graphql`
  query ProductQuery($handle: String!, $imageRegEx: String!) {
    productImage: imageSharp(id: {regex: $imageRegEx}) {
      resolutions(width: 300, height: 300) {
        ...GatsbyImageSharpResolutions_tracedSVG
      }
    }
    products(handle: {eq: $handle}) {
      title
      description
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
