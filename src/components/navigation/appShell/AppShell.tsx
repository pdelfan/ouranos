"use client";

import { AppShell as Shell, AppShellMain } from "@mantine/core";
import Navbar from "@/components/navigation/navbar/Navbar";
import { useSession } from "@/app/providers/atproto";
import useProfile from "@/features/profile/lib/queries/useProfile";
import Composer from "@/features/composer/components/composer/Composer";
import { useDisclosure } from "@mantine/hooks";
import BottomBar from "../bottomBar/BottomBar";

interface Props {
  children: React.ReactNode;
}

export default function AppShell(props: Props) {
  const session = useSession();
  const { profile } = useProfile({ handleOrDid: session.did });
  const [opened, { toggle }] = useDisclosure();

  return (
    <Shell
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
    >
      <Navbar onToggleNavbar={toggle} />
      <AppShellMain py={"0"}>
        {profile && <Composer author={profile} />}
        {props.children}
      </AppShellMain>
      <BottomBar onToggleNavbar={toggle} />
    </Shell>
  );
}
