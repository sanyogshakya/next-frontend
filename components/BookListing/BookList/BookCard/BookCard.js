import Image from "next/image";
import Link from "next/link";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const BookCard = ({
  title,
  genres,
  author,
  price,
  image,
  imageAlt,
  destination,
}) => {
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
            alt={imageAlt ? imageAlt : "Book Cover"}
            height="200"
            width="300"
          />
        </div>
        <div className="flex items-center mt-3 justify-between">
          <h3 className="text-2xl">{title}</h3>
          {genres && (
            <div className="pl-4 flex gap-4">
              {genres.map((genre) => (
                <span className="" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center mt-3 justify-between">
          <h4>{author}</h4>
          <h5 className="text-4xl pl-4">${price}</h5>
        </div>
      </div>
    </Link>
  );
};
