import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
  try {
    const filters = JSON.parse(req.body);
    const offset = filters.pages ? 0 : ((filters.page || 1) - 1) * 3;
    let genreFilter = ``;
    let minPriceFilter = ``;
    let maxPriceFilter = ``;

    if (filters.genre) {
      genreFilter = `
      taxArray: {taxonomy: GENRE, terms: "${filters.genre}", operator: IN, field: SLUG}
      `;
    }
    if (filters.minPrice) {
      minPriceFilter = `
      {
        compare: GREATER_THAN_OR_EQUAL_TO, 
        key: "price", 
        value: "${filters.minPrice}",
        type: NUMERIC
      }
      `;
    }
    if (filters.maxPrice) {
      maxPriceFilter = `
      {
        compare: LESS_THAN_OR_EQUAL_TO, 
        key: "price", 
        value: "${filters.maxPrice}",
        type: NUMERIC
      }
      `;
    }
    const { data } = await client.query({
      query: gql`
        query AllBooksQuery {
          books(where: 
            { 
              taxQuery: {relation: AND, ${genreFilter}}, 
              offsetPagination: { offset: ${offset}, size: 3 },
              metaQuery: {
                relation: AND, 
                metaArray: [
                  ${minPriceFilter}
                  ${maxPriceFilter}
                ]
              }
            }
              ) {
            nodes {
              databaseId
              title
              uri
              bookDetails {
                author
                description
                price
                publishYear
              }
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              genres {
                nodes {
                  id
                  slug
                  name
                }
              }
            }
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
          genres {
            nodes {
              id
              slug
              name
            }
          }
        }
      `,
    });
    return res.status(200).json({
      books: data.books.nodes,
      total: data.books.pageInfo.offsetPagination.total,
      genres: data.genres.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

export default handler;
