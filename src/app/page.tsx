import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { tests } from "@/lib/data";
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
                  <p className="text-sm text-muted-foreground">{test.questionIds.length} questions</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/mock-test/${test.id}`}>
                      Start Mock Test <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
