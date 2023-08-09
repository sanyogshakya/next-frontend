import { gql } from "@apollo/client";
import client from "client";
import { mapMainMenuItems } from "./mapMainMenuItems";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";

export const getPageStaticProps = async (context) => {
  const uri = context.params?.slug ? `/${context.params.slug.join("/")}/` : "/";
  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocks
          }
          ... on Post {
            id
            blocks
            title
          }
          ... on Book {
            id
            blocks
            title
          }
        }
        acfOptionsHeader {
          headerSettings {
            headerCtaButton {
              label
              destination {
                ... on Page {
                  uri
                }
              }
            }
            headerLogo {
              altText
              sourceUrl
              srcSet
            }
            menuItems {
              menuItem {
                label
                destination {
                  ... on Page {
                    uri
                  }
                }
                submenuItem {
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                  label
                }
              }
            }
          }
        }
        acfOptionsFooter {
          footerSettings {
            copyright
            footerLogo {
              altText
              sourceUrl
            }
            privacyPolicy {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
            socialIcons {
              socialIcon {
                altText
                sourceUrl
              }
              socialUrl
            }
            termsAndConditions {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  });
  return {
    props: {
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
      headerLogoImage:
        data.acfOptionsHeader.headerSettings.headerLogo.sourceUrl,
      mainMenuItems: mapMainMenuItems(
        data.acfOptionsHeader.headerSettings.menuItems
      ),
      callToActionLabel:
        data.acfOptionsHeader.headerSettings.headerCtaButton.label,
      callToActionDestination:
        data.acfOptionsHeader.headerSettings.headerCtaButton.destination.uri,
      footerLogo: data.acfOptionsFooter.footerSettings.footerLogo,
      copyright: data.acfOptionsFooter.footerSettings.copyright,
      termsAndConditions:
        data.acfOptionsFooter.footerSettings.termsAndConditions,
      privacyPolicy: data.acfOptionsFooter.footerSettings.privacyPolicy,
      socialIcons: data.acfOptionsFooter.footerSettings.socialIcons,
    },
  };
};
