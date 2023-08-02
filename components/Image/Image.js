import Image from "next/image";

export const Image = ({ height, width, src, alt }) => {
  return (
    <figure className="w-[100%]">
      <Image src={src} alt={alt} height={height} width={width} />
    </figure>
  );
};
