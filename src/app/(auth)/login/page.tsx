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
        <Image src={"/logoFull.svg"} alt="Ouranos logo" w={150} />
        <Form action={"/api/auth/login"}>
          <Stack align="center" gap={"xs"}>
            <Group gap={"xs"} align="end">
              <TextInput
                required
                withAsterisk={false}
                label="Handle"
                name="handle"
                placeholder="you.bsky.social"
                leftSection={<MdAlternateEmail />}
                size="md"
                radius={"xl"}
              />
              <Button type="submit" size="md" color="gray.7" radius={"xl"}>
                Log in
              </Button>
            </Group>
            <Text size="sm">
              Don't have an account?{" "}
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
