import type { Hackathon } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import Spline from "@splinetool/react-spline";

interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  return (
    <div className="relative w-full h-full">
      {/* Spline background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/bBuOujbqXB6e04L1/scene.splinecode" />
      </div>

      {/* Card content over Spline */}
      <Card className="relative z-10 flex flex-col h-full backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">{hackathon.name}</CardTitle>
          <CardDescription>
            <Badge variant="secondary">{hackathon.domain}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Deadline: {format(hackathon.deadline, "PPP")}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <a href={hackathon.applyLink} target="_blank" rel="noopener noreferrer">
              Apply Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
