import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { DasboardLinks } from "../components/dashboard/DasboardLinks";
import { ThemeToggle } from "../components/dashboard/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { auth, signOut } from "../lib/auth";
import prisma from "../lib/db";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      grantId: true,
    }
  });

  if(!data?.userName) {
    return redirect("/onboarding")
  }

  if(!data.grantId) {
    return redirect("/onboarding/grant-id")
  }

  return data
}

export default async function Dashboard({ children }: { children: ReactNode }) {
  const session = await auth();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = await getData(session?.user?.id as string);

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <>
      {/* Grid layout */}
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        {/* Sidebar (Hidden on mobile) */}
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            {/* Logo and Branding */}
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image src={Logo} alt="Logo" className="size-6" />
                <p className="text-3xl font-bold">
                  Cal<span className="text-primary">Scheduling</span>
                </p>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <DasboardLinks />
              </nav>
            </div>

            {/* Profile section at the bottom of the sidebar */}
            <div className="border-t p-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-muted bg-gray-100 dark:bg-gray-900">
                    {/* User Avatar */}
                    <Image
                      src={session.user.image as string} // Or placeholder
                      alt="Profile"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    {/* User Info */}
                    <div className="flex flex-col">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{session.user.name}</p>
    <p className="text-xs text-muted-foreground dark:text-gray-400">
      {session.user.email}
    </p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-md border p-2 bg-white dark:bg-gray-900" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {/* Sheet for mobile sidebar */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 mt-10">
                  <DasboardLinks />
                </nav>

                {/* Account Info at the bottom of the sheet (for mobile) */}
                <div className="border-t p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-muted">
                        <Image
                          src={session.user.image as string} // Or placeholder
                          alt="Profile"
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                        <div className="flex flex-col text-left flex-1">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{session.user.name}</p>
                          <p className="text-xs text-muted-foreground dark:text-gray-400">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-md border p-2 bg-white dark:bg-gray-900" align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings">Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <form
                          className="w-full"
                          action={async () => {
                            "use server";
                            await signOut();
                          }}
                        >
                          <button className="w-full text-left">Log out</button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <Image
                      src={session.user.image as string}
                      alt="Profile"
                      width={20}
                      height={20}
                      className="w-full h-full rounded-full"
                    />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-sm border p-2 bg-white dark:bg-gray-900" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton />
    </>
  );
}