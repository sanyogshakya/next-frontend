export const Image = ({ height, width, src, alt }) => {
  return (
    <figure className="w-[100%]">
      <img src={src} alt={alt} height={height} width={width} />
    </figure>
  );
};
