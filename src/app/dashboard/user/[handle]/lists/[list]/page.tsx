import ListContainer from "@/containers/lists/ListContainer";
import { getListInfo } from "@/lib/api/bsky/list";
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const listInfo = await getListInfo(searchParams.uri);
  const title = listInfo.list.name
      ? listInfo.list.name
      : "List";
  
    return {
      title: title,
      description: "Feed",
    };
  }

interface Props {
  searchParams: {
    uri: string;
  };
}

export default function Page(props: Props) {
  const { searchParams } = props;

  return <ListContainer uri={searchParams.uri} />;
}
