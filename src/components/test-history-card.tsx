
import type { Test, TestAttempt, TestSession } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Repeat, TrendingUp, TrendingDown, Minus, PlayCircle, BarChart, Calendar } from "lucide-react";
import Link from "next/link";
import { RelativeTime } from "./relative-time";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface TestHistoryCardProps {
  test: Test;
  session: TestSession;
  attempts: TestAttempt[];
}

export function TestHistoryCard({ test, session, attempts }: TestHistoryCardProps) {
  if (!test) return null;

  const completedAttempts = attempts.filter(a => a.status === 'completed');
  const inProgressAttempt = attempts.find(a => a.status === 'in-progress');

  const latestAttempt = completedAttempts[0];
  const previousAttempt = completedAttempts[1];

  let latestScore: number | null = null;
  if (latestAttempt) {
    latestScore = Math.round((latestAttempt.score / latestAttempt.totalQuestions) * 100);
  }
  
  let improvement: number | null = null;
  if (latestAttempt && previousAttempt) {
    const previousScore = Math.round((previousAttempt.score / previousAttempt.totalQuestions) * 100);
    improvement = latestScore! - previousScore;
  }

  const getContinueUrl = () => {
      if (!inProgressAttempt) return `/mock-test/${test.id}?session=${session.id}`;
      const answersQuery = encodeURIComponent(JSON.stringify(inProgressAttempt.answers || {}));
      return `/mock-test/${test.id}?session=${session.id}&answers=${answersQuery}`;
  }

  const getImprovementIcon = () => {
    if (improvement === null) return null;
    if (improvement > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (improvement < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <Link href={`/profile/test/${test.id}`} className="group">
                 <CardTitle className="text-xl group-hover:underline">{test.title}</CardTitle>
                 <CardDescription className="flex items-center gap-1.5 text-xs mt-1">
                    <Calendar className="h-3 w-3" />
                    Session from <RelativeTime date={session.startedDate} />
                 </CardDescription>
            </Link>
             {latestScore !== null && (
                <div className="flex items-center gap-1 text-sm">
                    <span className="text-muted-foreground text-xs">Latest:</span>
                    <span className="font-bold text-lg text-primary">{latestScore}%</span>
                </div>
            )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        {inProgressAttempt && (
            <div className="p-3 rounded-md bg-blue-50 border border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300">In Progress</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                    You started this test <RelativeTime date={inProgressAttempt.date} />.
                </p>
                <Button asChild size="sm" className="mt-2 w-full bg-blue-600 hover:bg-blue-700">
                    <Link href={getContinueUrl()}>
                        <PlayCircle className="mr-2 h-4 w-4"/>
                        Continue Test
                    </Link>
                </Button>
            </div>
        )}
        <h4 className="text-sm font-semibold text-muted-foreground">Completed Attempts ({completedAttempts.length}):</h4>
        {completedAttempts.length > 0 ? (
            <ul className="space-y-2">
                {completedAttempts.slice(0, 3).map((attempt, index) => {
                    const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
                    return (
                         <li key={attempt.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-muted/50">
                            <div className="flex flex-col">
                               <span>Score: <span className="font-semibold">{percentage}%</span> ({attempt.score}/{attempt.totalQuestions})</span>
                               <span className="text-xs text-muted-foreground">
                                 <RelativeTime date={attempt.date} />
                               </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {index === 0 && improvement !== null && (
                                     <div className="flex items-center gap-1 text-xs">
                                        {getImprovementIcon()}
                                        <span className={cn(
                                            "font-semibold",
                                            improvement > 0 && "text-green-500",
                                            improvement < 0 && "text-red-500",
                                            improvement === 0 && "text-muted-foreground",
                                        )}>
                                            {improvement > 0 ? `+${improvement}` : improvement}%
                                        </span>
                                    </div>
                                )}
                                {index === 0 && <Badge variant="secondary">Latest</Badge>}
                            </div>
                        </li>
                    )
                })}
            </ul>
        ) : (
            <p className="text-sm text-muted-foreground italic">No tests completed yet.</p>
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button asChild className="w-full" variant="secondary">
          <Link href={`/profile/test/${test.id}`}>
            <BarChart className="mr-2 h-4 w-4" />
            View Stats
          </Link>
        </Button>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/mock-test/${test.id}?session=${session.id}`}>
            <Repeat className="mr-2 h-4 w-4" />
            Take Again
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
