import { notFound } from "next/navigation";
import { getTestById, getQuestionsForTest } from "@/lib/data";
import { Header } from "@/components/header";
import { QuizInterface } from "@/components/quiz-interface";

export default function QuizPage({ params }: { params: { id: string } }) {
  const test = getTestById(params.id);
  
  if (!test) {
    notFound();
  }

  const questions = getQuestionsForTest(params.id);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 pt-8">
        <QuizInterface test={test} questions={questions} />
      </main>
    </div>
  );
}
