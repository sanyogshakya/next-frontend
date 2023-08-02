import { BookCard } from "./BookCard";

export const BookList = ({ books }) => {
  return (
    <div className="container mx-auto px-4 pt-8 pb-8">
      <div className="grid grid-cols-3 gap-5">
        {books.map((book) => (
          <BookCard
            key={book.databaseId}
            title={book.title}
            destination={book.uri}
            image={book.featuredImage?.node?.sourceUrl}
            imageAlt={book.featuredImage?.node?.altText}
            genres={book.genres.nodes}
            author={book.bookDetails.author}
            price={book.bookDetails.price}
          />
        ))}
      </div>
    </div>
  );
};
