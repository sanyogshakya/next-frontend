import { mapMainMenuItems } from "./mapMainMenuItems";

export const getMenu = async () => {
  const params = {
    query: `
      query HeaderQuery {
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
  };

  const response = await fetch(process.env.WP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  const { data } = await response.json();
  return {
    headerLogoImage: data.acfOptionsHeader.headerSettings.headerLogo.sourceUrl,
    mainMenuItems: mapMainMenuItems(
      data.acfOptionsHeader.headerSettings.menuItems
    ),
    callToActionLabel:
      data.acfOptionsHeader.headerSettings.headerCtaButton.label,
    callToActionDestination:
      data.acfOptionsHeader.headerSettings.headerCtaButton.destination.uri,
    footerLogo: data.acfOptionsFooter.footerSettings.footerLogo,
    copyright: data.acfOptionsFooter.footerSettings.copyright,
    termsAndConditions: data.acfOptionsFooter.footerSettings.termsAndConditions,
    privacyPolicy: data.acfOptionsFooter.footerSettings.privacyPolicy,
    socialIcons: data.acfOptionsFooter.footerSettings.socialIcons,
  };
};
