"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { forwardRef } from "react";

interface Props
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  className?: string;
}

const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  Props
>((props: Props, ref) => (
  <SwitchPrimitives.Root
    className="focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-skin-muted inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className="bg-skin-base pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
