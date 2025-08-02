import { notFound } from "next/navigation";
import { getTestById, getQuestionsForTest } from "@/lib/data";
import { Header } from "@/components/header";
import { ResultsDisplay } from "@/components/results-display";
import type { UserAnswers } from "@/lib/types";

export default function ResultsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { answers?: string };
}) {
  const test = getTestById(params.id);
  
  if (!test) {
    notFound();
  }

  const questions = getQuestionsForTest(params.id);
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
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <ResultsDisplay test={test} questions={questions} userAnswers={userAnswers} />
      </main>
    </div>
  );
}
