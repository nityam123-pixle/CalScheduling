import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.png"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { signIn } from "../lib/auth";
import { GitHubAuthButton, GoogleAuthButton } from "./submitButtons";

export function AuthModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Try for Free</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
                <DialogHeader className="flex flex-row justify-center items-center gap-2">
                    <Image src={Logo} alt="Logo" className="size-10" />
                    <h4 className="text-3xl font-semibold">Cal<span className="text-primary">Scheduling</span></h4>
                </DialogHeader>
                <div className="flex flex-col mt-5 gap-3">
                    <form className="w-full" action={async () => {
                        "use server"
                        await signIn("google")
                    }}>
                        <GoogleAuthButton />
                    </form>
                    <form className="w-full" action={async () => {
                        "use server"
                        await signIn("github")
                    }}>
                    <GitHubAuthButton />
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}