
import type { Test, TestAttempt } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Repeat, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from "next/link";
import { RelativeTime } from "./relative-time";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface TestHistoryCardProps {
  test: Test;
  attempts: TestAttempt[];
}

export function TestHistoryCard({ test, attempts }: TestHistoryCardProps) {
  if (!test) return null;

  const latestAttempt = attempts[0];
  const previousAttempt = attempts[1];

  const latestScore = Math.round((latestAttempt.score / latestAttempt.totalQuestions) * 100);
  let improvement: number | null = null;
  
  if (previousAttempt) {
    const previousScore = Math.round((previousAttempt.score / previousAttempt.totalQuestions) * 100);
    improvement = latestScore - previousScore;
  }

  const getImprovementIcon = () => {
    if (improvement === null || improvement === 0) return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (improvement > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <CardTitle className="text-xl">{test.title}</CardTitle>
                 <CardDescription>
                   Latest score: <span className="font-bold text-primary">{latestScore}%</span>
                 </CardDescription>
            </div>
             {improvement !== null && (
                <div className="flex items-center gap-1 text-sm">
                    {getImprovementIcon()}
                    <span className={cn(
                        "font-semibold",
                        improvement > 0 && "text-green-500",
                        improvement < 0 && "text-red-500",
                        improvement === 0 && "text-muted-foreground",
                    )}>
                        {improvement > 0 ? `+${improvement}` : improvement}%
                    </span>
                    <span className="text-muted-foreground text-xs">(vs prev)</span>
                </div>
            )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground">Recent Attempts:</h4>
        <ul className="space-y-2">
            {attempts.slice(0, 3).map((attempt, index) => {
                const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
                return (
                     <li key={attempt.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-muted/50">
                        <div className="flex flex-col">
                           <span>Score: <span className="font-semibold">{percentage}%</span> ({attempt.score}/{attempt.totalQuestions})</span>
                           <span className="text-xs text-muted-foreground">
                             <RelativeTime date={attempt.date} />
                           </span>
                        </div>
                        {index === 0 && <Badge variant="secondary">Latest</Badge>}
                    </li>
                )
            })}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/quiz/${test.id}`}>
            <Repeat className="mr-2 h-4 w-4" />
            Take Again
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
