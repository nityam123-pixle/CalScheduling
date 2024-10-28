import { DeleteEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/submitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const DeleteEventType = ({ params }: { params: { eventTypeId: string } }) => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Delete Event Type</CardTitle>
          <CardDescription className="text-xl">
            Are you sure you want to delete this event type?
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button asChild variant="secondary">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <form action={DeleteEventTypeAction}>
            <input type="hidden" name="id" value={params.eventTypeId} />
            <SubmitButton text="Delete" variant={"destructive"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteEventType;