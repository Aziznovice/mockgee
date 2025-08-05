
"use client";

import { useState, useMemo } from "react";
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { MoreHorizontal, PlusCircle, ArrowUpDown, Search } from "lucide-react";
import { tags as initialTags, questions } from "@/lib/data";
import type { Tag } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const tagSchema = z.object({
  name: z.string().min(1, "Tag name cannot be empty."),
});
type TagFormData = z.infer<typeof tagSchema>;
type SortConfig = { key: 'name' | 'questionCount' | 'id'; direction: 'ascending' | 'descending' } | null;

export default function TagsPage() {
  const { toast } = useToast();
  const [tags, setTags] = useState(initialTags.map(tag => ({
      ...tag,
      questionCount: questions.filter(q => q.tags.includes(tag.id)).length
  })));
  const [isNewTagDialogOpen, setIsNewTagDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'ascending' });

  const form = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
    defaultValues: { name: "" },
  });

  const sortedAndFilteredTags = useMemo(() => {
    let filtered = tags.filter(tag =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

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
  }, [tags, searchTerm, sortConfig]);

  const requestSort = (key: 'name' | 'questionCount' | 'id') => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key: 'name' | 'questionCount' | 'id') => {
    if (!sortConfig || sortConfig.key !== key) {
        return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    return sortConfig.direction === 'ascending' ? <ArrowUpDown className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />;
  }

  const handleEditClick = (tag: Tag) => {
    form.setValue("name", tag.name);
    setEditingTag(tag);
  };

  const handleDeleteClick = (tag: Tag) => {
    setDeletingTag(tag);
  };

  const handleConfirmDelete = () => {
    if (!deletingTag) return;
    setTags(tags.filter((t) => t.id !== deletingTag.id));
    toast({
      title: "Tag Deleted",
      description: `The tag "${deletingTag.name}" has been deleted.`,
      variant: "destructive",
    });
    setDeletingTag(null);
  };

  const onSubmit = (data: TagFormData) => {
    if (editingTag) {
      setTags(
        tags.map((t) =>
          t.id === editingTag.id ? { ...t, name: data.name } : t
        )
      );
      toast({
        title: "Tag Updated",
        description: `The tag "${data.name}" has been updated.`,
      });
      setEditingTag(null);
    } else {
      const newTag = {
        id: `t${Date.now()}`,
        name: data.name,
        questionCount: 0,
      };
      setTags([...tags, newTag]);
      toast({
        title: "Tag Created",
        description: `The tag "${data.name}" has been created.`,
      });
      setIsNewTagDialogOpen(false);
    }
    form.reset();
  };

  const isEditing = !!editingTag;
  const isDialogOpen = isNewTagDialogOpen || isEditing;
  const dialogTitle = isEditing ? "Edit Tag" : "Add New Tag";
  const dialogDescription = isEditing
    ? "Make changes to your existing tag."
    : "Create a new tag to categorize questions.";
  const dialogButtonText = isEditing ? "Save Changes" : "Create Tag";

  const closeDialog = () => {
      setEditingTag(null);
      setIsNewTagDialogOpen(false);
      form.reset();
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
              <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <div className="col-span-3">
                  <Input id="name" {...form.register("name")} />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button type="submit">{dialogButtonText}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={!!deletingTag} onOpenChange={() => setDeletingTag(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this tag?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the tag "{deletingTag?.name}".
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
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Manage tags used to categorize questions.
                </CardDescription>
              </div>
              <Button size="sm" className="h-8 gap-1" onClick={() => setIsNewTagDialogOpen(true)}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Tag
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search tags..."
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
                    <Button variant="ghost" onClick={() => requestSort('name')}>
                        Tag Name
                        {getSortIcon('name')}
                    </Button>
                  </TableHead>
                  <TableHead>
                     <Button variant="ghost" onClick={() => requestSort('questionCount')}>
                        Questions
                        {getSortIcon('questionCount')}
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <Button variant="ghost" onClick={() => requestSort('id')}>
                        Tag ID
                        {getSortIcon('id')}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAndFilteredTags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell className="font-medium">{tag.name}</TableCell>
                    <TableCell>{tag.questionCount}</TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-xs">
                      {tag.id}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditClick(tag)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClick(tag)}>
                            Delete
                          </DropdownMenuItem>
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
              Showing <strong>{sortedAndFilteredTags.length}</strong> of{" "}
              <strong>{tags.length}</strong> tags
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
