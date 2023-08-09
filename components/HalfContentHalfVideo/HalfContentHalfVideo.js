import { gql } from "@apollo/client";
import client from "client";
import { useEffect } from "react";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const HalfContentHalfVideo = ({ attributesData }) => {
  return (
    <section className="hchv py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-x-24 gap-y-10">
          <figure className="w-[100%] md:w-[calc(50%-3rem)]">
            <video width="auto" height="auto" controls>
              <source src={attributesData.video.url} type="video/mp4" />
            </video>
          </figure>
          <div className="content w-[100%] md:w-[calc(50%-3rem)]">
            <h2 className="text-5xl mb-10">{attributesData.title}</h2>
            <div
              className="subtitle"
              dangerouslySetInnerHTML={{
                __html: relativeToAbsoluteUrls(attributesData.description),
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};
