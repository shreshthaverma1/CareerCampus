import type { Interest, Roadmap, Hackathon, Resource } from "@/lib/types";
import { interests as availableInterests } from "@/lib/types";

// Mock Data
const roadmaps: Record<string, Roadmap> = {
  "web-dev": {
    id: "web-dev",
    name: "Web Development",
    steps: [
      { title: "HTML & CSS", description: "Learn the fundamental building blocks of web pages." },
      { title: "JavaScript", description: "Master the language of the web to create interactive experiences." },
      { title: "React/Next.js", description: "Build powerful, modern web applications with a popular framework." },
      { title: "Node.js & Express", description: "Develop server-side logic and APIs for your applications." },
      { title: "Databases (SQL/NoSQL)", description: "Learn how to store and manage your application's data." },
    ],
  },
  "ai-ml": {
    id: "ai-ml",
    name: "AI/ML",
    steps: [
      { title: "Python Programming", description: "The core language for AI and Machine Learning." },
      { title: "Data Science Libraries", description: "Learn NumPy, Pandas, and Matplotlib for data manipulation and visualization." },
      { title: "Machine Learning Foundations", description: "Understand concepts like supervised and unsupervised learning." },
      { title: "Deep Learning with TensorFlow/PyTorch", description: "Build and train neural networks for complex tasks." },
      { title: "Deploy ML Models", description: "Learn to deploy your models as APIs for real-world use." },
    ],
  },
  "dsa": {
    id: "dsa",
    name: "Data Structures & Algorithms",
    steps: [
        { title: "Pick a Language", description: "Master C++, Java, or Python for competitive programming." },
        { title: "Learn Time & Space Complexity", description: "Understand how to analyze the efficiency of your algorithms." },
        { title: "Master Core Data Structures", description: "Learn Arrays, Strings, Linked Lists, Stacks, Queues, Trees, and Graphs." },
        { title: "Practice Algorithmic Techniques", description: "Solve problems using Sorting, Searching, Recursion, and Dynamic Programming." },
        { title: "Compete on Platforms", description: "Regularly solve problems on LeetCode, HackerRank, or Codeforces." },
    ],
  },
   "ui-ux": {
    id: "ui-ux",
    name: "UI/UX Design",
    steps: [
        { title: "Learn Design Principles", description: "Study concepts like color theory, typography, and visual hierarchy." },
        { title: "Master a Design Tool", description: "Become proficient in Figma, Sketch, or Adobe XD." },
        { title: "User Research & Personas", description: "Understand your users and their needs to design effective solutions." },
        { title: "Wireframing & Prototyping", description: "Create low and high-fidelity mockups of your designs." },
        { title: "Build Your Portfolio", description: "Showcase your best work to attract potential employers." },
    ],
  },
   "cloud": {
    id: "cloud",
    name: "Cloud Computing",
    steps: [
        { title: "Fundamentals of Networking", description: "Understand IP addresses, DNS, and basic network protocols." },
        { title: "Choose a Cloud Provider", description: "Get started with AWS, Google Cloud, or Microsoft Azure." },
        { title: "Core Cloud Services", description: "Learn about compute (VMs), storage, and database services." },
        { title: "Infrastructure as Code (IaC)", description: "Use tools like Terraform or CloudFormation to manage infrastructure." },
        { title: "Get Certified", description: "Aim for a foundational certification like AWS Certified Cloud Practitioner." },
    ],
  },
};

const hackathons: Hackathon[] = [
  { id: "1", name: "Hack The Web 2024", deadline: new Date("2024-10-15"), domain: "Web Dev", applyLink: "#" },
  { id: "2", name: "AI Global Challenge", deadline: new Date("2024-11-01"), domain: "AI/ML", applyLink: "#" },
  { id: "3", name: "Designathon '24", deadline: new Date("2024-09-30"), domain: "UI/UX", applyLink: "#" },
  { id: "4", name: "Future Cloud Conf", deadline: new Date("2024-10-22"), domain: "Cloud", applyLink: "#" },
  { id: "5", name: "Code Sprint", deadline: new Date("2024-09-25"), domain: "DSA", applyLink: "#" },
  { id: "6", name: "Devs for Change", deadline: new Date("2024-11-10"), domain: "Web Dev", applyLink: "#" },
  { id: "7", name: "ML Olympiad", deadline: new Date("2024-12-01"), domain: "AI/ML", applyLink: "#" },
];

let resources: Resource[] = [
    { id: "1", title: "React Docs", url: "https://react.dev", submittedBy: "Jane Doe", createdAt: new Date() },
    { id: "2", title: "Tailwind CSS", url: "https://tailwindcss.com", submittedBy: "John Smith", createdAt: new Date(Date.now() - 1000 * 60 * 5) },
];


// Mock API functions
export async function addUser(data: { name: string; interests: Interest[] }): Promise<{ id: string } & typeof data> {
  console.log("Adding user:", data);
  // In a real app, this would save to Firestore and return the new user object with an ID.
  return Promise.resolve({ id: "user-" + Date.now(), ...data });
}

export async function getRoadmapByInterest(interest: Interest): Promise<Roadmap | null> {
  const interestKey = interest.toLowerCase().replace(/ /g, '-').replace(/\//g, '');
  const roadmap = roadmaps[interestKey];
  return Promise.resolve(roadmap || null);
}

export async function getHackathonsByDomains(domains: Interest[]): Promise<Hackathon[]> {
    const lowerCaseDomains = domains.map(d => d.toLowerCase());
    const filtered = hackathons.filter(h => lowerCaseDomains.includes(h.domain.toLowerCase()));
    return Promise.resolve(filtered);
}

export async function getRecommendedHackathons(userInterests: Interest[]): Promise<Hackathon[]> {
  const otherInterests = availableInterests.filter(i => !userInterests.includes(i));
  // Pick one random interest from the remaining ones
  if (otherInterests.length === 0) return Promise.resolve([]);
  
  const recommendedDomains = otherInterests.slice(0, 2); // Suggest up to 2
  return getHackathonsByDomains(recommendedDomains);
}

export async function getResources(): Promise<Resource[]> {
    return Promise.resolve([...resources].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
}

export async function addResource(data: { title: string; url: string; submittedBy: string }): Promise<Resource> {
    const newResource: Resource = {
        id: "res-" + Date.now(),
        ...data,
        createdAt: new Date(),
    };
    resources.unshift(newResource);
    return Promise.resolve(newResource);
}
