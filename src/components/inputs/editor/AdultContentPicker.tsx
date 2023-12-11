import Button from "@/components/actions/button/Button";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import React from "react";

const options = [
  { label: "Suggestive", value: "suggestive" },
  { label: "Nudity", value: "nudity" },
  { label: "Porn", value: "nsfw" },
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
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          disabled={disabled}
          iconSize="text-xl"
          iconColor="text-primary hover:text-primary-dark"
          icon="octicon:shield-16"
          className="p-0"
        />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.MenuItem
            key={option.value}
            text={option.label}
            icon={
              selectedLabel === option.value ? "octicon:check-16" : undefined
            }
            onSelect={() => onSelectLabel(option.value)}
          />
        ))}
        {selectedLabel !== "" && (
          <Dropdown.MenuItem
            text="Remove Label"
            textColor="text-red-500"
            icon="bx:trash"
            onSelect={() => onSelectLabel("")}
          />
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
