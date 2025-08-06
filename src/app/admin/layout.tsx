
import Link from "next/link";
import {
  Home,
  PanelLeft,
  Settings,
  Shield,
  FileQuestion,
  Tag,
  ClipboardList,
  BookMarked
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <div className="relative flex min-h-screen w-full bg-muted/40">
            <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 p-2">
                <BookMarked className="h-8 w-8 text-primary" />
                <h2 className="text-xl font-headline font-semibold">QuizWise</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/admin" asChild>
                    <Link href="/admin">
                        <Home />
                        <span>Dashboard</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/admin/questions" asChild>
                    <Link href="/admin/questions">
                        <FileQuestion />
                        <span>Questions</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/admin/tags" asChild>
                    <Link href="/admin/tags">
                        <Tag />
                        <span>Tags</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/admin/tests" asChild>
                    <Link href="/admin/tests">
                        <ClipboardList />
                        <span>Tests</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/" asChild>
                        <Link href="/">
                            <Shield className="transform -scale-x-100" />
                            <span>Back to Site</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            </Sidebar>
            <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
                <SidebarTrigger className="md:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </SidebarTrigger>
                <div className="ml-auto">
                    <Button variant="outline" size="icon">
                        <Settings className="h-5 w-5"/>
                    </Button>
                </div>
            </header>
            <SidebarInset>{children}</SidebarInset>
            </div>
      </div>
    </SidebarProvider>
  );
}
