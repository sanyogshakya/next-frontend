import Image from "next/image";
import Link from "next/link";

export const SearchResults = ({ searchResults }) => {
  // return;
  return (
    <div className="pb-16 max-w-5xl mx-auto">
      <h1 className="font-heading text-5xl mb-4">Search Results</h1>
      {searchResults.map((result) => (
        <div className="pt-6 pb-6 border-b border-slate-500" key={result.id}>
          <Link href={result.uri} className="flex hover:text-slate-600 group">
            {result.featuredImage && (
              <Image
                src={result.featuredImage?.node.sourceUrl}
                alt={result.featuredImage?.node.altText || "Featured Image"}
                width={100}
                height={100}
                className="mr-10 object-cover h-[100px] w-[100px] group-hover:opacity-70"
              />
            )}
            <div className="content">
              <h3 className="text-2xl mb-3">{result.title}</h3>
              {result.excerpt && (
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: result.excerpt }}
                />
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
