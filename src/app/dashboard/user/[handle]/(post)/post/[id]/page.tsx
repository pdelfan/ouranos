interface Props {
  params: {
    id: string;
  };
}

export default function Page(props: Props) {
  const { params } = props;
  return <h1>Post</h1>;
}
