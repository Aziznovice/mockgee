
"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Question, Test, UserAnswers, QuestionGroup } from "@/lib/types";
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
import { ArrowLeft, ArrowRight, CheckSquare, LayoutGrid, Rows3, BoxSelect } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface QuizInterfaceProps {
  test: Test;
  questions: Question[];
  questionGroups: QuestionGroup[];
  sessionId: string;
  initialAnswers?: UserAnswers;
}

type QuizItem = { type: 'question', data: Question } | { type: 'group', data: QuestionGroup, questions: Question[] };

export function QuizInterface({ test, questions, questionGroups, sessionId, initialAnswers = {} }: QuizInterfaceProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>(initialAnswers);
  const [view, setView] = useState<"card" | "form">("card");

  const allQuestions = useMemo(() => {
    return questions.sort((a,b) => (a.groupId || '').localeCompare(b.groupId || ''));
  }, [questions]);
  
  const formItems: QuizItem[] = useMemo(() => {
    const items: QuizItem[] = [];
    const standaloneQuestions = questions.filter(q => !q.groupId);
    questionGroups.forEach(g => {
        const questionsForGroup = questions.filter(q => q.groupId === g.id);
        if(questionsForGroup.length > 0){
            items.push({ type: 'group', data: g, questions: questionsForGroup });
        }
    });
    standaloneQuestions.forEach(q => {
        items.push({ type: 'question', data: q });
    });
    return items;
  }, [questions, questionGroups]);

  const currentQuestion = allQuestions[currentQuestionIndex];
  const currentGroup = currentQuestion?.groupId ? questionGroups.find(g => g.id === currentQuestion.groupId) : null;

  const handleAnswerChange = (questionId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const answersQuery = encodeURIComponent(JSON.stringify(answers));
    router.push(`/mock-test/${test.id}/results?session=${sessionId}&answers=${answersQuery}`);
  };

  const renderSingleQuestionForm = (question: Question, index?: number) => (
    <Card key={question.id} className="shadow-lg rounded-xl">
        <CardHeader>
            <CardTitle className="text-lg">
                {index !== undefined ? `Question ${index + 1}: ` : ''}
                {question.text}
            </CardTitle>
             {question.imageUrl && (
                <div className="pt-4">
                    <Image src={question.imageUrl} alt="Question image" width={300} height={200} className="rounded-md" />
                </div>
            )}
        </CardHeader>
        <CardContent>
                <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
                className="space-y-3"
                >
                {question.choices.map((choice) => {
                    return (
                    <Label
                        key={choice.id}
                        htmlFor={`${question.id}-${choice.id}-form`}
                        className="flex items-center space-x-3 p-3 rounded-md border hover:bg-secondary transition-colors"
                    >
                        <RadioGroupItem value={choice.id} id={`${question.id}-${choice.id}-form`} />
                        <span className="text-base">{choice.text}</span>
                    </Label>
                    );
                })}
                </RadioGroup>
        </CardContent>
    </Card>
  )

  const renderGroupForm = (group: QuestionGroup, groupQuestions: Question[]) => {
    return (
        <Card key={group.id} className="shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="bg-muted">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <BoxSelect className="h-6 w-6 text-primary" />
                    Reference Material
                </CardTitle>
                {group.referenceText && <CardDescription className="pt-2">{group.referenceText}</CardDescription>}
            </CardHeader>
            <CardContent className="p-0">
                 {group.referenceImageUrl && (
                    <div className="p-4 border-b">
                        <Image src={group.referenceImageUrl} alt="Group reference" width={400} height={300} className="rounded-md object-cover" />
                    </div>
                )}
                <div className="p-4 lg:p-6 space-y-6">
                 {groupQuestions.map((q, idx) => renderSingleQuestionForm(q, idx))}
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="font-semibold text-lg md:text-2xl">{test.title}</h1>
                    <p className="text-sm text-muted-foreground">
                        Question {currentQuestionIndex + 1} of {allQuestions.length}
                    </p>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                    <Button variant={view === 'card' ? 'secondary' : 'ghost'} size="icon" className="h-7 w-7" onClick={() => setView('card')}>
                        <Rows3 className="h-4 w-4"/>
                        <span className="sr-only">Card View</span>
                    </Button>
                    <Button variant={view === 'form' ? 'secondary' : 'ghost'} size="icon" className="h-7 w-7" onClick={() => setView('form')}>
                        <LayoutGrid className="h-4 w-4"/>
                        <span className="sr-only">Form View</span>
                    </Button>
                </div>
            </div>

            {view === 'card' ? (
                <div className={cn("grid grid-cols-1 gap-8", currentGroup ? "lg:grid-cols-2 lg:gap-12" : "")}>
                    {currentGroup && (
                        <div>
                             <Card className="shadow-xl rounded-xl sticky top-24">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BoxSelect className="h-5 w-5 text-primary"/>
                                        Reference Material
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {currentGroup.referenceImageUrl && (
                                        <div className="mb-4">
                                            <Image src={currentGroup.referenceImageUrl} alt="Reference" width={500} height={350} className="rounded-md w-full" />
                                        </div>
                                    )}
                                    {currentGroup.referenceText && (
                                        <ScrollArea className="h-[400px]">
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{currentGroup.referenceText}</p>
                                        </ScrollArea>
                                    )}
                                </CardContent>
                             </Card>
                        </div>
                    )}
                    <div className={cn(!currentGroup && "max-w-2xl mx-auto w-full")}>
                        <Card className="w-full shadow-2xl rounded-xl">
                        <CardHeader className="pb-2">
                            <div className="flex justify-center items-center gap-2 my-4">
                                {allQuestions.map((q, index) => {
                                    const isAnswered = answers[q.id];
                                    return (
                                    <div
                                        key={index}
                                        className={cn(
                                        "h-2 w-full rounded-full transition-all cursor-pointer flex-1",
                                        index === currentQuestionIndex ? "bg-primary" : (isAnswered ? "bg-primary/30" : "bg-muted hover:bg-muted-foreground/50")
                                        )}
                                        style={{maxWidth: `calc(${100/allQuestions.length}% - 4px)`}}
                                        onClick={() => setCurrentQuestionIndex(index)}
                                    />
                                )})}
                            </div>
                            <Separator className="my-4"/>
                            <CardTitle className="text-2xl pt-4 text-center">{currentQuestion.text}</CardTitle>
                             {currentQuestion.imageUrl && (
                                <div className="pt-4 flex justify-center">
                                    <Image src={currentQuestion.imageUrl} alt="Question reference" width={300} height={200} className="rounded-md object-cover" />
                                </div>
                            )}
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
                                    htmlFor={`${currentQuestion.id}-${choice.id}`}
                                    className={
                                    "flex items-center space-x-4 rounded-lg border p-4 transition-all hover:bg-secondary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:shadow-inner cursor-pointer"
                                    }
                                >
                                    <RadioGroupItem value={choice.id} id={`${currentQuestion.id}-${choice.id}`} />
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
                            {currentQuestionIndex < allQuestions.length - 1 ? (
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
                </div>
            ) : (
                <div className="space-y-6">
                    {formItems.map(item => {
                        if (item.type === 'group') {
                            return renderGroupForm(item.data, item.questions);
                        }
                        return renderSingleQuestionForm(item.data);
                    })}
                    <div className="flex justify-end pt-4">
                        <Button onClick={handleSubmit} size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckSquare className="mr-2 h-5 w-5" /> Submit Mock Test
                        </Button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}
