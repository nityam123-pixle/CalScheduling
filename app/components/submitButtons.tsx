"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import GoogleLogo from "@/public/google.svg"
import GithubLogo from "@/public/github.svg"
import { useFormStatus } from "react-dom";
import Image from "next/image";

interface iAppProps {
    text: string;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | null
      | undefined;
  
    className?: string;
  }

export function SubmitButton({ text, variant, className }: iAppProps) {
    const { pending } = useFormStatus();
  
    return (
      <>
        {pending ? (
          <Button disabled variant="outline" className={cn("w-fit", className)}>
            <Loader className="size-4 mr-2 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button
            variant={variant}
            type="submit"
            className={cn("w-fit", className)}
          >
            {text}
          </Button>
        )}
      </>
    );
  }

  export function GitHubAuthButton() {
    const { pending } = useFormStatus();
    return (
      <>
        {pending ? (
          <Button variant="outline" className="w-full" disabled>
            <Loader className="size-4 mr-2 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button variant="outline" className="w-full">
            <Image
              src={GithubLogo}
              className="size-4 mr-2 dark:invert"
              alt="Google Logo"
            />
            Sign in with GitHub
          </Button>
        )}
      </>
    );
  }

  export function GoogleAuthButton() {
    const { pending } = useFormStatus();
    return (
      <>
        {pending ? (
          <Button variant="outline" className="w-full" disabled>
            <Loader className="size-4 mr-2 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button variant="outline" className="w-full">
            <Image src={GoogleLogo} className="size-4 mr-2" alt="Google Logo" />
            Sign in with Google
          </Button>
        )}
      </>
    );
  }