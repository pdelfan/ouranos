import {
  Button,
  Center,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { FaBluesky } from "react-icons/fa6";
import { BsFillQuestionCircleFill, BsGithub } from "react-icons/bs";
import { MdQuestionAnswer } from "react-icons/md";

export default function Page() {
  return (
    <Center h={"100svh"} p={"md"}>
      <Stack gap={"lg"} align="flex-start">
        <Image src={"/logoFull.svg"} alt="Ouranos logo" w={160} />
        <Stack gap={"xs"} mt={"lg"}>
          <Title order={1} fz={"h2"}>
            Your friendly Bluesky client for the web
          </Title>
          <Stack gap={"0"}>
            <Text fz={"lg"} fw={500} c="gray">
              Designed for simplicity
            </Text>
            <Text fz={"lg"} fw={500} c={"gray"}>
              Enhanced features
            </Text>
            <Text fz={"lg"} fw={500} c={"gray"}>
              Open-source
            </Text>
          </Stack>
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
        <Group gap={"xs"}>
          <Button
            component="a"
            href="/about"
            variant="subtle"
            color="gray"
            size="md"
            p={"xs"}
            radius={"xl"}
            fw={500}
            leftSection={<BsFillQuestionCircleFill />}
          >
            About
          </Button>
          <Button
            component="a"
            href="/faq"
            variant="subtle"
            color="gray"
            size="md"
            p={"xs"}
            radius={"xl"}
            fw={500}
            leftSection={<MdQuestionAnswer />}
          >
            FAQ
          </Button>
          <Button
            component="a"
            href="https://github.com/pdelfan/ouranos"
            target="_blank"
            variant="subtle"
            color="gray"
            size="md"
            p={"xs"}
            radius={"xl"}
            fw={500}
            leftSection={<BsGithub />}
          >
            GitHub
          </Button>
        </Group>
      </Stack>
    </Center>
  );
}
