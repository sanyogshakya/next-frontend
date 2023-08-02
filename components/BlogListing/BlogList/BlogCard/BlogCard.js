import Image from "next/image";
import Link from "next/link";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const BlogCard = ({ title, excerpt, image, destination }) => {
  return (
    <Link
      className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200"
      href={destination}
    >
      <div className="w-full">
        <div className="h-[240px]">
          <Image
            className="w-full h-full object-cover"
            src={image}
            alt="Post Image"
            height="200"
            width="300"
          />
        </div>
        <h3 className="mt-3">{title}</h3>
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: relativeToAbsoluteUrls(excerpt),
          }}
        />
      </div>
    </Link>
  );
};
