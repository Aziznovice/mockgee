
"use client";

import { useState, useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, PlusCircle, ArrowUpDown, Search } from "lucide-react";
import { tests as initialTests } from "@/lib/data";
import type { Test } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

type SortConfig = { key: keyof Test | 'questionCount'; direction: 'ascending' | 'descending' } | null;

export default function TestsPage() {
    const { toast } = useToast();
    const [tests, setTests] = useState(initialTests);
    const [deletingTest, setDeletingTest] = useState<Test | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig>(null);

    const getTotalQuestions = (test: Test) => {
        if (test.subjects && test.subjects.length > 0) {
            return test.subjects.reduce((sum, subject) => sum + subject.questionCount, 0);
        }
        return test.questionCount || 0;
    }

    const sortedAndFilteredTests = useMemo(() => {
        let filtered = tests.filter(test =>
            test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.description.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortConfig !== null) {
            filtered.sort((a, b) => {
                let aValue: any;
                let bValue: any;

                if (sortConfig.key === 'questionCount') {
                    aValue = getTotalQuestions(a);
                    bValue = getTotalQuestions(b);
                } else {
                    aValue = a[sortConfig.key as keyof Test];
                    bValue = b[sortConfig.key as keyof Test];
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
    }, [tests, searchTerm, sortConfig]);

    const requestSort = (key: keyof Test | 'questionCount') => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: keyof Test | 'questionCount') => {
      if (!sortConfig || sortConfig.key !== key) {
        return <ArrowUpDown className="ml-2 h-4 w-4" />;
      }
      return sortConfig.direction === 'ascending' ? <ArrowUpDown className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />;
    };

    const handleDeleteClick = (test: Test) => {
        setDeletingTest(test);
    };

    const handleConfirmDelete = () => {
        if (!deletingTest) return;
        setTests(tests.filter(t => t.id !== deletingTest.id));
        toast({
            title: "Test Deleted",
            description: `The test "${deletingTest.title}" has been deleted.`,
            variant: 'destructive'
        })
        setDeletingTest(null);
    }

  return (
    <>
      <AlertDialog open={!!deletingTest} onOpenChange={() => setDeletingTest(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this test?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the test "{deletingTest?.title}".
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tests</CardTitle>
              <CardDescription>
                Manage the tests available for users to take.
              </CardDescription>
            </div>
            <Button size="sm" className="h-8 gap-1" asChild>
              <Link href="/admin/tests/new">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Test
                </span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search tests..."
                        className="w-full pl-8 sm:w-1/2 md:w-1/3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                    <Button variant="ghost" onClick={() => requestSort('title')}>
                        Test Title
                        {getSortIcon('title')}
                    </Button>
                </TableHead>
                <TableHead>
                     <Button variant="ghost" onClick={() => requestSort('description')}>
                        Description
                        {getSortIcon('description')}
                    </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                     <Button variant="ghost" onClick={() => requestSort('questionCount')}>
                        Questions
                        {getSortIcon('questionCount')}
                    </Button>
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.title}</TableCell>
                  <TableCell className="max-w-sm truncate">{test.description}</TableCell>
                  <TableCell className="hidden md:table-cell">{getTotalQuestions(test)}</TableCell>
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
                          <Link href={`/admin/tests/edit/${test.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(test)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{sortedAndFilteredTests.length}</strong> of <strong>{tests.length}</strong> tests
          </div>
        </CardFooter>
      </Card>
    </main>
    </>
  );
}
