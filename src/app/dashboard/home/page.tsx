import FeedContainer from "@/containers/FeedContainer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return <FeedContainer feed="timeline" />;
}
