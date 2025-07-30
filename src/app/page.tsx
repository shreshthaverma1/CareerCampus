"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsExiting(true);
    setTimeout(() => {
      router.push("/signup");
    }, 1000); // Match fade-out duration
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Spline background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/bBuOujbqXB6e04L1/scene.splinecode" />
      </div>

      {/* Optional overlay to increase content readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

      {/* Foreground content */}
      <main className="relative z-20 flex min-h-screen flex-col items-center justify-center p-8">
        <div
          className={cn(
            "flex flex-col items-center justify-center max-w-2xl text-center",
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
    </div>
  );
}
