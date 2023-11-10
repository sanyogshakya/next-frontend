import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const keyword = body.searchKeyword ? body.searchKeyword : "";
    const offset = body.pages ? 0 : ((body.page || 1) - 1) * 3;
    const currentPage = body.page || 1;
    const pageSize = body.pages ? currentPage * 3 : 3;

    const response = await fetch(process.env.WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query searchQuery {
          contentNodes(
            where: { search: "${keyword}", offsetPagination: { offset: ${offset}, size: ${pageSize} } }
          ) {
            nodes {
              ... on Book {
                title
                uri
                id
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
                contentType {
                  node {
                    name
                  }
                }
              }
              ... on Post {
                title
                uri
                id
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
                contentType {
                  node {
                    name
                  }
                }
              }
              ... on Page {
                title
                uri
                id
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
                contentType {
                  node {
                    name
                  }
                }
              }
            }
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
      `,
      }),
    });

    const { data } = await response.json();
    return NextResponse.json({
      results: data.contentNodes.nodes,
      total: data.contentNodes.pageInfo.offsetPagination.total,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
}
