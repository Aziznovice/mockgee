
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
import { Trash2, PlusCircle, ArrowLeft, UploadCloud, CheckCircle } from 'lucide-react';
import { tags as allTags } from '@/lib/data';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

const choiceSchema = z.object({
    id: z.string().optional(),
    text: z.string().min(1, "Choice text cannot be empty"),
});

const questionFormSchema = z.object({
    text: z.string().min(1, "Question text is required"),
    choices: z.array(choiceSchema).min(2, "Must have at least two choices"),
    correctChoiceIndex: z.coerce.number().min(0, "A correct choice must be selected"),
    explanation: z.string().optional(),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    imageUrl: z.string().optional(),
});

type QuestionFormData = z.infer<typeof questionFormSchema>;

function ImageUpload({ onFileChange }: { onFileChange: (file: File | null) => void }) {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onFileChange(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <div>
            <Label>Optional Image</Label>
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

export default function NewQuestionPage() {
    const router = useRouter();
    const form = useForm<QuestionFormData>({
        resolver: zodResolver(questionFormSchema),
        defaultValues: {
            text: '',
            choices: [{ text: '' }, { text: '' }],
            correctChoiceIndex: 0,
            explanation: '',
            tags: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "choices",
    });

    const onSubmit = (data: QuestionFormData) => {
        console.log("Form submitted", data);
        // In a real app, you would handle file upload and save the data
        alert('Question created successfully! (Check console for data)');
        router.push('/admin/questions');
    };

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                    <Link href="/admin/questions">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Add New Question
                </h1>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Question Details</CardTitle>
                        <CardDescription>Enter the question text, explanation, and an optional image.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="text">Question Text</Label>
                            <Textarea id="text" {...form.register('text')} />
                            {form.formState.errors.text && <p className="text-red-500 text-sm">{form.formState.errors.text.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="explanation">Explanation (Optional)</Label>
                            <Textarea id="explanation" {...form.register('explanation')} />
                        </div>
                        <ImageUpload onFileChange={(file) => {
                            // In a real app, you'd handle the file object for upload
                            // For now, we'll just log it. In the future, this would set a value in the form.
                            console.log(file);
                        }} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Choices</CardTitle>
                        <CardDescription>Add the possible answers and select the correct one.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Controller
                            control={form.control}
                            name="correctChoiceIndex"
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={(val) => field.onChange(parseInt(val))}
                                    value={String(field.value)}
                                    className="space-y-2"
                                >
                                    {fields.map((choiceField, index) => (
                                        <div key={choiceField.id} className="flex items-center gap-2">
                                            <RadioGroupItem value={String(index)} id={`correct-choice-${index}`} />
                                            <Label htmlFor={`correct-choice-${index}`} className="sr-only">Set as correct</Label>
                                            <Input
                                                {...form.register(`choices.${index}.text`)}
                                                placeholder={`Choice ${index + 1}`}
                                                className="flex-1"
                                            />
                                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 2}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                        {form.formState.errors.choices && <p className="text-red-500 text-sm">{form.formState.errors.choices.message}</p>}
                         {form.formState.errors.correctChoiceIndex && <p className="text-red-500 text-sm">{form.formState.errors.correctChoiceIndex.message}</p>}
                        <Button type="button" variant="outline" onClick={() => append({ text: '' })}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Choice
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Categorization</CardTitle>
                        <CardDescription>Select tags to categorize this question.</CardDescription>
                    </CardHeader>
                    <CardContent>
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
                        {form.formState.errors.tags && <p className="text-red-500 text-sm mt-2">{form.formState.errors.tags.message}</p>}
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => router.push('/admin/questions')}>Cancel</Button>
                    <Button type="submit">Create Question</Button>
                </div>
            </form>
        </main>
    );
}
