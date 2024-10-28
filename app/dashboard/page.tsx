import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import { EmptyState } from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ExternalLink,
  Pen,
  Settings,
  Trash,
  Users2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyLinkMenuItem } from "../components/dashboard/CopyLinkMenu";
import MenuActiveSwitcher from "../components/EventTypeSwitcher";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      EventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await requireUser();
  const data = await getData(session?.user?.id as string);
  return (
    <>
      {data.EventType.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button below."
          buttonText="Add Event Type"
          href="/dashboard/new"
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="hidden sm:grid gap-y-1 mb-4">
              <h1 className="text-4xl md:text-5xl font-semibold">
                Event Types
              </h1>
              <p className="text-muted-foreground text-xl mt-2">
                Create and manage your event types right here.
              </p>
            </div>
            <Button asChild>
              <Link href={"/dashboard/new"}>Create new Event</Link>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.EventType.map((item) => (
              <div
                className="overflow-hidden shadow rounded-lg border relative"
                key={item.id}
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"outline"} size={"icon"}>
                        <Settings className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data.userName}/${item.url}`}>
                            <ExternalLink className="mr-2 size-4" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <CopyLinkMenuItem
                          meetingUrl={`${process.env.NEXT_PUBLIC_URI}/${data.userName}/${item.url}`}
                        />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/event/${item.id}`}>
                          <Pen className="mr-2 size-4" />
                          Edit
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500" asChild>
                        <Link href={`/dashboard/event/${item.id}/delete`}>
                          <Trash className="mr-2 size-4" />
                          Delete
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link href={"/"} className="flex items-center p-5">
                  <div className="flex shrink-0">
                    <Users2 className="size-6" />
                  </div>

                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-xl font-medium text-muted-foreground">
                        {item.duration} Minutes Meeting
                      </dt>
                      <dd className="text-2xl font-medium">{item.title}</dd>
                    </dl>
                  </div>
                </Link>
                <div className="bg-muted px-5 py-3 flex justify-between items-center">
                  <MenuActiveSwitcher initialChecked={item.active} eventTypeId={item.id} />
                  <Button asChild>
                    <Link href={`/dashboard/event/${item.id}`}>
                    Edit Event
                    </Link>
                    </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}