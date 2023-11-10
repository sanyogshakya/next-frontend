import { Poppins, Aboreto } from "next/font/google";

import "../styles/globals.css";
import { Header } from "components/Header";
import { getMenu } from "utils/getMenu";
import { Footer } from "components/Footer";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const aboreto = Aboreto({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-aboreto",
});

export default async function RootLayout({ children }) {
  const data = await getMenu();
  console.log(data);
  return (
    <html lang="en" className={`${poppins.variable} ${aboreto.variable}`}>
      <body className="font-body">
        <Header
          headerLogoImage={data.headerLogoImage}
          items={data.mainMenuItems}
          callToActionLabel={data.callToActionLabel}
          callToActionDestination={data.callToActionDestination}
        />
        <main className="main">{children}</main>
        <Footer
          footerLogo={data.footerLogo}
          privacyPolicy={data.privacyPolicy}
          termsAndConditions={data.termsAndConditions}
          copyright={data.copyright}
          socialIcons={data.socialIcons}
        />
      </body>
    </html>
  );
}
