import { ActionIcon, AppShellFooter, Group } from "@mantine/core";
import { FaBell, FaRegBell } from "react-icons/fa6";
import BottomItem from "./BottomItem";
import { BiHome, BiMenu, BiSolidHome } from "react-icons/bi";
import { PiMagnifyingGlassBold, PiMagnifyingGlassFill } from "react-icons/pi";
import { useComposerControls } from "@/app/providers/composer";
import { RiQuillPenFill } from "react-icons/ri";

interface Props {
  onToggleNavbar: () => void;
}

export default function BottomBar(props: Props) {
  const { openComposer } = useComposerControls();

  return (
    <AppShellFooter hiddenFrom="md">
      <Group justify="space-between">
        <BottomItem
          href="/dashboard"
          icon={<BiHome size={25} />}
          activeIcon={<BiSolidHome size={25} />}
        />
        <BottomItem
          href="/dashboard/explore"
          icon={<PiMagnifyingGlassBold size={25} />}
          activeIcon={<PiMagnifyingGlassFill size={25} />}
        />
        <ActionIcon
          size="xl"
          radius={"xl"}
          mb={"xl"}
          mt={"sm"}
          onClick={() => openComposer()}
        >
          <RiQuillPenFill size={20} />
        </ActionIcon>
        {/* TODO: notifications badge */}
        <BottomItem
          href="/dashboard/notifications"
          icon={<FaRegBell size={25} />}
          activeIcon={<FaBell size={25} />}
        />
        <BottomItem
          icon={<BiMenu size={25} />}
          onClick={props.onToggleNavbar}
        />
      </Group>
    </AppShellFooter>
  );
}
