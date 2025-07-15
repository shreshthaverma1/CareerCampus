import { Suspense } from "react";
import type { Interest } from "@/lib/types";
import { getRoadmapByInterest, getHackathonsByDomains, getResources } from "@/lib/data";
import { suggestHackathons } from "@/ai/flows/ai-hackathon-suggestion";
import { Roadmap } from "@/components/roadmap";
import { HackathonList } from "@/components/hackathon-list";
import { ResourceSection } from "@/components/resource-section";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";

type DashboardPageProps = {
  searchParams: {
    name?: string;
    interests?: string;
  };
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const name = searchParams.name || "Explorer";
  const userInterests = (searchParams.interests?.split(",") || []) as Interest[];
  
  if (userInterests.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert>
          <AlertTitle>No interests selected!</AlertTitle>
          <AlertDescription>Please go back and select at least one interest to see your dashboard.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const firstInterest = userInterests[0];
  const roadmap = await getRoadmapByInterest(firstInterest);
  const interestHackathons = await getHackathonsByDomains(userInterests);
  
  const aiSuggestions = await suggestHackathons({ interests: userInterests });
  const suggestedHackathons = await getHackathonsByDomains(aiSuggestions.hackathonSuggestions as Interest[]);

  const resources = await getResources();

  return (
    <main className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-2">
          <Logo />
          <h2 className="text-3xl font-bold tracking-tight">Hey, {name}!</h2>
          <p className="text-muted-foreground text-lg">
            Ready to navigate your career? Here is your personalized dashboard.
          </p>
        </header>

        <section id="roadmap">
          <h3 className="text-2xl font-bold mb-4">Your Recommended Roadmap: <span className="text-primary">{roadmap?.name}</span></h3>
          {roadmap ? (
            <Roadmap roadmap={roadmap} />
          ) : (
            <p>No roadmap found for your selected interest. We are working on it!</p>
          )}
        </section>

        <section id="hackathons">
          <h3 className="text-2xl font-bold mb-4">🔥 Hackathons You Might Like</h3>
          <div className="space-y-8">
            <HackathonList title="Based on Your Interests" hackathons={interestHackathons} />
            <HackathonList title="Expand Your Horizons" hackathons={suggestedHackathons} icon={<Lightbulb className="w-5 h-5 text-primary" />} />
          </div>
        </section>

        <section id="resources">
          <ResourceSection initialResources={resources} userName={name} />
        </section>
      </div>
    </main>
  );
}
