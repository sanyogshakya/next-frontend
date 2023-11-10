import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const filters = await request.json();
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

    const response = await fetch(process.env.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
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
      }),
    });
    const { data } = await response.json();
    return NextResponse.json({
      posts: data.posts.nodes,
      total: data.posts.pageInfo.offsetPagination.total,
      postCategories: data.categories.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
}
