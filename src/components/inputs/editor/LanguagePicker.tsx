import Button from "@/components/actions/button/Button";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import { LANGUAGES } from "@/lib/consts/languages";
import { BiCheck, BiTrash } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";

interface Props {
  languages: Language[];
  onSelectLanguages: React.Dispatch<React.SetStateAction<Language[]>>;
}

export default function LanguagePicker(props: Props) {
  const { languages, onSelectLanguages } = props;

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-primary hover:text-primary-dark text-start font-semibold"
        >
          {languages.length === 0 && <IoLanguage className="text-2xl" />}
          {languages.length === 0 && "(Auto)"}
          {languages.length > 0 &&
            languages.map((lang) => lang.name).join(", ")}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {languages.length > 0 && (
          <Dropdown.MenuItem
            text="Remove All Languages"
            icon={<BiTrash />}
            textColor="text-status-danger"
            onSelect={() => onSelectLanguages([])}
          />
        )}
        {LANGUAGES.map((option) => (
          <Dropdown.MenuItem
            key={option.name}
            text={option.name}
            icon={languages.includes(option) ? <BiCheck /> : undefined}
            onSelect={() => {
              // can only select 3 languages
              if (languages.length === 3 && !languages.includes(option)) {
                return;
              }

              if (languages.includes(option)) {
                onSelectLanguages(languages.filter((lang) => lang !== option));
              } else {
                onSelectLanguages([...languages, option]);
              }
            }}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
