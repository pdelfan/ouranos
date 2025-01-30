import { AppShell as Shell, AppShellMain } from "@mantine/core";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export default function AppShell(props: Props) {
  return (
    <Shell
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <Navbar />
      <AppShellMain>{props.children}</AppShellMain>
    </Shell>
  );
}
