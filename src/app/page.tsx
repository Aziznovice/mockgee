
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { tests } from "@/lib/data";
import type { Test } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";


function TestStartDialog({ test, children }: { test: Test, children: React.ReactNode }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleStart = (useTimer: boolean) => {
        const params = new URLSearchParams();
        if (useTimer && test.duration) {
            params.append('timer', test.duration.toString());
        }
        router.push(`/mock-test/${test.id}?${params.toString()}`);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Start "{test.title}"</DialogTitle>
                    <DialogDescription>{test.description}</DialogDescription>
                </DialogHeader>
                <div className="text-center py-4">
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
                <DialogFooter className="sm:justify-around">
                    {test.duration && (
                        <Button onClick={() => handleStart(true)} size="lg">
                            <Clock className="mr-2 h-5 w-5" />
                            Start with Timer
                        </Button>
                    )}
                     <Button onClick={() => handleStart(false)} size="lg" variant={test.duration ? 'outline' : 'default'}>
                        Start without Timer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 bg-muted">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <section className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Welcome to QuizWise
            </h1>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Select a mock test below to test your knowledge. Sharpen your skills and learn something new!
            </p>
          </section>

          <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((test) => (
              <Card key={test.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="aspect-video overflow-hidden rounded-md -mt-2 -mx-2 mb-4 border-b">
                     <Image
                      src={test.imageUrl}
                      alt={test.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                      data-ai-hint="quiz knowledge"
                    />
                  </div>
                  <CardTitle className="font-headline text-2xl">{test.title}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{test.allQuestionIds.length} questions</span>
                    {test.duration && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{test.duration} min</span>}
                  </div>
                </CardContent>
                <CardFooter>
                    <TestStartDialog test={test}>
                        <Button className="w-full">
                            Start Mock Test <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </TestStartDialog>
                </CardFooter>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
