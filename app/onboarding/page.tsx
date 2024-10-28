"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/submitButtons";
import { useFormState } from "react-dom";
import { onboardingAction } from "../actions";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchemaLocale } from "../lib/zodSchemas";

export default function OnboardingRoute() {
    const [lastResult, action] = useFormState(onboardingAction, undefined)

    const [form, fields] = useForm({


        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: onboardingSchemaLocale });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput'
    })

  return (
    <div className="min-h-screen w-screen flex items-center justify-center ">
      <Card>
        <CardHeader>
          <CardTitle className="text-5xl">
            Welcome Cal<span className="text-primary">Scheduling</span>
          </CardTitle>
          <CardDescription className="text-xl">
            We need the following information to set up your profile!
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label className="text-lg">Full Name</Label>
              <Input name={fields.fullName.name} defaultValue={fields.fullName.initialValue} key={fields.fullName.key} placeholder="John Doe" />
              <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label className="text-lg">Username</Label>
              <div className="flex rounded-md text-lg">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  CalScheduling.com/
                </span>
                <Input
                  name={fields.username.name}
                  defaultValue={fields.username.initialValue}
                  key={fields.username.key}
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
                <p className="text-red-500 text-sm">{fields.username.errors}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Submit" className="w-full" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
