import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { FaBluesky } from "react-icons/fa6";

export default function Page() {
  return (
    <Center h={"100svh"}>
      <Stack align="center" gap={"lg"}>
        <Stack align="center" gap={"0"}>
          <Title order={1}>Ouranos</Title>
          <Text fz={"xl"} c="gray">
            Your friendly Bluesky client for the web
          </Text>
        </Stack>
        <Button
          component="a"
          href="login"
          size="md"
          color="gray.7"
          radius={"xl"}
          leftSection={<FaBluesky />}
        >
          Log in with Bluesky
        </Button>
      </Stack>
    </Center>
  );
}
