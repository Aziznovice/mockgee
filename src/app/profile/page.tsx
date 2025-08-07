

"use client";

import { Header } from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTestById, getSessionsForUser, getAttemptsForSession, testAttempts as allAttemptsData, tests } from "@/lib/data";
import type { TestAttempt, TestSession } from "@/lib/types";
import { User, TrendingUp, BarChart, Trophy, Bell, Newspaper, Compass, Zap, Target, BookOpen, Repeat } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button";
import { TestHistoryCard } from "@/components/test-history-card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const featureCards = [
    {
        title: "Quick Test",
        description: "20 random questions",
        icon: Zap,
        color: "bg-slate-700 hover:bg-slate-800",
        textColor: "text-white",
        href: "#"
    },
    {
        title: "Review Mistakes",
        description: "Focus on weak areas",
        icon: Target,
        color: "bg-rose-600 hover:bg-rose-700",
        textColor: "text-white",
        href: "#"
    },
    {
        title: "View Progress",
        description: "Detailed analytics",
        icon: BarChart,
        color: "bg-teal-600 hover:bg-teal-700",
        textColor: "text-white",
        href: "#"
    },
    {
        title: "Study Guides",
        description: "Comprehensive reviews",
        icon: BookOpen,
        color: "bg-indigo-600 hover:bg-indigo-700",
        textColor: "text-white",
        href: "#"
    }
]

export default function ProfilePage() {
    const allSessions = getSessionsForUser();
    const allAttempts = allAttemptsData;
    const completedAttempts = allAttempts.filter(a => a.status === 'completed');
    const totalTests = completedAttempts.length;

    const averageScore = totalTests > 0 
        ? Math.round(completedAttempts.reduce((acc, attempt) => acc + (attempt.score / attempt.totalQuestions) * 100, 0) / totalTests)
        : 0;
    const highestScore = totalTests > 0
        ? Math.max(...completedAttempts.map(attempt => Math.round((attempt.score / attempt.totalQuestions) * 100)))
        : 0;
    
    const testHistories = tests.map(test => {
        const sessionsForTest = allSessions.filter(s => s.testId === test.id);
        const sessionDetails = sessionsForTest.map(session => ({
            session,
            attempts: getAttemptsForSession(session.id)
        })).filter(detail => detail.attempts.length > 0);

        if (sessionDetails.length === 0) return null;

        return {
            test,
            sessions: sessionDetails,
        };
    }).filter(Boolean);


    const chartData = completedAttempts.slice(0, 5).reverse().map(attempt => {
        const session = allSessions.find(s => s.id === attempt.sessionId);
        const test = session ? getTestById(session.testId) : null;
        return {
            name: test?.title.slice(0,15) + "..." || "Test",
            score: Math.round((attempt.score / attempt.totalQuestions) * 100),
        }
    });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-1">
                <Card>
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                         <Avatar className="h-24 w-24 border-2 border-primary mb-4">
                            <AvatarImage src="https://placehold.co/100x100" alt="User Avatar" />
                            <AvatarFallback>
                            <User className="h-12 w-12" />
                            </AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-bold font-headline">Alex Doe</h2>
                        <p className="text-sm text-muted-foreground">alex.doe@example.com</p>
                        <Button variant="outline" size="sm" className="mt-4">Edit Profile</Button>
                    </CardContent>
                </Card>
             </div>
             <div className="md:col-span-2">
                 <Card>
                     <CardHeader>
                        <CardTitle>Statistics</CardTitle>
                        <CardDescription>Your performance at a glance.</CardDescription>
                     </CardHeader>
                     <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg bg-background flex flex-col items-center justify-center">
                            <BarChart className="h-8 w-8 text-primary mb-2"/>
                            <p className="text-3xl font-bold">{totalTests}</p>
                            <p className="text-sm text-muted-foreground">Tests Taken</p>
                        </div>
                        <div className="p-4 rounded-lg bg-background flex flex-col items-center justify-center">
                            <TrendingUp className="h-8 w-8 text-primary mb-2"/>
                            <p className="text-3xl font-bold">{averageScore}%</p>
                            <p className="text-sm text-muted-foreground">Average Score</p>
                        </div>
                        <div className="p-4 rounded-lg bg-background flex flex-col items-center justify-center">
                            <Trophy className="h-8 w-8 text-primary mb-2"/>
                            <p className="text-3xl font-bold">{highestScore}%</p>
                            <p className="text-sm text-muted-foreground">Highest Score</p>
                        </div>
                     </CardContent>
                 </Card>
             </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureCards.map((card, index) => (
              <Link href={card.href} key={index}>
                <Card className={cn("transition-transform hover:scale-105", card.color, card.textColor)}>
                  <CardContent className="p-4">
                    <card.icon className="h-8 w-8 mb-4 opacity-80" />
                    <h3 className="text-lg font-bold">{card.title}</h3>
                    <p className="text-sm opacity-90">{card.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div>
             <div className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold font-headline">Recent Mock Tests</h2>
                    <p className="text-muted-foreground">Here are the results from your most recent mock tests.</p>
                </div>
                <Button asChild>
                    <Link href="/">
                        <Compass className="mr-2 h-4 w-4" />
                        Browse All Tests
                    </Link>
                </Button>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {testHistories.map((history) => (
                    history && <TestHistoryCard key={history.test.id} test={history.test} sessions={history.sessions} />
                ))}
             </div>
          </div>
          
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-6 w-6" />
                    News & Announcements
                  </CardTitle>
                  <CardDescription>Stay up to date with the latest platform news.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-start gap-4">
                    <Bell className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold">New "React Hooks" Quiz Available!</h3>
                        <p className="text-sm text-muted-foreground">We've just launched a new quiz to test your knowledge of React Hooks. Give it a try now!</p>
                        <p className="text-xs text-muted-foreground mt-1">July 22, 2024</p>
                    </div>
                 </div>
                 <Separator />
                 <div className="flex items-start gap-4">
                    <Bell className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold">Scheduled Maintenance</h3>
                        <p className="text-sm text-muted-foreground">The platform will be down for scheduled maintenance on July 25th from 2:00 AM to 3:00 AM UTC.</p>
                        <p className="text-xs text-muted-foreground mt-1">July 20, 2024</p>
                    </div>
                 </div>
              </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle>Progress Over Time</CardTitle>
                <CardDescription>Your scores on the last 5 mock tests.</CardDescription>
             </CardHeader>
             <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <RechartsBarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid vertical={false}/>
                         <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            />
                        <YAxis domain={[0, 100]} unit="%" tickMargin={10} axisLine={false} tickLine={false}/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]}/>
                    </RechartsBarChart>
                </ChartContainer>
             </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
