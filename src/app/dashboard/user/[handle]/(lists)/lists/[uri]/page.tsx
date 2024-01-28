import ListContainer from "@/containers/lists/ListContainer";

interface Props {
  searchParams: {
    uri: string;
  };
}

export default function Page(props: Props) {
  const { searchParams } = props;

  return <ListContainer uri={searchParams.uri} />;
}
