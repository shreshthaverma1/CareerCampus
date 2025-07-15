import type { Hackathon } from "@/lib/types";
import { HackathonCard } from "@/components/hackathon-card";
import { Card, CardContent } from "@/components/ui/card";

interface HackathonListProps {
  title: string;
  hackathons: Hackathon[];
  icon?: React.ReactNode;
}

export function HackathonList({ title, hackathons, icon }: HackathonListProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h4 className="text-xl font-semibold">{title}</h4>
      </div>
      {hackathons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      ) : (
        <Card className="flex items-center justify-center p-6 bg-secondary/50 border-dashed">
          <p className="text-muted-foreground">No hackathons currently.</p>
        </Card>
      )}
    </div>
  );
}
