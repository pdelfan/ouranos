import Layout from "@/containers/Layout";

export default function RepostedByLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
