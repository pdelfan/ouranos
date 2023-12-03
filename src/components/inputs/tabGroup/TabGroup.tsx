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
      className={`inline-flex border rounded-lg divide-x ${className}`}
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
      className="data-[state=on]:bg-primary data-[state=on]:text-white first:rounded-l last:rounded-r p-1.5"
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
