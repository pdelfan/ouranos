import type { Metadata } from "next";
import { Fragment } from "react";
import { Box, Image } from "@mantine/core";

export const metadata: Metadata = {
  title: "Login",
  description: "Your Bluesky web client",
};

interface Props {
  children: React.ReactNode;
}

export default async function Layout(props: Props) {
  return (
    <Box
      style={{
        background:
          "linear-gradient(0deg, rgba(169,74,255, 0.2) 0%, rgba(169,74,255,0) 50%)",
      }}
    >
      {props.children}{" "}
      <Image
        src="/images/loginBackground.svg"
        alt="Numerous ouranos logos"
        width={1000}
        height={200}
        pos={"fixed"}
        bottom={0}
        h={"50svh"}
        style={{ zIndex: -10, transform: "translate(0px, 80px)" }}
      />
    </Box>
  );
}
