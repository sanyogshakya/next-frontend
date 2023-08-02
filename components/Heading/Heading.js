import React from "react";
import { getFontSize, getTextAlign } from "utils/fonts";

export const Heading = ({ content, textAlign, level = 2 }) => {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
    className: `font-heading max-w-5xl mx-auto my-5 ${getFontSize(
      level
    )} ${getTextAlign(textAlign)}`,
  });
  return tag;
};
