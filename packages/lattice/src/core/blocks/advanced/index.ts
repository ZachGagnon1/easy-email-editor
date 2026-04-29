import {
  AdvancedBlock,
  ICondition,
  IConditionGroup,
  IConditionGroupItem,
  Operator,
  OperatorSymbol,
} from "./generateAdvancedBlock";
import { AdvancedType } from "@/core/constants";
import {
  AdvancedAccordion,
  AdvancedButton,
  AdvancedCarousel,
  AdvancedColumn,
  AdvancedDivider,
  AdvancedGroup,
  AdvancedHero,
  AdvancedImage,
  AdvancedNavbar,
  AdvancedSection,
  AdvancedSocial,
  AdvancedSpacer,
  AdvancedTable,
  AdvancedText,
  AdvancedWrapper,
} from "./blocks";
import {
  AdvancedTableBlock,
  IAdvancedTableData,
} from "./generateAdvancedTableBlock";

export const advancedBlocks = {
  [AdvancedType.TEXT]: AdvancedText,
  [AdvancedType.BUTTON]: AdvancedButton,
  [AdvancedType.IMAGE]: AdvancedImage,
  [AdvancedType.DIVIDER]: AdvancedDivider,
  [AdvancedType.SPACER]: AdvancedSpacer,
  [AdvancedType.NAVBAR]: AdvancedNavbar,
  [AdvancedType.ACCORDION]: AdvancedAccordion,
  [AdvancedType.CAROUSEL]: AdvancedCarousel,
  [AdvancedType.SOCIAL]: AdvancedSocial,
  [AdvancedType.TABLE]: AdvancedTable,

  [AdvancedType.WRAPPER]: AdvancedWrapper,
  [AdvancedType.SECTION]: AdvancedSection,
  [AdvancedType.GROUP]: AdvancedGroup,
  [AdvancedType.COLUMN]: AdvancedColumn,
  [AdvancedType.HERO]: AdvancedHero,
};

export { Operator, OperatorSymbol };
export type { AdvancedBlock, ICondition, IConditionGroup, IConditionGroupItem };
export type { IAdvancedTableData, AdvancedTableBlock };
