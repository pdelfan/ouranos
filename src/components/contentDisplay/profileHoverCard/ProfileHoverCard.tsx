import * as HoverCard from "@radix-ui/react-hover-card";
import ProfileHoverContent from "./PorileHoverContent";

interface Props {
  children: React.ReactNode;
  handle: string;
}

export default function ProfileHoverCard(props: Props) {
  const { children, handle } = props;

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          sideOffset={5}
          align="start"
          className="z-50 max-w-72 shadow-lg animate-fade animate-duration-200 bg-skin-base border-skin-base border p-3 rounded-2xl"
        >
          <ProfileHoverContent handle={handle} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
