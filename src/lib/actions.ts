"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { addUser, addResource } from "./data";
import { interests } from "./types";
import { revalidatePath } from "next/cache";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  interests: z.array(z.string()).min(1, "Please select at least one interest."),
});

export async function signUpAction(formData: FormData) {
  const name = formData.get("name") as string;
  const selectedInterests = interests.filter((interest) => formData.get(interest));
  
  const result = signUpSchema.safeParse({ name, interests: selectedInterests });

  if (!result.success) {
    // Handle validation errors - in a real app, you'd return this to the form
    console.error(result.error.flatten().fieldErrors);
    return;
  }
  
  await addUser(result.data);

  const params = new URLSearchParams();
  params.set("name", result.data.name);
  params.set("interests", result.data.interests.join(","));
  
  redirect(`/dashboard?${params.toString()}`);
}


const resourceSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    url: z.string().url("Please enter a valid URL."),
    name: z.string(),
});

export async function addResourceAction(formData: FormData) {
    const data = {
        title: formData.get('title') as string,
        url: formData.get('url') as string,
        name: formData.get('name') as string,
    }

    const result = resourceSchema.safeParse(data);

    if (!result.success) {
        // In a real app, you would return error messages to the client
        throw new Error(result.error.errors.map(e => e.message).join(', '));
    }

    await addResource({ title: result.data.title, url: result.data.url, submittedBy: result.data.name });

    revalidatePath("/dashboard");
}
