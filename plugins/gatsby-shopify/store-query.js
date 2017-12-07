module.exports = `
    {
        shop {
            name
            products(first: 250) {
                edges {
                    node {
                        id
                        title
                        description
                        createdAt
                        handle
                        onlineStoreUrl
                        productType
                        publishedAt
                        updatedAt
                        vendor
                    }
                }
            }
            articles(first: 250) {
                edges {
                    node {
                        id
                        author {
                            firstName
                            lastName
                        }
                        title
                        content
                        contentHtml
                        excerpt
                        image {
                            altText
                            src
                        }
                        publishedAt
                        tags
                        url
                    }
                }
            }
        }
    }
`;
