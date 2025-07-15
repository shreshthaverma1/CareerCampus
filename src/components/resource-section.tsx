"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import type { Resource } from "@/lib/types";
import { addResourceAction } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Globe } from "lucide-react";

interface ResourceSectionProps {
  initialResources: Resource[];
  userName: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Recommend Resource"}
    </Button>
  );
}

export function ResourceSection({ initialResources, userName }: ResourceSectionProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleAction = async (formData: FormData) => {
    try {
        await addResourceAction(formData);
        formRef.current?.reset();
        toast({
            title: "Success!",
            description: "Your resource has been shared with the community.",
        });
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error instanceof Error ? error.message : "There was a problem with your request.",
        });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Resources</CardTitle>
        <CardDescription>Share useful links and discover what others have found.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Recommend a Resource</h4>
            <form ref={formRef} action={handleAction} className="space-y-4">
              <input type="hidden" name="name" value={userName} />
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="e.g., Awesome React Tutorial" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" name="url" type="url" placeholder="https://example.com" required />
              </div>
              <SubmitButton />
            </form>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Latest Shares</h4>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {initialResources.map((resource, index) => (
                <div key={resource.id}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center mt-1">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {resource.title}
                      </a>
                      <p className="text-sm text-muted-foreground">
                        Shared by {resource.submittedBy}
                      </p>
                    </div>
                  </div>
                  {index < initialResources.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
