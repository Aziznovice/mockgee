
import { TestAttempt } from "@/lib/types";
import { getTestById } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RelativeTime } from "@/components/relative-time";

interface TestAttemptCardProps {
  attempt: TestAttempt;
}

export function TestAttemptCard({ attempt }: TestAttemptCardProps) {
  const test = getTestById(attempt.testId);
  const percentage = Math.round(
    (attempt.score / attempt.totalQuestions) * 100
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{test?.title || "Unknown Test"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Score</span>
            <Badge variant={percentage > 70 ? "default" : "secondary"} className="text-base">{percentage}%</Badge>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progress</span>
            <div className="flex items-center gap-2">
                <Progress value={percentage} className="w-24 h-2" />
                <span className="text-muted-foreground">{attempt.score}/{attempt.totalQuestions}</span>
            </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm text-muted-foreground">Date</span>
            <RelativeTime date={attempt.date} />
        </div>
      </CardContent>
    </Card>
  );
}
