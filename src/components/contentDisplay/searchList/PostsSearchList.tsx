interface Props {
  query: string;
}

export default function PostsSearchList(props: Props) {
  const { query } = props;

  return <section className="flex flex-col">Posts</section>;
}
