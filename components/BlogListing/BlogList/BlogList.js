import { BlogCard } from "./BlogCard";

export const BlogList = ({ posts }) => {
  return (
    <div className="container mx-auto px-4 pt-8 pb-8">
      <div className="grid grid-cols-3 gap-5">
        {posts.map((post) => (
          <BlogCard
            key={post.databaseId}
            title={post.title}
            excerpt={post.excerpt}
            destination={post.uri}
            image={post.featuredImage?.node?.sourceUrl}
          />
        ))}
      </div>
    </div>
  );
};
