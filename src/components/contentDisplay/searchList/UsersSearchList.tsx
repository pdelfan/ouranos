interface Props {
  query: string;
}

export default function UsersSearchList(props: Props) {
  const { query } = props;

  return <section className="flex flex-col">Users</section>;
}
