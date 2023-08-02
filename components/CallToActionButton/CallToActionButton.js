import { ButtonLink } from "components/ButtonLink";
import Link from "next/link";

export const CallToActionButton = ({ label, destination, align }) => {
  const alignment = "text-" + align;
  return (
    <div className={`${alignment}`}>
      <ButtonLink destination={destination} label={label} />
    </div>
  );
};
