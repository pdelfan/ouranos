import ListsContainer from "@/containers/lists/ListsContainer";

interface Props {
  params: {
    handle: string;
  };
}

export default function Page(props: Props) {
  const { handle } = props.params;

  return <ListsContainer handle={handle} />;
}
