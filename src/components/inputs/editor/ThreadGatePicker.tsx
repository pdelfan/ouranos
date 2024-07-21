import Button from "@/components/actions/button/Button";
import { BiCheck } from "react-icons/bi";
import { ThreadgateSetting } from "../../../../types/feed";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import { THREADGATE_OPTIONS } from "@/lib/consts/thread";
import { getThreadGateIcon } from "@/lib/utils/icon";
import { getThreadGateComposerTitle } from "@/lib/utils/text";

interface Props {
  onUpdate: React.Dispatch<React.SetStateAction<ThreadgateSetting[]>>;
  selected: ThreadgateSetting[];
}

export default function ThreadGatePicker(props: Props) {
  const { onUpdate, selected } = props;

  const onSelectEveryone = () => {
    onUpdate([]);
  };

  const onSelect = (setting: ThreadgateSetting) => {
    if (setting === "nobody") {
      onUpdate((prev) => {
        if (prev.includes(setting)) return [];
        return [setting];
      });
    } else {
      onUpdate((prev) => {
        // remove setting if it already exists
        const uniqueSettings = prev.filter(
          (s) => s !== "nobody" && s !== setting,
        );
        if (prev.includes(setting)) {
          // setting is removed
          return uniqueSettings;
        }
        return [...uniqueSettings, setting];
      });
    }
  };

  const whoCanReply = selected.filter((i) =>
    THREADGATE_OPTIONS.some((op) => op.value === i),
  );

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-primary hover:text-primary-dark font-semibold"
        >
          <span className="text-xl">{getThreadGateIcon(whoCanReply)}</span>
          {getThreadGateComposerTitle(whoCanReply)}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <div className="px-2 pb-2 pt-1">
          <span className="text-skin-base font-semibold">
            Who can reply to this post?
          </span>
        </div>
        <Dropdown.MenuItem
          key="Everyone"
          text="Everyone"
          icon={selected.length === 0 ? <BiCheck /> : undefined}
          onSelect={onSelectEveryone}
        />
        {THREADGATE_OPTIONS.map((option) => (
          <Dropdown.MenuItem
            key={option.value}
            text={option.label}
            icon={selected.includes(option.value) ? <BiCheck /> : undefined}
            onSelect={() => onSelect(option.value)}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
