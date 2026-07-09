"use client";

import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import * as React from "react";

export function ProgressControlled() {
  const [progress, setProgress] = React.useState<number[]>([50]);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress([66]), 500);
    return () => clearTimeout(timer);
  }, []);

  const progressValue = progress[0] ?? 0;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={progressValue} />

      <Slider value={progress} onValueChange={setProgress} min={0} max={100} step={1} />

      <p className="text-sm text-muted-foreground">Progresso: {progressValue}%</p>
    </div>
  );
}
