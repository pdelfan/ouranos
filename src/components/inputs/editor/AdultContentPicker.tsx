import Button from "@/components/actions/button/Button";
import Dropdown from "@/components/actions/dropdown/Dropdown";

const options = [
  { label: "Suggestive", value: "suggestive" },
  { label: "Nudity", value: "nudity" },
  { label: "Porn", value: "nsfw" },
];

export default function AdultContentPicker() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          iconSize="text-xl"
          iconColor="text-primary"
          icon="octicon:shield-16"
          className="p-0"
        />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.MenuItem
            key={option.value}
            text={option.label}
            onSelect={() => {}}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
