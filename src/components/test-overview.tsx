
"use client";

import type { Test } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ListChecks } from "lucide-react";
import { Progress } from "./ui/progress";

interface TestOverviewProps {
    test: Test;
    onStart: (useTimer: boolean) => void;
}

export function TestOverview({ test, onStart }: TestOverviewProps) {
    const totalQuestions = test.subjects?.reduce((sum, s) => sum + s.questionCount, 0) ?? test.questionCount ?? 0;

    return (
        <div className="container mx-auto flex justify-center items-center h-[calc(100vh-200px)] p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-headline">{test.title}</CardTitle>
                    <CardDescription className="text-base pt-2">{test.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4 p-4 rounded-lg border bg-muted/50">
                        <h3 className="font-semibold flex items-center gap-2"><ListChecks className="h-5 w-5 text-primary" /> Subject Breakdown</h3>
                        {test.subjects && test.subjects.length > 0 ? (
                            <div className="space-y-3">
                                {test.subjects.map(subject => {
                                    const percentage = totalQuestions > 0 ? Math.round((subject.questionCount / totalQuestions) * 100) : 0;
                                    return (
                                        <div key={subject.id}>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-medium">{subject.name}</span>
                                                <span className="text-sm text-muted-foreground">{subject.questionCount} questions ({percentage}%)</span>
                                            </div>
                                            <Progress value={percentage} />
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                             <p className="text-sm text-muted-foreground">This test covers a general mix of topics.</p>
                        )}
                    </div>
                     <div className="text-center">
                        {test.duration ? (
                            <div className="text-lg">
                            This test has a recommended time limit of <span className="font-bold">{test.duration} minutes</span>.
                            </div>
                        ) : (
                            <div className="text-lg">
                                This test does not have a time limit.
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-around">
                     {test.duration && (
                        <Button onClick={() => onStart(true)} size="lg" className="w-full sm:w-auto">
                            <Clock className="mr-2 h-5 w-5" />
                            Start with Timer
                        </Button>
                    )}
                     <Button onClick={() => onStart(false)} size="lg" variant={test.duration ? 'outline' : 'default'} className="w-full sm:w-auto">
                        Start without Timer
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
