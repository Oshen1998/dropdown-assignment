import { IconType } from "react-icons";

export type DropdownItem = {
  id: string;
  name: string;
  value: string;
  imageUrl?: string;
  icon?: IconType;
};
