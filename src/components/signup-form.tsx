"use client";

import { useFormStatus } from "react-dom";
import { signUpAction } from "@/lib/actions";
import { interests } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Setting Your Course..." : "Start My Journey"}
    </Button>
  );
}

export function SignUpForm() {
  return (
    <Card>
      <form action={signUpAction}>
        <CardHeader>
          <CardTitle>Welcome Aboard!</CardTitle>
          <CardDescription>
            Tell us a bit about yourself to get a personalized roadmap.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="Ada Lovelace" required />
          </div>
          <div className="space-y-3">
            <Label>Your Interest</Label>
            <RadioGroup name="interest" required className="grid grid-cols-2 gap-4">
              {interests.map((interest) => (
                <div key={interest} className="flex items-center gap-2">
                  <RadioGroupItem value={interest} id={interest} />
                  <Label htmlFor={interest} className="font-normal">
                    {interest}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
