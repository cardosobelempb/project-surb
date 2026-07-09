"use client";

import { cn } from "@/lib/utils";
import { Progress as ProgressPrimitive } from "radix-ui";
import * as React from "react";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="
    h-full
    w-full
    flex-1
    bg-linear-to-r
    from-surb-blue
    via-surb-cyan
    to-surb-green
    transition-all
  "
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
