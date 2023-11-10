import { gql } from "@apollo/client";
import client from "client";

const handler = async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    const keyword = body.searchKeyword ? body.searchKeyword : "";
    const offset = body.pages ? 0 : ((body.page || 1) - 1) * 3;
    const currentPage = body.page || 1;
    const pageSize = body.pages ? currentPage * 3 : 3;
    const { data } = await client.query({
      query: gql`
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
    });
    return res.status(200).json({
      results: data.contentNodes.nodes,
      total: data.contentNodes.pageInfo.offsetPagination.total,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

export default handler;
