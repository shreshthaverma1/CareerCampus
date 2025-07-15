import type { Hackathon } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors duration-300">
      <CardHeader>
        <CardTitle>{hackathon.name}</CardTitle>
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
  );
}
