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
import { User, TrendingUp, BarChart } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
        <div className="mx-auto max-w-4xl space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary">
                <AvatarImage src="https://placehold.co/100x100" alt="User Avatar" />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">Alex Doe</CardTitle>
                <CardDescription>alex.doe@example.com</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-muted-foreground"/>
                        <span><span className="font-bold">{totalTests}</span> tests taken</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-muted-foreground"/>
                        <span>Average Score: <span className="font-bold">{averageScore}%</span></span>
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
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <RechartsBarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false}/>
                         <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            />
                        <YAxis domain={[0, 100]} unit="%"/>
                        <ChartTooltip content={<ChartTooltipContent />}/>
                        <Bar dataKey="score" fill="var(--color-score)" radius={4}/>
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
                    <TableHead>Date</TableHead>
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
                           <Badge variant={percentage > 70 ? "default" : "secondary"}>{percentage}%</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={percentage} className="w-24" />
                            <span>{attempt.score}/{attempt.totalQuestions}</span>
                          </div>
                        </TableCell>
                        <TableCell title={format(new Date(attempt.date), "PPP p")}>
                          {formatDistanceToNow(new Date(attempt.date), { addSuffix: true })}
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