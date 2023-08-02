import NextImage from "next/image";

export const Image = ({ height, width, src, alt }) => {
  return (
    <figure className="w-[100%]">
      <NextImage src={src} alt={alt} height={height} width={width} />
    </figure>
  );
};
