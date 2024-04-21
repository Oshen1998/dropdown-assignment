import { IconType } from "react-icons";

export type DropdownItem = {
  id: string;
  name: string;
  value: string;
  imageUrl?: string;
  icon?: IconType;
};

export enum PositionTypes {
    bottomRight=  "bottom-right",
    bottomLeft =  "bottom-left",
    topRight = "top-right",
    topLeft = "top-left",
}
