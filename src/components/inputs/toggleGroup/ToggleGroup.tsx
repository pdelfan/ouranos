"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as React from "react";
import { forwardRef, ReactNode } from "react";

const ToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ children, ...props }, ref) => {
  const { className } = props;

  return (
    <ToggleGroupPrimitive.Root
      className={`border-skin-base inline-flex divide-x rounded-lg border ${className}`}
      {...props}
      ref={ref}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
});

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
  children: ReactNode;
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>((props: ToggleGroupItemProps, ref) => {
  const { children } = props;
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className="data-[state=on]:bg-primary data-[state=on]:text-skin-inverted p-1.5 first:rounded-l last:rounded-r"
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
