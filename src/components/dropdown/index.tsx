import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { DropdownItem } from "./types";
import useOutsideClick from "../../hooks/outSideClick";
import classNames from "classnames";
import { GoChevronDown } from "react-icons/go";
import { CgCheck } from "react-icons/cg";
import "./styles.scss";

/**
 * @param {string} id - This use to identify the item uniquely.
 * @param {string} title - Before select an item this use as the name of dropdown eg:"Choose Preferences".
 * @param {array} items - This is the items you need to show in the dropdown. it should be "DropdownItem".
 * @param {boolean} isCustomInputDisabled - enbaled or disabled the custom input values.
 * @param {string} position - The variant of the position (e.g., 'bottom', 'top').
 * @param {string} backgroundColor - this would be the color of the dropdown default it's used white.
 * @param {string} width - Dynamic width.
 * @param {string} selectedId - This used to identify the selected dropdown item.
 * @param {function} onSelect - This used to select dropdown item.
 */

type AppDropDownProps = {
  id: string;
  title?: string;
  isCustomInputDisabled: boolean;
  items: DropdownItem[];
  position?: "bottom" | "top";
  backgroundColor?: string;
  width?: string;
  selectedId?: string;
  onSelect: (id: string) => void;
};

const AppDropDown = (props: AppDropDownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    id,
    items,
    onSelect,
    isCustomInputDisabled= false,
    position = "bottom-left",
    selectedId,
    backgroundColor = "white",
    title = "Select",
    width = "100vw",
  } = props;

  // open & close dropdown states
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [extraItem, setExtraItem] = useState<string>("");
  const [initialItems, setInitialItems] = useState<DropdownItem[]>(items);

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

  useEffect(() => {
    setInitialItems(items);
  }, [initialItems, items]);

  // onHandle DropDown option
  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    // after selected close the dropdown
    setIsOpen(false);
  };

  const dropdownClass = classNames(
    "absolute bg-gray-100 w-full max-h-60 overflow-y-auto py-3 rounded-lg shadow-md z-10",
    {
      "top mb-2": position === "top",
      "bottom mt-2": position === "bottom",
    }
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExtraItem(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAdd();
      setIsOpen(false);
    }
  };

  const handleAdd = () => {
    const addItem = {
      id: (initialItems.length + 1).toString(),
      name: extraItem,
      value: extraItem,
      imageUrl:
        "https://cdn-au.onetrust.com/logos/3dbea99f-abc0-4dbd-bcd7-8f6dfcaea28d/fa31fe00-374f-4fdf-98ff-2a16550795d7/2db09970-a2d9-4d2b-9e0e-5c8a08893ccd/Smartmockups_Logo_Symbol.png",
    }
    initialItems.push(addItem);
    setSelectedItem(addItem);
    setExtraItem("");
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        id={id}
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ width, backgroundColor }}
        className="button py-2 px-4 text-zinc-600 outline-none hover:ring hover:outline-blue-500"
      >
        <span>{selectedItem?.value ?? title}</span>
        <GoChevronDown
          size={20}
          className={classNames("transform duration-500 ease-in-out", {
            "rotate-180": isOpen,
          })}
        />
      </button>

      {/*if Open */}
      {isOpen && (
        <div className={dropdownClass} style={{ backgroundColor }}>
          <ul role="menu" className="leading-10 w-full px-1">
            {!isCustomInputDisabled && <input
              style={{ width: "100%" }}
              onKeyDown={handleKeyDown}
              autoFocus
              value={extraItem}
              onChange={onChange}
              placeholder="Add Item"
              className="leading-10 w-full px-1"
            />}
            {initialItems?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classNames(
                  "listItems rounded hover:bg-gray-200 px-3",
                  { "bg-blue-200 rounded": selectedItem?.id === item.id }
                )}
              >
                <div>
                  <div className="listItems">
                    <div
                      className={classNames("text-zinc-600", {
                        "text-blue-700 ": selectedItem?.id === item.id,
                      })}
                    >
                      {item.name}
                    </div>
                    <img
                      src={item.imageUrl}
                      alt="img"
                      loading="lazy"
                      className="w-5 h-5 rounded mx-3"
                    />
                  </div>
                </div>
                {selectedItem?.id === item.id && (
                  <div
                    className={classNames({
                      "text-blue-600": selectedItem?.id === item.id,
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
