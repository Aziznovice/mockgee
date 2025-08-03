
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Upload, LayoutGrid, Rows3, Check } from "lucide-react";
import { questions, tags } from "@/lib/data";
import { cn } from "@/lib/utils";

type ViewType = "table" | "form";

export default function QuestionsPage() {
  const [view, setView] = useState<ViewType>("table");
  const getTagName = (tagId: string) => tags.find(t => t.id === tagId)?.name || 'Unknown';

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold text-lg md:text-2xl">Questions</h1>
              <p className="text-sm text-muted-foreground">
                Manage all questions for the mock tests.
              </p>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                    <Button variant={view === 'table' ? 'secondary' : 'ghost'} size="icon" className="h-7 w-7" onClick={() => setView('table')}>
                        <Rows3 className="h-4 w-4"/>
                        <span className="sr-only">Table View</span>
                    </Button>
                    <Button variant={view === 'form' ? 'secondary' : 'ghost'} size="icon" className="h-7 w-7" onClick={() => setView('form')}>
                        <LayoutGrid className="h-4 w-4"/>
                        <span className="sr-only">Form View</span>
                    </Button>
                </div>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Upload className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Bulk Upload
                    </span>
                </Button>
                <Button size="sm" className="h-8 gap-1" asChild>
                    <Link href="/admin/questions/new">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Question
                        </span>
                    </Link>
                </Button>
            </div>
        </div>
      <Card>
        <CardContent className="pt-6">
          {view === "table" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question Text</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="hidden md:table-cell">Choices</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="font-medium max-w-sm truncate">{question.text}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                          {question.tags.map(tagId => (
                              <Badge key={tagId} variant="secondary">{getTagName(tagId)}</Badge>
                          ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{question.choices.length}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="space-y-4">
                {questions.map(question => (
                    <Card key={question.id}>
                        <CardHeader className="flex flex-row items-start justify-between">
                           <div>
                                <CardTitle className="text-lg">{question.text}</CardTitle>
                                <div className="flex gap-1 mt-2">
                                    {question.tags.map(tagId => (
                                        <Badge key={tagId} variant="secondary">{getTagName(tagId)}</Badge>
                                    ))}
                                </div>
                           </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-2 text-sm">
                                {question.choices.map(choice => {
                                    const isCorrect = choice.id === question.correctChoiceId;
                                    return (
                                        <div key={choice.id} className={cn("flex items-center gap-2 rounded-md p-2", isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-muted/50")}>
                                            {isCorrect ? <Check className="h-4 w-4 text-green-600 dark:text-green-400" /> : <div className="h-4 w-4"/>}
                                            <span className={cn(isCorrect && "font-semibold")}>{choice.text}</span>
                                        </div>
                                    )
                                })}
                           </div>
                        </CardContent>
                    </Card>
                ))}
             </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{questions.length}</strong> of <strong>{questions.length}</strong> questions
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
