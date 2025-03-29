import type { Metadata } from "next";
import { Container, Box, Grid, GridCol } from "@mantine/core";
import ProfileHeader from "@/features/profile/components/profileHeader/ProfileHeader";
import TopBar from "@/components/navigation/topBar/TopBar";
import ProfileInfo from "@/features/profile/components/profileInfo/ProfileInfo";
import ProfileTabs from "@/features/profile/components/profileTabs/ProfileTabs";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;

  return {
    title: handle,
    description: "Profile",
  };
}

interface Props {
  params: Promise<{ handle: string }>;
  children: React.ReactNode;
}

export default async function Layout(props: Props) {
  const { handle } = await props.params;

  const BREAD_CRUMBS = [
    { label: "Home", href: "/dashboard" },
    {
      label: handle,
      href: `/dashboard/profile/${handle}`,
    },
  ];

  return (
    <Box>
      <TopBar breadcrumbs={BREAD_CRUMBS} />
      <ProfileHeader handle={handle} />
      <Container size={"xl"} mt={"xl"} px={"xs"}>
        <Grid gutter={"lg"}>
          <GridCol span={{ base: 12, md: 8 }} order={{ base: 1, md: 0 }}>
            <ProfileTabs />
            {props.children}
          </GridCol>
          <GridCol span={{ base: 12, md: 4 }} order={{ base: 0, md: 1 }}>
            <ProfileInfo handle={handle} />
          </GridCol>
        </Grid>
      </Container>
    </Box>
  );
}
