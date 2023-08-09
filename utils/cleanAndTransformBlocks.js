import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {
  const blocks = JSON.parse(JSON.stringify(blocksJSON));
  const assignIds = (b) => {
    b.map((block) => {
      block.id = uuid();
      if (block.innerBlocks?.length) {
        assignIds(block.innerBlocks);
      }
    });
  };

  // const cleanBlocks = (bl) => {
  //   bl.map((block) => {
  //     block.attributes = JSON.parse(block.attributesJSON);
  //     if (block.innerBlocks?.length) {
  //       cleanBlocks(block.innerBlocks);
  //     }
  //   });
  // };

  assignIds(blocks);
  // cleanBlocks(blocks);

  return blocks;
};
