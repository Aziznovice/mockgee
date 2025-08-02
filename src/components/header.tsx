import Link from "next/link";
import { BookMarked, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <BookMarked className="h-6 w-6 text-accent" />
          <span className="font-bold font-headline sm:inline-block">
            QuizWise
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link
                href="/admin"
                className="text-sm font-medium transition-colors"
              >
                <Shield className="mr-2 h-4 w-4" />
                Admin Panel
              </Link>
            </Button>
            <Button variant="ghost" asChild className="p-0 rounded-full h-9 w-9">
              <Link href="/profile">
                 <Avatar className="h-9 w-9">
                    <AvatarImage src="https://placehold.co/100x100" alt="User Avatar" />
                    <AvatarFallback>
                        <User/>
                    </AvatarFallback>
                </Avatar>
                <span className="sr-only">User Profile</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}