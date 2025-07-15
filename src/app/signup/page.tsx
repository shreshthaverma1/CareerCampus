import { SignUpForm } from "@/components/signup-form";
import { Logo } from "@/components/logo";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Logo />
          <p className="text-muted-foreground">
            Navigate your career path with clarity and confidence.
          </p>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
