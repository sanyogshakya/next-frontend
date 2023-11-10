import { ButtonLink } from "components/ButtonLink";
import Image from "next/image";
import Link from "next/link";
import { FaHouseUser, FaHeart } from "react-icons/fa";

export const Header = ({
  headerLogoImage,
  items,
  callToActionLabel,
  callToActionDestination,
}) => {
  return (
    <header className="bg-slate-800 text-white sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="py-5 text-pink-600 flex">
            <Link href="/">
              <Image
                src={headerLogoImage}
                width={210}
                height={30}
                alt="Collins"
                className="w-[auto] h-[auto]"
                placeholder="blur"
                blurDataURL={headerLogoImage}
              />
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            {(items || []).map((item) => (
              <div
                key={item.id}
                className="hover:bg-slate-700 cursor-pointer relative group"
              >
                <div>
                  <Link className="p-5 block" href={item.destination}>
                    {item.label}
                  </Link>
                </div>
                {!!item.subMenuItems?.length && (
                  <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full -mt-3">
                    {(item.subMenuItems || []).map((subItem) => (
                      <Link
                        className="p-5 block hover:bg-slate-700 whitespace-nowrap"
                        href={subItem.destination}
                        key={subItem.id}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="ml-3 my-auto">
              <ButtonLink
                destination={callToActionDestination}
                label={callToActionLabel}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
