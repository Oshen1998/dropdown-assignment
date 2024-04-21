import React, { useEffect, useRef, useState } from "react";
import { DropdownItem } from "./types";
import useOutsideClick from "../../hooks/outSideClick";
import classNames from "classnames";
import { GoChevronDown } from "react-icons/go";
import { CgCheck } from "react-icons/cg";
import "./styles.scss";

type AppDropDownProps = {
  id: string;
  title?: string;
  items: DropdownItem[];
  position?: "bottom" | "top";
  hasIcon?: boolean;
  style?: string;
  selectedId?: string;
  onSelect: (id: string) => void;
};

const AppDropDown = (props: AppDropDownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    id,
    items,
    hasIcon,
    onSelect,
    position = "bottom-left",
    selectedId,
    style,
    title = "Select",
  } = props;

  // open & close dropdown
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // set selected item in the dropdown menu.
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? items?.find((item) => item.id === selectedId) : undefined
  );

  // this hooks use to identify the outside clicks
  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });

  useEffect(() => {
    if (selectedId && items) {
      const newSelectedItem = items.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, items]);

  // onHandle DropDown option
  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    // after selected close the dropdown
    setIsOpen(false);
  };

  const dropdownClass = classNames(
    "absolute bg-gray-100 w-full max-h-50 overflow-y-auto py-3 rounded-lg shadow-md z-10",
    {
      "top mb-2": position === "top",
      "bottom mt-2": position === "bottom",
    }
  );

  return (
    <div ref={ref} className="relative">
      <button
        id={id}
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "button py-2 px-4 text-zinc-600 outline-none hover:ring hover:outline-blue-500",
          style
        )}
      >
        <span>{selectedItem?.value || title}</span>
        <GoChevronDown
          size={20}
          className={classNames("transform duration-500 ease-in-out", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {/*if Open */}
      {isOpen && (
        <div className={dropdownClass}>
          <ul
            role="menu"
            aria-orientation="vertical"
            className="leading-10 w-full px-1"
          >
            {items?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classNames(
                  "listItems rounded hover:bg-gray-200 px-3",
                  { "bg-blue-200 rounded": selectedItem?.id === item.id }
                )}
              >
                <div
                  className={classNames("text-zinc-600 grid-rows-1 ", {
                    "text-blue-600 ": selectedItem?.id === item.id,
                  })}
                >
                  {item.name}
                  {item.imageUrl && (
                    <span>
                      <img
                        src={item.imageUrl}
                        alt="img"
                        loading="lazy"
                        className="w-4 h-4 rounded bg-gray-400 object-cover me-2"
                      />
                    </span>
                  )}
                </div>
                {selectedItem?.id === item.id && (
                  <div
                    className={classNames({
                      "text-blue-600 ": selectedItem?.id === item.id,
                    })}
                  >
                    <CgCheck size={30} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AppDropDown;
