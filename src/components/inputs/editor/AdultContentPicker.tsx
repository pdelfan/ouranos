import Button from "@/components/actions/button/Button";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import React from "react";
import { BiCheck, BiTrash } from "react-icons/bi";
import { HiOutlineShieldExclamation } from "react-icons/hi";

const options = [
  { label: "Suggestive", value: "sexual" },
  { label: "Nudity", value: "nudity" },
  { label: "Porn", value: "porn" },
];

interface Props {
  onSelectLabel: React.Dispatch<React.SetStateAction<string>>;
  selectedLabel: string;
  disabled: boolean;
}

export default function AdultContentPicker(props: Props) {
  const { onSelectLabel, selectedLabel, disabled } = props;

  return (
    <Dropdown>
      <Dropdown.Trigger disabled={disabled}>
        <Button className="p-0">
          <HiOutlineShieldExclamation className="text-primary hover:text-primary-dark text-2xl" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {selectedLabel !== "" && (
          <Dropdown.MenuItem
            text="Remove Label"
            textColor="text-status-danger"
            icon={<BiTrash />}
            onSelect={() => onSelectLabel("")}
          />
        )}
        {options.map((option) => (
          <Dropdown.MenuItem
            key={option.value}
            text={option.label}
            icon={selectedLabel === option.value ? <BiCheck /> : undefined}
            onSelect={() => onSelectLabel(option.value)}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
