
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Question, Test, UserAnswers } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizInterfaceProps {
  test: Test;
  questions: Question[];
}

export function QuizInterface({ test, questions }: QuizInterfaceProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
    setShowFeedback(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowFeedback(false);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowFeedback(false);
    }
  };

  const handleSubmit = () => {
    const answersQuery = encodeURIComponent(JSON.stringify(answers));
    router.push(`/quiz/${test.id}/results?answers=${answersQuery}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl rounded-xl">
        <CardHeader className="pb-2">
          <CardDescription className="text-center">{test.title}</CardDescription>
          <div className="flex justify-center items-center gap-2 my-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === currentQuestionIndex ? "bg-accent scale-125" : "bg-muted"
                )}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <CardTitle className="text-2xl pt-4 text-center">{currentQuestion.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            className="space-y-4"
          >
            {currentQuestion.choices.map((choice) => {
              return (
                <Label
                  key={choice.id}
                  htmlFor={choice.id}
                  className={
                    "flex items-center space-x-4 rounded-lg border p-4 transition-all hover:bg-secondary has-[:checked]:bg-accent has-[:checked]:text-accent-foreground has-[:checked]:shadow-inner"
                  }
                >
                  <RadioGroupItem value={choice.id} id={choice.id} />
                  <span className="flex-1 text-base">{choice.text}</span>
                </Label>
              );
            })}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          {currentQuestionIndex < questions.length - 1 ? (
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
              <CheckSquare className="mr-2 h-4 w-4" /> Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
