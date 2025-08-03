
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Upload, LayoutGrid, Rows3, Check, BoxSelect, Trash2 } from "lucide-react";
import { questions, tags, QuestionGroup, questionGroups } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { Question } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type ViewType = "table" | "form";
type DeletionTarget = { id: string, type: 'question' | 'group', name: string } | null;

function QuestionCard({ question, isGrouped = false, onEdit, onDelete }: { question: Question, isGrouped?: boolean, onEdit: (id: string) => void, onDelete: (target: DeletionTarget) => void }) {
    const getTagName = (tagId: string) => tags.find(t => t.id === tagId)?.name || 'Unknown';
    return (
        <Card className={cn(isGrouped && "ml-10 border-dashed")}>
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
                    <DropdownMenuItem onClick={() => onEdit(question.id)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => onDelete({ id: question.id, type: 'question', name: question.text })}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                {question.imageUrl && (
                    <div className="mb-4">
                        <Image src={question.imageUrl} alt="Question reference" width={200} height={150} className="rounded-md object-cover" />
                    </div>
                )}
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
    )
}

function GroupCard({ group, onEdit, onDelete }: { group: QuestionGroup, onEdit: (id: string) => void, onDelete: (target: DeletionTarget) => void }) {
    const groupQuestions = questions.filter(q => q.groupId === group.id);

    return (
        <Card className="bg-muted/30">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <BoxSelect className="h-6 w-6 text-primary" />
                            Question Group
                        </CardTitle>
                        {group.referenceText && <CardDescription className="mt-2 italic">"{group.referenceText.substring(0, 150)}..."</CardDescription>}
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
                        <DropdownMenuItem onClick={() => onEdit(group.id)}>Edit Group</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => onDelete({ id: group.id, type: 'group', name: 'this Question Group' })}>
                           <Trash2 className="mr-2 h-4 w-4" />
                           Delete Group
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                 {group.referenceImageUrl && (
                    <div className="mb-4 p-4 border-b">
                        <Image src={group.referenceImageUrl} alt="Group reference" width={300} height={200} className="rounded-md object-cover" />
                    </div>
                )}
                {groupQuestions.map(q => <QuestionCard key={q.id} question={q} isGrouped />)}
            </CardContent>
        </Card>
    );
}

export default function QuestionsPage() {
  const [view, setView] = useState<ViewType>("form");
  const { toast } = useToast();
  const [deletionTarget, setDeletionTarget] = useState<DeletionTarget>(null);

  const getTagName = (tagId: string) => tags.find(t => t.id === tagId)?.name || 'Unknown';
  
  const standaloneQuestions = questions.filter(q => !q.groupId);

  const handleConfirmDelete = () => {
    if (!deletionTarget) return;
    // In a real app, you'd call an API here.
    console.log("Deleting", deletionTarget.type, deletionTarget.id);
    toast({
        title: "Content Deleted",
        description: `The ${deletionTarget.type} has been successfully deleted.`,
        variant: 'destructive'
    });
    setDeletionTarget(null);
  };
  
  return (
    <>
    <AlertDialog open={!!deletionTarget} onOpenChange={() => setDeletionTarget(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete {deletionTarget?.name}.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

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
                   <TableHead className="hidden md:table-cell">Group</TableHead>
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
                    <TableCell className="hidden md:table-cell text-xs">{question.groupId || 'N/A'}</TableCell>
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
                          <DropdownMenuItem asChild>
                            <Link href={question.groupId ? `/admin/questions/edit-group/${question.groupId}` : `/admin/questions/edit/${question.id}`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeletionTarget({ id: question.id, type: 'question', name: question.text })}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
             <div className="space-y-6">
                {questionGroups.map(group => (
                    <GroupCard 
                        key={group.id} 
                        group={group} 
                        onEdit={(id) => router.push(`/admin/questions/edit-group/${id}`)}
                        onDelete={setDeletionTarget}
                    />
                ))}
                {standaloneQuestions.map(question => (
                    <QuestionCard 
                        key={question.id} 
                        question={question}
                        onEdit={(id) => router.push(`/admin/questions/edit/${id}`)}
                        onDelete={setDeletionTarget}
                    />
                ))}
             </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{questionGroups.length}</strong> groups and <strong>{standaloneQuestions.length}</strong> standalone questions.
          </div>
        </CardFooter>
      </Card>
    </main>
    </>
  );
}
