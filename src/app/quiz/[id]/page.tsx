import { notFound } from "next/navigation";
import { getTestById, getQuestionsForTest } from "@/lib/data";
import { Header } from "@/components/header";
import { QuizInterface } from "@/components/quiz-interface";
import type { UserAnswers } from "@/lib/types";

export default function QuizPage({ params, searchParams }: { params: { id: string }, searchParams?: { [key: string]: string | string[] | undefined } }) {
  const test = getTestById(params.id);
  
  if (!test) {
    notFound();
  }

  const questions = getQuestionsForTest(params.id);
  let initialAnswers: UserAnswers = {};

  try {
    const answersParam = searchParams?.answers;
    if (typeof answersParam === 'string') {
      initialAnswers = JSON.parse(decodeURIComponent(answersParam));
    }
  } catch (error) {
    console.error("Failed to parse initial answers:", error);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 pt-8 bg-muted">
        <QuizInterface test={test} questions={questions} initialAnswers={initialAnswers} />
      </main>
    </div>
  );
}
