import { AdvancedType, BasicType } from "@";
import { get } from "lodash";
import TagIcon from "@mui/icons-material/Tag";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ImageIcon from "@mui/icons-material/Image";
import DensityLargeIcon from "@mui/icons-material/DensityLarge";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import Crop169Icon from "@mui/icons-material/Crop169";
import NoteIcon from "@mui/icons-material/Note";
import TableChartIcon from "@mui/icons-material/TableChart";

// TODO I don't really like this as a fix for the icon stuff. It's kind of scuffed but oh well.
let iconsMap = {
  [BasicType.TEXT]: <TextFieldsIcon />,
  [BasicType.SECTION]: "icon-section",
  [BasicType.COLUMN]: <ViewColumnIcon />,
  [BasicType.DIVIDER]: <HorizontalRuleIcon />,
  [BasicType.IMAGE]: <ImageIcon />,
  [BasicType.BUTTON]: <Crop169Icon />,
  [BasicType.GROUP]: "icon-group",
  [BasicType.PAGE]: <NoteIcon />,
  [BasicType.WRAPPER]: "icon-wrapper",
  [BasicType.NAVBAR]: "icon-navbar",
  [BasicType.HERO]: "icon-hero",
  [BasicType.SPACER]: <DensityLargeIcon />,
  [BasicType.SOCIAL]: <TagIcon />,
  [BasicType.CAROUSEL]: <ViewCarouselIcon />,
  [BasicType.ACCORDION]: "icon-accordion",
  [BasicType.TABLE]: <TableChartIcon />,

  [AdvancedType.TEXT]: <TextFieldsIcon />,
  [AdvancedType.DIVIDER]: <HorizontalRuleIcon />,
  [AdvancedType.IMAGE]: <ImageIcon />,
  [AdvancedType.BUTTON]: <Crop169Icon />,
  [AdvancedType.NAVBAR]: "icon-navbar",
  [AdvancedType.SPACER]: <DensityLargeIcon />,
  [AdvancedType.SOCIAL]: <TagIcon />,
  [AdvancedType.CAROUSEL]: <ViewCarouselIcon />,
  [AdvancedType.ACCORDION]: "icon-accordion",
  [AdvancedType.TABLE]: <TableChartIcon />,

  [AdvancedType.WRAPPER]: "icon-wrapper",
  [AdvancedType.SECTION]: "icon-section",
  [AdvancedType.COLUMN]: <ViewColumnIcon />,
  [AdvancedType.GROUP]: "icon-group",
  [AdvancedType.HERO]: "icon-hero",
};

export function getIconNameByBlockType(type: string) {
  return get(iconsMap, type) || "icon-number";
}

export function setIconsMap(map: Record<string, string>) {
  iconsMap = { ...iconsMap, ...map };
}
