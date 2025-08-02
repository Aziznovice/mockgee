
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
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getTestAttemptsForUser, getTestById } from "@/lib/data";
import { TestAttempt } from "@/lib/types";
import { User, TrendingUp, BarChart, Trophy } from "lucide-react";
import { format } from "date-fns";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button";
import { RelativeTime } from "@/components/relative-time";

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function ProfilePage() {
    const testAttempts = getTestAttemptsForUser();
    const totalTests = testAttempts.length;
    const averageScore = totalTests > 0 
        ? Math.round(testAttempts.reduce((acc, attempt) => acc + (attempt.score / attempt.totalQuestions) * 100, 0) / totalTests)
        : 0;
    const highestScore = totalTests > 0
        ? Math.max(...testAttempts.map(attempt => Math.round((attempt.score / attempt.totalQuestions) * 100)))
        : 0;

    const chartData = testAttempts.slice(0, 5).reverse().map(attempt => {
        const test = getTestById(attempt.testId);
        return {
            name: test?.title.slice(0,15) + "..." || "Test",
            score: Math.round((attempt.score / attempt.totalQuestions) * 100),
        }
    });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
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
                        <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}/>
                    </RechartsBarChart>
                </ChartContainer>
             </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Mock Tests</CardTitle>
              <CardDescription>
                Here are the results from your most recent mock tests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mock Test</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testAttempts.map((attempt: TestAttempt) => {
                    const test = getTestById(attempt.testId);
                    const percentage = Math.round(
                      (attempt.score / attempt.totalQuestions) * 100
                    );
                    return (
                      <TableRow key={attempt.id}>
                        <TableCell className="font-medium">
                          {test?.title || "Unknown Test"}
                        </TableCell>
                        <TableCell>
                           <Badge variant={percentage > 70 ? "default" : "secondary"} className="text-base">{percentage}%</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={percentage} className="w-24 h-2" />
                            <span className="text-muted-foreground">{attempt.score}/{attempt.totalQuestions}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground" title={format(new Date(attempt.date), "PPP p")}>
                          <RelativeTime date={attempt.date} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
