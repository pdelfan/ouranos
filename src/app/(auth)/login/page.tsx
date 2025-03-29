"use client";

import { useOAuthClient } from "@/app/providers/atproto";
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
import { useForm } from '@mantine/form';
import Form from "next/form";
import { MdAlternateEmail } from "react-icons/md";


export default function Page() {
  const form = useForm({ mode: "uncontrolled", initialValues: { handle: "" }});
  const oauthClient = useOAuthClient();

  const onSubmit = async () => {
    await oauthClient.signIn(form.getValues().handle);    
  }

  return (
    <Center h={"100svh"}>
      <Stack align="center" gap={"xl"}>
        <Stack align="center">
          <Image src={"/logo.svg"} alt="Ouranos logo" w={60} />
          <Text fz={"lg"} fw={500}>
            {"What's your handle?"}
          </Text>
        </Stack>
        <Form action={onSubmit}>
          <Stack align="center" gap={"xs"}>
            <Group gap={"xs"}>
              <TextInput
                required
                name="handle"
                placeholder="you.bsky.social"
                leftSection={<MdAlternateEmail />}
                size="md"
                radius={"md"}
                {...form.getInputProps('handle')}
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
