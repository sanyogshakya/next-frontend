import Image from "next/image";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const BookDetails = ({ attributesData }) => {
  console.log(attributesData);
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="md:flex">
          <div className="md:w-[30%] lg:w-1/2 md:pr-4 lg:pr-10">
            <Image
              src={attributesData.featuredImage.url}
              width={708}
              height={1000}
              alt={attributesData.featuredImage.alt}
              className="w-full h-auto"
            />
          </div>
          <div className="mt-10 md:w-[70%] md:mt-0 lg:w-1/2 md:pl-4 lg:pl-10">
            <h1 className="font-heading text-6xl lg:mt-8 mb-2">
              {attributesData.title}
            </h1>
            {attributesData.genres && (
              <div className="mt-0 mb-6 flex gap-4">
                {attributesData.genres.map((genre) => (
                  <span className="text-sm" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            <h4 className="text-3xl mt-0 mb-4">{attributesData.author}</h4>
            <p className="mt-0 mb-4">
              <strong>{attributesData.publishYear}</strong>
            </p>
            <h3 className="text-4xl mt-0 mb-10">${attributesData.price}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: relativeToAbsoluteUrls(attributesData.description),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
