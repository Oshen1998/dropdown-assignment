import React from "react";
import { DropdownItem } from "./types";

type AppDropDownProps = {
  id: string;
  title?: string;
  data: DropdownItem[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  hasImage?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
};

const AppDropDown = (props: AppDropDownProps) => {
    const {data, id, hasImage, onSelect, position, selectedId,style, title} = props
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default AppDropDown;
