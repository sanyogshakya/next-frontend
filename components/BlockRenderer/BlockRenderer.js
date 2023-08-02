import { Banner } from "components/Banner";
import { BlogListing } from "components/BlogListing";
import { BookDetails } from "components/BookDetails";
import { BookListing } from "components/BookListing";
import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { HalfContentHalfVideo } from "components/HalfContentHalfVideo";
import { Heading } from "components/Heading";
import { Image } from "components/Image";
import { Paragraph } from "components/Paragraph";
import { PropertySearch } from "components/PropertySearch";
import { Search } from "components/Search";
import { theme } from "theme";

export const BlockRenderer = ({ blocks, postCategories }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.align}
            content={block.attributes.content}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }
      case "core/post-title":
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            textAlign={block.attributes.textAlign}
            level={block.attributes.level}
            content={block.attributes.content}
          />
        );
      }
      case "core/cover": {
        return (
          <Cover background={block.attributes.url} key={block.id}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      }
      case "core/columns": {
        return (
          <Columns
            isStackedOnMobile={block.attributes.isStackedOnMobile}
            key={block.id}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        );
      }
      case "core/column": {
        return (
          <Column key={block.id} width={block.attributes.width}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }
      case "core/image": {
        return (
          <Image
            key={block.id}
            height={block.attributes.height}
            width={block.attributes.width}
            src={block.attributes.url}
            alt={block.attributes.alt || ""}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Image>
        );
      }
      case "acf/ctabutton": {
        return (
          <CallToActionButton
            label={block.attributes.data.label}
            align={block.attributes.data.align}
            destination={block.attributes.data.destination || "/"}
            key={block.id}
          />
        );
      }
      case "core/group":
      case "core/block": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "acf/propertysearch": {
        return <PropertySearch key={block.id} />;
      }
      case "acf/banner": {
        return <Banner key={block.id} attributesData={block.attributes.data} />;
      }
      case "acf/hchv": {
        return (
          <HalfContentHalfVideo
            key={block.id}
            attributesData={block.attributes.data}
          />
        );
      }
      case "acf/blog-listing": {
        return (
          <BlogListing
            key={block.id}
            postCategories={postCategories}
            isPaginationOrLoadMore={block.attributes.data.load_more_pagination}
          />
        );
      }
      case "acf/search": {
        return <Search key={block.id} />;
      }
      case "acf/book-details": {
        return (
          <BookDetails key={block.id} attributesData={block.attributes.data} />
        );
      }
      case "acf/book-listing": {
        return <BookListing key={block.id} />;
      }
      default: {
        console.log("UNKNOWN ", block);
        return null;
      }
    }
  });
};
