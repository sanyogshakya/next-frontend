import Image from "next/image";
import styles from "./footer.module.css";
import Link from "next/link";

export const Footer = ({
  footerLogo,
  privacyPolicy,
  termsAndConditions,
  copyright,
  socialIcons,
}) => {
  const year = new Date().getFullYear();
  return (
    <footer className={`${styles.footer}`}>
      <div className="container mx-auto px-4 pt-10 pb-12">
        <div className="flex justify-between">
          <div className="footer-logo">
            <Link href="/">
              <Image
                src={footerLogo.sourceUrl}
                width="190"
                height="27"
                alt="Collins"
              />
            </Link>
          </div>
          <div className="footer-links flex gap-4">
            <Link href={termsAndConditions?.destination.uri}>
              {termsAndConditions?.label}
            </Link>
            <Link href={privacyPolicy?.destination.uri}>
              {privacyPolicy?.label}
            </Link>
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <div className="copyright text-center">
            {copyright || `© ${year} | SiteTitle`}
          </div>
          <div className="flex justify-center gap-2">
            {socialIcons &&
              socialIcons.map((socialIcon, index) => (
                <Link key={index} href={socialIcon.socialUrl}>
                  <Image
                    src={socialIcon.socialIcon.sourceUrl}
                    alt="Social Icon"
                    width="16"
                    height="16"
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
