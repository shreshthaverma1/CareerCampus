export type Interest = "DSA" | "Web Dev" | "AI/ML" | "UI/UX" | "Cloud";

export const interests: Interest[] = ["DSA", "Web Dev", "AI/ML", "UI/UX", "Cloud"];

export type Roadmap = {
  id: string;
  name: string;
  steps: { title: string; description: string }[];
};

export type Hackathon = {
  id: string;
  name: string;
  deadline: Date;
  domain: Interest;
  applyLink: string;
};

export type Resource = {
  id: string;
  title: string;
  url: string;
  submittedBy: string;
  createdAt: Date;
};
