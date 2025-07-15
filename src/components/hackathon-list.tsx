import type { Hackathon } from "@/lib/types";
import { HackathonCard } from "@/components/hackathon-card";

interface HackathonListProps {
  title: string;
  hackathons: Hackathon[];
  icon?: React.ReactNode;
}

export function HackathonList({ title, hackathons, icon }: HackathonListProps) {
  if (hackathons.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h4 className="text-xl font-semibold">{title}</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}
      </div>
    </div>
  );
}
