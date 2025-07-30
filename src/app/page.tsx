"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Spline = dynamic(() =>
  import("@splinetool/react-spline/viewer").then((mod) => ({ default: mod.Spline })),
  { ssr: false }
);




export default function Home() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      router.push("/signup");
    }, 1500);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden p-8">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/bBuOujbqXB6e04L1/scene.splinecode" />
      </div>

      <div
        className={cn(
          "flex flex-col items-center justify-center max-w-2xl text-center z-10",
          "animate-fade-in-up",
          { "animate-fade-out": isExiting }
        )}
      >
        <Logo />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mt-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Your Career Journey Starts Here
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-lg">
          Navigate your career path with clarity and confidence. Get a personalized roadmap, find hackathons, and connect with a community of learners.
        </p>
        <Button asChild size="lg" className="mt-8">
          <a href="/signup" onClick={handleClick}>
            Get Started <MoveRight className="ml-2" />
          </a>
        </Button>
      </div>
    </main>
  );
}
