import { AdvancedType, BasicType } from "@";

export function isTableBlock(blockType: any) {
  return blockType === AdvancedType.TABLE || blockType === BasicType.TABLE;
}
