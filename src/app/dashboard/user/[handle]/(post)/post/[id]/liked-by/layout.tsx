import Layout from "@/containers/Layout";

export default function LikedByLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
