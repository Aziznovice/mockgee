
"use client";

import type { Test } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ListChecks, Pencil } from "lucide-react";
import { Progress } from "./ui/progress";
import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

interface TestOverviewProps {
    test: Test;
    onStart: (duration: number | null) => void;
}

export function TestOverview({ test, onStart }: TestOverviewProps) {
    const totalQuestions = test.subjects?.reduce((sum, s) => sum + s.questionCount, 0) ?? test.questionCount ?? 0;
    
    const initialHours = test.duration ? Math.floor(test.duration / 60) : 0;
    const initialMinutes = test.duration ? test.duration % 60 : 0;

    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const totalDurationInMinutes = useMemo(() => {
        return (hours * 60) + minutes;
    }, [hours, minutes]);

    const handleStart = () => {
        onStart(totalDurationInMinutes > 0 ? totalDurationInMinutes : null);
    }
    
    const handleSetTime = () => {
        setIsPopoverOpen(false);
    }

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
                     <div className="text-center space-y-4">
                        {test.duration ? (
                            <div className="flex flex-col items-center gap-2">
                                <Label className="text-lg">Time Limit</Label>
                                <div className="flex items-center gap-2">
                                    <div className="text-2xl font-bold p-2 rounded-md bg-muted min-w-[120px]">
                                        {totalDurationInMinutes > 0 ? `${totalDurationInMinutes} minutes` : 'No time limit'}
                                    </div>
                                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto">
                                            <div className="space-y-4">
                                                <h4 className="font-medium text-center">Set Custom Time</h4>
                                                <div className="flex items-center gap-2">
                                                    <div>
                                                        <Label htmlFor="hours">Hours</Label>
                                                        <Input id="hours" type="number" value={hours} onChange={e => setHours(Math.max(0, parseInt(e.target.value) || 0))} className="w-20" />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="minutes">Minutes</Label>
                                                        <Input id="minutes" type="number" value={minutes} onChange={e => setMinutes(Math.max(0, parseInt(e.target.value) || 0))} className="w-20" />
                                                    </div>
                                                </div>
                                                <Button onClick={handleSetTime} className="w-full">Set Time</Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        ) : (
                            <div className="text-lg">
                                This test does not have a time limit.
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-around">
                     {test.duration ? (
                        <Button onClick={handleStart} size="lg" className="w-full sm:w-auto">
                            <Clock className="mr-2 h-5 w-5" />
                            Start with Timer
                        </Button>
                    ) : null}
                     <Button onClick={() => onStart(null)} size="lg" variant={test.duration ? 'outline' : 'default'} className="w-full sm:w-auto">
                        Start without Timer
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
