
"use client";

import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Trash2, PlusCircle, ArrowLeft, UploadCloud } from 'lucide-react';
import { tags as allTags } from '@/lib/data';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const subjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Subject name is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  questionCount: z.coerce.number().min(1, 'Question count must be at least 1'),
});

const testFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  useSubjects: z.boolean(),
  subjects: z.array(subjectSchema).optional(),
  tags: z.array(z.string()).optional(),
  questionCount: z.coerce.number().optional(),
}).refine(data => {
    if (data.useSubjects) {
      return !data.subjects || data.subjects.length === 0 ? false : true;
    }
    return !data.tags || data.tags.length === 0 || !data.questionCount || data.questionCount <= 0 ? false : true;
}, {
    message: "Please configure either subjects or overall test settings.",
    path: ["useSubjects"]
});

type TestFormData = z.infer<typeof testFormSchema>;

function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Label>Test Image</Label>
      <div className="mt-2 flex items-center gap-6">
         <div className="w-32 h-20 rounded-md border flex items-center justify-center bg-muted overflow-hidden">
           {preview ? (
              <Image src={preview} alt="Image Preview" width={128} height={80} className="object-cover w-full h-full" />
           ) : (
              <UploadCloud className="h-8 w-8 text-muted-foreground" />
           )}
         </div>
        <Input id="image" type="file" onChange={handleFileChange} className="max-w-xs" />
      </div>
    </div>
  );
}

export default function NewTestPage() {
  const router = useRouter();
  
  const form = useForm<TestFormData>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      title: '',
      description: '',
      useSubjects: false,
      subjects: [],
      tags: [],
      questionCount: 10,
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subjects",
  });
  
  const watchedUseSubjects = form.watch('useSubjects');

  const onSubmit = (data: TestFormData) => {
    console.log('Form submitted', data);
    alert('Test created successfully! (Check console for data)');
    router.push('/admin/tests');
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/tests">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Add New Mock Test
        </h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Details</CardTitle>
            <CardDescription>Provide the main details for the mock test.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register('title')} />
              {form.formState.errors.title && <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...form.register('description')} />
               {form.formState.errors.description && <p className="text-red-500 text-sm">{form.formState.errors.description.message}</p>}
            </div>
            <ImageUpload />
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Test Structure</CardTitle>
                        <CardDescription>Define questions by subjects or by overall tags.</CardDescription>
                    </div>
                    <Controller
                        control={form.control}
                        name="useSubjects"
                        render={({ field }) => (
                             <div className="flex items-center gap-2">
                                <Label htmlFor="use-subjects">Use Subjects</Label>
                                <Switch 
                                    id="use-subjects" 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange} 
                                />
                            </div>
                        )}
                    />
                </div>
            </CardHeader>
            <CardContent>
                {watchedUseSubjects ? (
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                          <Card key={field.id} className="p-4 bg-muted/50">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                               <div className="md:col-span-2">
                                    <Label>Subject Name</Label>
                                    <Input {...form.register(`subjects.${index}.name`)} />
                               </div>
                               <div>
                                    <Label>Question Count</Label>
                                    <Input type="number" {...form.register(`subjects.${index}.questionCount`)} />
                               </div>
                                <div className="flex items-end">
                                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                               </div>
                               <div className="md:col-span-4">
                                    <Label>Tags (AND logic)</Label>
                                     <Controller
                                        control={form.control}
                                        name={`subjects.${index}.tags`}
                                        render={({ field }) => (
                                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                                {allTags.map(tag => (
                                                    <Label key={tag.id} className="flex items-center gap-2 p-2 rounded-md border bg-background hover:bg-secondary cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-primary-foreground">
                                                        <Input 
                                                            type="checkbox"
                                                            value={tag.id}
                                                            checked={field.value?.includes(tag.id)}
                                                            onChange={(e) => {
                                                                const newValues = e.target.checked
                                                                    ? [...(field.value || []), tag.id]
                                                                    : field.value?.filter(id => id !== tag.id);
                                                                field.onChange(newValues);
                                                            }}
                                                            className="h-4 w-4"
                                                        />
                                                        {tag.name}
                                                    </Label>
                                                ))}
                                            </div>
                                        )}
                                    />
                               </div>
                            </div>
                          </Card>
                        ))}
                         <Button type="button" variant="outline" onClick={() => append({ name: '', tags: [], questionCount: 10, id: `new-${fields.length}` })}>
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            Add Subject
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <Label>Total Question Count</Label>
                            <Input type="number" {...form.register('questionCount')} />
                        </div>
                        <div>
                             <Label>Tags (AND logic)</Label>
                             <Controller
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                        {allTags.map(tag => (
                                            <Label key={tag.id} className="flex items-center gap-2 p-2 rounded-md border bg-background hover:bg-secondary cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-primary-foreground">
                                                <Input 
                                                    type="checkbox"
                                                    value={tag.id}
                                                    checked={field.value?.includes(tag.id)}
                                                    onChange={(e) => {
                                                        const newValues = e.target.checked
                                                            ? [...(field.value || []), tag.id]
                                                            : field.value?.filter(id => id !== tag.id);
                                                        field.onChange(newValues);
                                                    }}
                                                    className="h-4 w-4"
                                                />
                                                {tag.name}
                                            </Label>
                                        ))}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                )}
                 {form.formState.errors.useSubjects && <p className="text-red-500 text-sm mt-4">{form.formState.errors.useSubjects.message}</p>}
            </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.push('/admin/tests')}>Cancel</Button>
          <Button type="submit">Create Test</Button>
        </div>
      </form>
    </main>
  );
}
