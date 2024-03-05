import Avatar from "@/components/dataDisplay/avatar/Avatar";
import SignOut from "@/components/actions/signOut/SignOut";
import Link from "next/link";

interface Props {
  handle: string;
  displayName?: string;
  avatar?: string;
}

export default async function Aside(props: Props) {
  const { displayName, handle, avatar } = props;

  return (
    <aside className="sticky top-6 hidden h-full md:block">
      <div className="flex flex-col items-center gap-1 lg:flex-row lg:gap-3">
        <div className="order-last flex flex-col items-end lg:order-first">
          <Link
            href={`/dashboard/user/${handle}`}
            className="hidden max-w-[7rem] truncate font-semibold text-neutral-700 hover:text-neutral-500 lg:inline"
          >
            {displayName || handle}
          </Link>
          <SignOut />
        </div>
        <Link
          href={`/dashboard/user/${handle}`}
          className="max-w-[7rem] truncate hover:brightness-90"
        >
          <Avatar src={avatar} />
        </Link>
      </div>
    </aside>
  );
}
