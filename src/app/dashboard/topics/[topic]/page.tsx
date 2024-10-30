import TopicHeader from "@/components/contentDisplay/topicHeader/TopicHeader";
import TopicContainer from "@/containers/posts/TopicContainer";

interface Props {
  params: {
    topic: string;
  };
}

export default function Page(props: Props) {
  const { params } = props;
  const url = decodeURIComponent(params.topic);

  return (
    <>
      <TopicHeader url={url} />
      <TopicContainer url={url} />
    </>
  );
}
