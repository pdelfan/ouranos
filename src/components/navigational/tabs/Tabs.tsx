import * as ScrollArea from "@radix-ui/react-scroll-area";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Tabs(props: Props) {
  const { children, className } = props;

  return (
    <ScrollArea.Root role="tablist">
      <div className={`flex flex-nowrap overflow-x-auto ${className}`}>
        {children}
      </div>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
