
"use client";

import Link from "next/link";
import { BookMarked, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

function MainNav() {
    return (
        <>
            <Link href="#features" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-sm transition-all">Features</Link>
            <Link href="#exams" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-sm transition-all">Exam Types</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-sm transition-all">Pricing</Link>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-sm transition-all">Admin</Link>
        </>
    )
}

function UserActions() {
    return (
         <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all">
                Sign In
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://placehold.co/100x100" alt="User Avatar" />
                      <AvatarFallback>
                          <User/>
                      </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Alex Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      alex.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export function Header() {
  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
                <Link href="/" className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                        <BookMarked className="w-6 h-6 text-white"/>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">QuizWise</h1>
                        <p className="text-sm text-indigo-600 font-medium">Professional Exam Preparation</p>
                    </div>
                </Link>
                <nav className="hidden lg:flex space-x-1">
                    <MainNav/>
                </nav>
                <div className="hidden lg:flex">
                    <UserActions/>
                </div>
                 <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                            <Menu className="w-6 h-6 text-gray-600" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                         <div className="flex flex-col space-y-4">
                            <nav className="flex flex-col space-y-2">
                               <MainNav/>
                            </nav>
                            <div className="pt-4 border-t">
                                <UserActions/>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </header>
  );
}
