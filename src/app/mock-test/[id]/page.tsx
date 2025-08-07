

import { notFound } from "next/navigation";
import { getTestById, getQuestionsForSession, getOrCreateTestSession, getQuestionGroupsForSession } from "@/lib/data";
import { Header } from "@/components/header";
import { QuizInterface } from "@/components/quiz-interface";
import type { UserAnswers } from "@/lib/types";

export default function MockTestPage({ params, searchParams }: { params: { id: string }, searchParams?: { [key: string]: string | string[] | undefined } }) {
  const test = getTestById(params.id);
  
  if (!test) {
    notFound();
  }

  // When starting a new test, we find or create a session.
  // The session ID could be passed in the URL for continuing a test.
  const sessionId = typeof searchParams?.session === 'string' 
    ? searchParams.session 
    : getOrCreateTestSession(test.id)?.id;

  if (!sessionId) {
      // Handle case where session can't be found or created
      return <div>Error: Could not start or find test session.</div>
  }

  const questions = getQuestionsForSession(sessionId);
  const questionGroups = getQuestionGroupsForSession(sessionId);
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex-1">
        <QuizInterface 
            test={test} 
            questions={questions} 
            questionGroups={questionGroups} 
            initialAnswers={initialAnswers} 
            sessionId={sessionId}
        />
      </main>
    </div>
  );
}
