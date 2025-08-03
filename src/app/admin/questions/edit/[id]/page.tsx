
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, PlusCircle, ArrowLeft, UploadCloud } from 'lucide-react';
import { tags as allTags, questions } from '@/lib/data';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFieldArray } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';


const choiceSchema = z.object({
    id: z.string().optional(),
    text: z.string().min(1, "Choice text cannot be empty"),
});

const formSchema = z.object({
    text: z.string().min(1, "Question text is required"),
    choices: z.array(choiceSchema).min(2, "Must have at least two choices"),
    correctChoiceIndex: z.coerce.number().min(0, "A correct choice must be selected"),
    explanation: z.string().optional(),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    imageUrl: z.string().optional(),
});


type FormData = z.infer<typeof formSchema>;

function ImageUpload({ label, initialImage, onFileChange }: { label: string, initialImage?: string | null, onFileChange: (file: File | null) => void }) {
    const [preview, setPreview] = useState<string | null>(initialImage || null);

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
            <Label>{label}</Label>
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


export default function EditQuestionPage() {
    const router = useRouter();
    const params = useParams();
    const questionId = params.id as string;
    const { toast } = useToast();

    const question = questions.find(q => q.id === questionId);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: question ? {
            ...question,
            correctChoiceIndex: question.choices.findIndex(c => c.id === question.correctChoiceId)
        } : {},
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "choices",
    });

    const onSubmit = (data: FormData) => {
        console.log("Form submitted", data);
        toast({
            title: "Question Updated!",
            description: "The question has been saved successfully.",
        });
        router.push('/admin/questions');
    };

    if (!question) {
        return <div>Question not found.</div>
    }

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
                    Edit Question
                </h1>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Question Details</CardTitle>
                        <CardDescription>Update the question text, choices, and correct answer.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                            <div>
                            <Label htmlFor="text">Question Text</Label>
                            <Textarea id="text" {...form.register("text")} />
                            {form.formState.errors.text && <p className="text-red-500 text-sm">{form.formState.errors.text.message}</p>}
                        </div>
                        
                        {/* Choices */}
                            <div>
                            <Label>Choices</Label>
                                <Controller
                                control={form.control}
                                name="correctChoiceIndex"
                                render={({ field }) => (
                                    <RadioGroup onValueChange={(val) => field.onChange(parseInt(val))} value={String(field.value)} className="space-y-2 mt-2">
                                        {fields.map((choiceField, choiceIndex) => (
                                            <div key={choiceField.id} className="flex items-center gap-2">
                                                <RadioGroupItem value={String(choiceIndex)} id={`c-${choiceIndex}`} />
                                                <Label htmlFor={`c-${choiceIndex}`} className="sr-only">Set as correct</Label>
                                                <Input {...form.register(`choices.${choiceIndex}.text`)} placeholder={`Choice ${choiceIndex + 1}`} className="flex-1" />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(choiceIndex)} disabled={fields.length <= 2}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                            {form.formState.errors.choices && <p className="text-red-500 text-sm">{form.formState.errors.choices.message}</p>}
                            <Button type="button" variant="outline" size="sm" onClick={() => append({ text: '' })} className="mt-2">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Choice
                            </Button>
                            </div>

                            {/* Explanation and Image */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="explanation">Explanation (Optional)</Label>
                                <Textarea id="explanation" {...form.register("explanation")} />
                            </div>
                            <ImageUpload label="Optional Image for this Question" initialImage={question.imageUrl} onFileChange={(file) => {
                                console.log(`Image for question:`, file);
                            }}/>
                            </div>

                            {/* Tags */}
                            <div>
                                <Label>Tags</Label>
                                <Controller
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                                        {allTags.map(tag => (
                                            <Label key={tag.id} className="flex items-center gap-2 p-2 rounded-md border bg-background hover:bg-secondary cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-primary-foreground">
                                                <Input type="checkbox" value={tag.id} checked={field.value?.includes(tag.id)}
                                                    onChange={(e) => {
                                                        const newValues = e.target.checked ? [...(field.value || []), tag.id] : field.value?.filter(id => id !== tag.id);
                                                        field.onChange(newValues);
                                                    }} className="h-4 w-4" />
                                                {tag.name}
                                            </Label>
                                        ))}
                                    </div>
                                )}
                            />
                            {form.formState.errors.tags && <p className="text-red-500 text-sm mt-2">{form.formState.errors.tags.message}</p>}
                            </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => router.push('/admin/questions')}>Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </div>
            </form>
        </main>
    );
}
