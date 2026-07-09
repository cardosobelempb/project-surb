"use client";

import { Slider as SliderPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="
    relative
    h-2
    grow
    overflow-hidden
    rounded-full
    bg-muted
  "
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="
      absolute
      h-full
      bg-linear-to-r
      from-surb-blue
      via-surb-cyan
      to-surb-green
    "
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="
    block
    h-5
    w-5
    rounded-full
    border-2
    border-surb-cyan
    bg-white
    shadow-lg
    shadow-cyan-500/20
    transition-colors
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-surb-cyan
    disabled:pointer-events-none
    disabled:opacity-50
  "
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
