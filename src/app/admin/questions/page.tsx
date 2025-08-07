
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  DropdownMenuCheckboxItem,
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
import { Input } from "@/components/ui/input";
import { MoreHorizontal, PlusCircle, Upload, LayoutGrid, Rows3, Check, BoxSelect, Trash2, ArrowUpDown, Search, Tag as TagIcon, ChevronDown, X } from "lucide-react";
import { questions as allQuestions, tags, QuestionGroup, questionGroups as allQuestionGroups } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { Question } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type ViewType = "table" | "form";
type DeletionTarget = { id: string, type: 'question' | 'group', name: string } | null;
type SortConfig = { key: keyof Question | 'group'; direction: 'ascending' | 'descending' } | null;

function QuestionCard({ question, isGrouped = false, onEdit, onDelete }: { question: Question, isGrouped?: boolean, onEdit: (id: string, groupId?: string) => void, onDelete: (target: DeletionTarget) => void }) {
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
                    <DropdownMenuItem onClick={() => onEdit(question.id, question.groupId)}>Edit</DropdownMenuItem>
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

function GroupCard({ group, onEdit, onDelete }: { group: QuestionGroup, onEdit: (id: string, groupId?: string) => void, onDelete: (target: DeletionTarget) => void }) {
    const groupQuestions = allQuestions.filter(q => q.groupId === group.id);

    return (
        <Card className="bg-muted/30">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <BoxSelect className="h-6 w-6 text-primary" />
                            Question Group
                        </CardTitle>
                        {group.title && <p className="text-base font-semibold mt-2">{group.title}</p>}
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
                        <DropdownMenuItem onClick={() => onEdit(group.id, group.id)}>Edit Group</DropdownMenuItem>
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
                {groupQuestions.map(q => <QuestionCard key={q.id} question={q} isGrouped onEdit={onEdit} onDelete={onDelete} />)}
            </CardContent>
        </Card>
    );
}

export default function QuestionsPage() {
  const [view, setView] = useState<ViewType>("form");
  const { toast } = useToast();
  const router = useRouter();
  const [deletionTarget, setDeletionTarget] = useState<DeletionTarget>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [tagFilter, setTagFilter] = useState<string[]>([]);

  const getTagName = (tagId: string) => tags.find(t => t.id === tagId)?.name || 'Unknown';
  
  const sortedAndFilteredQuestions = useMemo(() => {
    let filtered = allQuestions
        .filter(q => {
            const searchMatch = q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.tags.some(tagId => getTagName(tagId).toLowerCase().includes(searchTerm.toLowerCase()));
            const tagMatch = tagFilter.length === 0 || tagFilter.every(tagId => q.tags.includes(tagId));
            return searchMatch && tagMatch;
        });

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        const key = sortConfig.key;
        let aValue: any = a[key as keyof Question];
        let bValue: any = b[key as keyof Question];

        if (key === 'group') {
            aValue = a.groupId || 'zzzz'; // standalone questions last
            bValue = b.groupId || 'zzzz';
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, sortConfig, tagFilter]);

  const requestSort = (key: keyof Question | 'group') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Question | 'group') => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === 'ascending' ? <ArrowUpDown className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const handleEditClick = (id: string, groupId?: string) => {
    const url = groupId ? `/admin/questions/edit-group/${groupId}` : `/admin/questions/edit/${id}`;
    router.push(url);
  }
  
  const standaloneQuestions = allQuestions.filter(q => !q.groupId);
  const questionGroups = allQuestionGroups;

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

  const handleTagToggle = (tagId: string) => {
    setTagFilter(prev => 
        prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  }
  
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
            <div>
                 <div className="mb-4 flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search questions or tags..."
                            className="w-full pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-1">
                                <TagIcon className="h-4 w-4"/>
                                Tags
                                {tagFilter.length > 0 && <Badge variant="secondary" className="ml-1">{tagFilter.length}</Badge>}
                                <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by tag</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                             {tagFilter.length > 0 && (
                                <>
                                    <DropdownMenuItem onSelect={() => setTagFilter([])} className="text-red-600">
                                        <X className="mr-2 h-4 w-4"/>
                                        Clear
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </>
                            )}
                            {tags.map(tag => (
                                <DropdownMenuCheckboxItem
                                    key={tag.id}
                                    checked={tagFilter.includes(tag.id)}
                                    onSelect={(e) => e.preventDefault()}
                                    onClick={() => handleTagToggle(tag.id)}
                                >
                                    {tag.name}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                     </DropdownMenu>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button variant="ghost" onClick={() => requestSort('text')}>
                            Question Text
                            {getSortIcon('text')}
                        </Button>
                      </TableHead>
                      <TableHead>
                         <Button variant="ghost" onClick={() => requestSort('tags')}>
                            Tags
                            {getSortIcon('tags')}
                        </Button>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        <Button variant="ghost" onClick={() => requestSort('choices')}>
                            Choices
                           {getSortIcon('choices')}
                        </Button>
                      </TableHead>
                       <TableHead className="hidden md:table-cell">
                        <Button variant="ghost" onClick={() => requestSort('group')}>
                            Group
                            {getSortIcon('group')}
                        </Button>
                       </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedAndFilteredQuestions.map((question) => (
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
                              <DropdownMenuItem onClick={() => handleEditClick(question.id, question.groupId)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setDeletionTarget({ id: question.id, type: 'question', name: question.text })}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </div>
          ) : (
             <div className="space-y-6">
                {questionGroups.map(group => (
                    <GroupCard 
                        key={group.id} 
                        group={group} 
                        onEdit={handleEditClick}
                        onDelete={setDeletionTarget}
                    />
                ))}
                {standaloneQuestions.map(question => (
                    <QuestionCard 
                        key={question.id} 
                        question={question}
                        onEdit={handleEditClick}
                        onDelete={setDeletionTarget}
                    />
                ))}
             </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{view === 'table' ? sortedAndFilteredQuestions.length : questionGroups.length + standaloneQuestions.length}</strong> of <strong>{allQuestions.length}</strong> questions.
          </div>
        </CardFooter>
      </Card>
    </main>
    </>
  );
}
