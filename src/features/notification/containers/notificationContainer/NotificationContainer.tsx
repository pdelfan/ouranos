import { Tabs, TabsList, TabsTab, Text } from "@mantine/core";

export default function NotificationContainer() {
  return (
    <Tabs defaultValue={"all"}>
      <TabsList grow>
        <TabsTab value={"all"}>
          <Text fw={500}>All</Text>
        </TabsTab>
        <TabsTab value={"mentions"}>
          <Text fw={500}>Mentions</Text>
        </TabsTab>
      </TabsList>
    </Tabs>
  );
}
