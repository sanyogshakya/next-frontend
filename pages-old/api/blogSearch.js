import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
  try {
    const filters = JSON.parse(req.body);
    let selectedCategories = filters.selectedCategories
      ? filters.selectedCategories.split(",")
      : [];

    let selectedCategoriesString = "";
    if (selectedCategories.length >= 1) {
      selectedCategoriesString = "categoryIn: [";
      selectedCategories.forEach((category, i) => {
        i === selectedCategories.length - 1
          ? (selectedCategoriesString += '"' + category + '"')
          : (selectedCategoriesString += '"' + category + '", ');
      });
      selectedCategoriesString += "],";
    }
    const currentPage = filters.page || 1;
    const pageSize = filters.pages ? currentPage * 3 : 3;

    const offset = filters.pages ? 0 : ((filters.page || 1) - 1) * 3;

    const { data } = await client.query({
      query: gql`
        query AllPostsQuery {
          posts(where: { ${selectedCategoriesString} offsetPagination: { offset: ${offset}, size: ${pageSize} } }) {
            nodes {
              databaseId
              title
              uri
              excerpt
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
          categories {
            nodes {
              name
              slug
              id
            }
          }
        }
      `,
    });
    return res.status(200).json({
      posts: data.posts.nodes,
      total: data.posts.pageInfo.offsetPagination.total,
      postCategories: data.categories.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

export default handler;
