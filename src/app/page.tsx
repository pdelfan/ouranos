import { Button, Center, Group, Stack, Text, Title } from "@mantine/core";

export default function Home() {
  return (
    <Center h={"100svh"}>
      <Stack align="center">
        <Title order={1}>Ouranos</Title>
        <Text fz={"xl"}>Your friendly Bluesky client for the web</Text>
        <Group>
          <Button
            component="a"
            href="https://bsky.app"
            target="_blank"
            size="md"
            color="gray"
            radius={"xl"}
          >
            Sign up
          </Button>
          <Button
            component="a"
            href="/dashboard"
            size="md"
            color="gray.7"
            radius={"xl"}
          >
            Log in
          </Button>
        </Group>
      </Stack>
    </Center>
  );
}
