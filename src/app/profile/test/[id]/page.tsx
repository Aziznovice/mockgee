

"use client";

import { notFound, useParams } from "next/navigation";
import { getTestById, getTestAttemptsForUser, getSessionById, questions as allQuestions } from "@/lib/data";
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
import { ArrowLeft, Repeat, Trophy, TrendingUp, TrendingDown, Star, Clock, Info } from "lucide-react";
import { RelativeTime } from "@/components/relative-time";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceStrict } from "date-fns";
import { Progress } from "@/components/ui/progress";
import type { Question } from "@/lib/types";

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

    const latestAttempt = testAttempts[0];

    const subjectPerformance = test.subjects?.map(subject => {
        if (!latestAttempt?.answers) return { name: subject.name, score: 0, questionCount: 0 };
        
        const subjectQuestionIds = allQuestions
            .filter(q => subject.tags.every(tag => q.tags.includes(tag)))
            .map(q => q.id);

        let correctAnswers = 0;
        const questionsInAttempt = Object.keys(latestAttempt.answers).filter(qId => subjectQuestionIds.includes(qId));
        
        questionsInAttempt.forEach(qId => {
            const question = allQuestions.find(q => q.id === qId);
            if (question && latestAttempt.answers![qId] === question.correctChoiceId) {
                correctAnswers++;
            }
        });

        return {
            name: subject.name,
            score: correctAnswers,
            questionCount: questionsInAttempt.length
        };
    }).filter(s => s.questionCount > 0);


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
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

            {test.subjects && test.subjects.length > 0 && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Performance by Subject</CardTitle>
                        <CardDescription>
                           Breakdown of your score in the most recent attempt.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {subjectPerformance && subjectPerformance.length > 0 ? (
                             subjectPerformance.map(subject => {
                                const percentage = subject.questionCount > 0 ? Math.round((subject.score / subject.questionCount) * 100) : 0;
                                return (
                                    <div key={subject.name}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">{subject.name}</span>
                                            <span className="text-sm text-muted-foreground">{subject.score}/{subject.questionCount} ({percentage}%)</span>
                                        </div>
                                        <Progress value={percentage} />
                                    </div>
                                )
                            })
                        ) : (
                             <div className="flex items-center gap-3 text-sm text-muted-foreground p-4 bg-muted rounded-md">
                                <Info className="h-5 w-5"/>
                                <span>No subjects were found in your last attempt. Take the test to see your subject breakdown.</span>
                             </div>
                        )}
                    </CardContent>
                </Card>
            )}

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
