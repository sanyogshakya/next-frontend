import Image from "next/image";
import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";

register();

export const Banner = ({ attributesData }) => {
  const enableSection = attributesData.enable_section || "0";
  const rowCount = attributesData.banner_slides || 0;
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("progress", (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener("slidechange", (e) => {
      console.log("slide changed");
    });
  }, []);

  if (enableSection !== "1" && rowCount < 1) {
    return;
  }

  const table = [...Array(rowCount)];

  return (
    <section className="banner">
      {rowCount > 0 && (
        <swiper-container
          ref={swiperElRef}
          slides-per-view="1"
          navigation="false"
          pagination="false"
          class="swiper-initialized swiper-horizontal"
        >
          {table.map((_, index) => {
            const title = `banner_slides_${index}_title`;
            const subtitle = `banner_slides_${index}_subtitle`;
            const bgImage = `banner_slides_${index}_background_image`;

            return (
              <swiper-slide
                class="banner-slide h-[601px] relative flex items-center swiper-slide"
                key={index}
              >
                <Image
                  className="banner-bg-image w-[100%] h-[auto] object-cover absolute top-0 left-0"
                  src={attributesData[bgImage].url}
                  width={1440}
                  height={601}
                  alt={attributesData[bgImage].alt || "Banner Image"}
                  priority
                />
                <div className="container mx-auto px-4 z-10">
                  <h1 className="title text-white text-6xl mb-8">
                    {attributesData[title]}
                  </h1>
                  <p className="subtitle text-white">
                    {attributesData[subtitle]}
                  </p>
                </div>
              </swiper-slide>
            );
          })}
        </swiper-container>
      )}
    </section>
  );
};
