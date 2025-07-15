"use client";

import type { Roadmap as RoadmapType } from "@/lib/types";
import { GitCommit } from "lucide-react";

interface RoadmapProps {
  roadmap: RoadmapType;
}

export function Roadmap({ roadmap }: RoadmapProps) {
  return (
    <div className="relative">
      <div
        className="absolute left-4 top-4 bottom-4 w-0.5 bg-border -z-10"
        aria-hidden="true"
      />
      <ul className="space-y-8">
        {roadmap.steps.map((step, index) => (
          <li key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mt-1">
              <GitCommit className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-foreground">{step.title}</h4>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
