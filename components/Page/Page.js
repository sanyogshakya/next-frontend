import { BlockRenderer } from "components/BlockRenderer";
import { Footer } from "components/Footer";
import { Header } from "components/Header";

export const Page = (props) => {
  console.log(props);
  return (
    <div>
      <Header
        headerLogoImage={props.headerLogoImage}
        items={props.mainMenuItems}
        callToActionLabel={props.callToActionLabel}
        callToActionDestination={props.callToActionDestination}
      />
      <main className="main">
        <BlockRenderer
          blocks={props.blocks}
          postCategories={props.postCategories}
        />
      </main>
      <Footer
        footerLogo={props.footerLogo}
        privacyPolicy={props.privacyPolicy}
        termsAndConditions={props.termsAndConditions}
        copyright={props.copyright}
        socialIcons={props.socialIcons}
      />
    </div>
  );
};
