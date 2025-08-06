
import { notFound } from "next/navigation";
import { getTestById, getQuestionsForSession } from "@/lib/data";
import { Header } from "@/components/header";
import { ResultsDisplay } from "@/components/results-display";
import type { UserAnswers } from "@/lib/types";

export default function ResultsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { answers?: string, session?: string };
}) {
  const test = getTestById(params.id);
  
  if (!test) {
    notFound();
  }

  const sessionId = searchParams.session;
  if (!sessionId) {
      return <div>Error: Session ID is missing.</div>
  }

  const questions = getQuestionsForSession(sessionId);
  let userAnswers: UserAnswers = {};

  try {
    if (searchParams.answers) {
      userAnswers = JSON.parse(decodeURIComponent(searchParams.answers));
    }
  } catch (error) {
    console.error("Failed to parse answers:", error);
    // Handle error or set default empty answers
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex-1 py-8">
        <ResultsDisplay test={test} questions={questions} userAnswers={userAnswers} sessionId={sessionId} />
      </main>
    </div>
  );
}
