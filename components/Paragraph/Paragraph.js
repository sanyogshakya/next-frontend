import React from "react";
import { getTextAlign } from "utils/fonts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Paragraph = ({ content, textAlign = "left", textColor }) => {
  return (
    <p
      className={`font-body max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
      dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
      style={{ color: textColor }}
    />
  );
};
