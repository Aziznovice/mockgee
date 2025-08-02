"use client";

import type { Question, Test, UserAnswers } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Lightbulb, Repeat } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface ResultsDisplayProps {
  test: Test;
  questions: Question[];
  userAnswers: UserAnswers;
}

export function ResultsDisplay({ test, questions, userAnswers }: ResultsDisplayProps) {
  const score = questions.reduce((acc, question) => {
    return userAnswers[question.id] === question.correctChoiceId ? acc + 1 : acc;
  }, 0);
  const scorePercentage = Math.round((score / questions.length) * 100);

  const getChoiceText = (question: Question, choiceId: string | undefined) => {
      if (!choiceId) return "Not answered";
      return question.choices.find(c => c.id === choiceId)?.text || "Invalid answer";
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl rounded-xl mb-8">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-3xl">Results for {test.title}</CardTitle>
          <CardDescription>You've completed the quiz!</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-bold font-headline text-accent">{scorePercentage}%</div>
          <p className="text-xl text-muted-foreground mt-2">You answered {score} out of {questions.length} questions correctly.</p>
          <div className="mt-6 flex gap-4 justify-center">
             <Button asChild>
                <Link href={`/quiz/${test.id}`}>
                    <Repeat className="mr-2 h-4 w-4"/>
                    Try Again
                </Link>
             </Button>
             <Button asChild variant="outline">
                <Link href="/">
                    Back to Quizzes
                </Link>
             </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="w-full max-w-3xl space-y-4">
        <h2 className="text-2xl font-headline font-semibold text-center">Answer Breakdown</h2>
        {questions.map((question, index) => {
            const userAnswerId = userAnswers[question.id];
            const isCorrect = userAnswerId === question.correctChoiceId;
            const correctChoiceText = getChoiceText(question, question.correctChoiceId);
            const userAnswerText = getChoiceText(question, userAnswerId);

            return (
                <Card key={question.id} className={cn("overflow-hidden", isCorrect ? "border-correct" : "border-incorrect")}>
                    <CardHeader>
                        <CardTitle className="flex items-start gap-4 text-lg">
                            {isCorrect ? <CheckCircle className="h-6 w-6 text-correct flex-shrink-0 mt-1"/> : <XCircle className="h-6 w-6 text-incorrect flex-shrink-0 mt-1"/>}
                            <span>{index + 1}. {question.text}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2 text-sm">
                            <p>Your answer: <span className={cn("font-semibold", isCorrect ? "text-correct" : "text-incorrect")}>{userAnswerText}</span></p>
                            {!isCorrect && (
                                <p>Correct answer: <span className="font-semibold text-correct">{correctChoiceText}</span></p>
                            )}
                        </div>
                        <Accordion type="single" collapsible className="w-full mt-4">
                            <AccordionItem value="explanation" className="border-none">
                                <AccordionTrigger className="text-explanation-foreground hover:no-underline p-2 rounded-md bg-explanation/40">
                                    <div className="flex items-center gap-2">
                                        <Lightbulb className="h-4 w-4"/>
                                        Show Explanation
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="mt-2 p-4 rounded-md bg-explanation border border-explanation-border">
                                    <p className="text-explanation-foreground">{question.explanation}</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
