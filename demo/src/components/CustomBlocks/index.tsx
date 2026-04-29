import { BlockAttributeConfigurationManager, BlockManager } from "lattice";
import { CustomBlocksType } from "./constants";
import {
  Panel as ProductRecommendationPanel,
  ProductRecommendation,
} from "./ProductRecommendation";

BlockManager.registerBlocks({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendation,
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendationPanel,
});
