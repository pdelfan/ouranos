import Layout from "@/containers/Layout";

interface Props {
  children: React.ReactNode;
}

export default function FollowersLayout(props: Props) {
  const { children } = props;
  return <Layout>{children}</Layout>;
}
