"use client";

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
import { SubmitButton } from "./submitButtons";
import { Settings, XIcon } from "lucide-react";
import { useFormState } from "react-dom";
import { SettingsAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../lib/zodSchemas";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export function SettingsForm({ email, fullName, profileImage }: iAppProps) {
  const [lastResult, action] = useFormState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl flex flex-row">
          <Settings className="size-5 mr-2" />
          Settings
        </CardTitle>
        <CardDescription className="text-2xl">
          Manage your Account settings!!
        </CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4 ">
          <div className="flex flex-col gap-y-2">
            <Label className="text-xl">Full Name</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              defaultValue={fullName}
              placeholder="Eg..,John Doe"
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="text-xl">Email</Label>
            <Input disabled defaultValue={email} placeholder="text@text.com" />
          </div>
          <div className="grid gap-y-5">
            <Label className="text-xl">Profile Image</Label>
            <Input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage} />
            {currentProfileImage ? (
              <div className="relative size-16">
                <Image
                  src={currentProfileImage}
                  alt="profile"
                  width={16}
                  height={16}
                  className="size-16 rounded-full"
                />
                <Button
                  onClick={handleDeleteImage}
                  type="button"
                  variant={"destructive"}
                  size={"icon"}
                  className="absolute -top-3 -right-3"
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone onClientUploadComplete={(res) => {
                setCurrentProfileImage(res[0].url)
                toast.success("Profile image has been uploaded successfully")
              }}
              onUploadError={(error) => {
                console.log("Something went Wrong", error)
                toast.error("Something went Wrong!!!")
              }}
              endpoint="imageUploader" />
            )}
            <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
