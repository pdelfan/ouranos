import {
  Anchor,
  Button,
  Center,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import Form from "next/form";
import { MdAlternateEmail } from "react-icons/md";

export default function Page() {
  return (
    <Center h={"100svh"}>
      <Stack align="center" gap={"xl"}>
        <Stack align="center">
          <Image src={"/logo.svg"} alt="Ouranos logo" w={60} />
          <Text fz={"lg"} fw={500}>
            {"What's your handle?"}
          </Text>
        </Stack>
        <Form action={"/api/auth/login"}>
          <Stack align="center" gap={"xs"}>
            <Group gap={"xs"}>
              <TextInput
                required
                name="handle"
                placeholder="you.bsky.social"
                leftSection={<MdAlternateEmail />}
                size="md"
                radius={"md"}
              />
              <Button type="submit" size="md" color="gray.7" radius={"md"}>
                Log in
              </Button>
            </Group>
            <Text size="sm">
              {"Don't have an account? "}
              <Anchor href="https://bsky.app" target="_blank">
                Sign up on Bluesky
              </Anchor>
            </Text>
          </Stack>
        </Form>
      </Stack>
    </Center>
  );
}
