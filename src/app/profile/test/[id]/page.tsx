
"use client";

import { notFound, useParams } from "next/navigation";
import { getTestById, getTestAttemptsForUser } from "@/lib/data";
import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Repeat, Trophy, TrendingUp, TrendingDown, Star, Clock } from "lucide-react";
import { RelativeTime } from "@/components/relative-time";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceStrict } from "date-fns";

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function TestStatsPage() {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : '';
    const test = getTestById(id);

    if (!test) {
        notFound();
    }

    const allUserAttempts = getTestAttemptsForUser();
    const testAttempts = allUserAttempts.filter(a => {
        const session = getSessionById(a.sessionId);
        return session?.testId === id && a.status === 'completed';
    });
    

    const completedCount = testAttempts.length;

    const scores = testAttempts.map(a => Math.round((a.score / a.totalQuestions) * 100));
    const highestScore = completedCount > 0 ? Math.max(...scores) : 0;
    const lowestScore = completedCount > 0 ? Math.min(...scores) : 0;
    const averageScore = completedCount > 0 ? Math.round(scores.reduce((acc, s) => acc + s, 0) / completedCount) : 0;
    
    const chartData = testAttempts.map((attempt, index) => ({
        name: `Attempt ${index + 1}`,
        score: Math.round((attempt.score / attempt.totalQuestions) * 100),
        date: attempt.completedDate
    })).reverse();

    const getMotivationalMessage = () => {
        if (highestScore >= 90) return "Excellent work! You have mastered this topic. Keep up the great momentum!";
        if (highestScore >= 75) return "Great job! You're getting really good at this. A little more practice and you'll be a pro.";
        if (highestScore >= 50) return "Solid effort! You've built a good foundation. Keep practicing to solidify your knowledge.";
        if (completedCount > 0) return "You're just getting started! Every attempt is a learning opportunity. Keep going!";
        return "Ready to test your knowledge? Take the first attempt and see how you do!";
    }
    
    const formatDuration = (start: string, end: string) => {
        if (!start || !end) return null;
        return formatDistanceStrict(new Date(end), new Date(start));
    }


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 sm:p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <div>
            <Button asChild variant="outline" size="sm">
                <Link href="/profile">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Profile
                </Link>
            </Button>
          </div>
          
          <Card>
              <CardHeader>
                  <CardTitle className="text-3xl">{test.title}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
              </CardHeader>
          </Card>
          
          <Card className="bg-primary/10 border-primary/40">
            <CardHeader className="flex-row items-center gap-4">
                <Star className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                     <CardTitle>Your Progress Summary</CardTitle>
                     <p className="text-primary/90">{getMotivationalMessage()}</p>
                </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{highestScore}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lowest Score</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lowestScore}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageScore}%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
             <CardHeader>
                <CardTitle>Score History</CardTitle>
                <CardDescription>Your performance across all attempts for this test.</CardDescription>
             </CardHeader>
             <CardContent>
                {completedCount > 0 ? (
                 <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <RechartsLineChart accessibilityLayer data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid vertical={false}/>
                         <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            />
                        <YAxis domain={[0, 100]} unit="%" tickMargin={10} axisLine={false} tickLine={false}/>
                        <ChartTooltip 
                            cursor={false} 
                            content={<ChartTooltipContent 
                                indicator="dot" 
                                labelFormatter={(value, payload) => {
                                    const date = payload[0]?.payload.date;
                                    return (
                                        <div>
                                            <div>{value}</div>
                                            {date && <div className="text-xs text-muted-foreground"><RelativeTime date={date}/></div>}
                                        </div>
                                    )
                                }}
                            />} 
                        />
                        <Line dataKey="score" type="monotone" stroke="var(--color-score)" strokeWidth={2} dot={{r: 4, fill: "var(--color-score)"}} activeDot={{r: 6}}/>
                    </RechartsLineChart>
                </ChartContainer>
                ) : (
                    <p className="text-sm text-muted-foreground italic">No completed attempts yet.</p>
                )}
             </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle>All Attempts ({completedCount})</CardTitle>
                <CardDescription>A detailed log of all your completed attempts.</CardDescription>
            </CardHeader>
            <CardContent>
                {completedCount > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Attempt</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead className="text-right">Result</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testAttempts.map((attempt, index) => {
                            const scorePercent = Math.round((attempt.score / attempt.totalQuestions) * 100);
                            const duration = formatDuration(attempt.startedDate, attempt.completedDate)
                            return (
                                <TableRow key={attempt.id}>
                                    <TableCell className="font-medium">Attempt #{completedCount - index}</TableCell>
                                    <TableCell><RelativeTime date={attempt.completedDate}/></TableCell>
                                    <TableCell className="text-muted-foreground text-xs">{duration}</TableCell>
                                    <TableCell>{attempt.score}/{attempt.totalQuestions}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={scorePercent >= 75 ? "default" : "secondary"} className={cn(scorePercent >= 75 ? "bg-green-600" : scorePercent < 50 && "bg-red-600", "text-white")}>
                                            {scorePercent}%
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                ) : (
                    <p className="text-sm text-muted-foreground italic">No completed attempts to display.</p>
                )}
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button asChild className="w-full sm:w-auto ml-auto">
                    <Link href={`/mock-test/${test.id}`}>
                        <Repeat className="mr-2 h-4 w-4"/>
                        Take Again
                    </Link>
                </Button>
            </CardFooter>
          </Card>
          
        </div>
      </main>
    </div>
  );
}

// Helper function to find a session by ID
function getSessionById(sessionId: string) {
    // In a real app, this would fetch from your data source.
    // For now, we'll assume testSessions is available in this scope
    // You might need to import it if it's in another file.
    // import { testSessions } from "@/lib/data";
    // This is a placeholder. You need to get the sessions data here.
    return null;
}
