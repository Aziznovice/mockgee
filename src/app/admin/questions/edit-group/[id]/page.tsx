
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, PlusCircle, ArrowLeft, UploadCloud, BoxSelect, Tag } from 'lucide-react';
import { tags as initialTags, getQuestionGroupById, getQuestionsForGroup } from '@/lib/data';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const choiceSchema = z.object({
    id: z.string().optional(),
    text: z.string().min(1, "Choice text cannot be empty"),
});

const questionSchema = z.object({
    text: z.string().min(1, "Question text is required"),
    choices: z.array(choiceSchema).min(2, "Must have at least two choices"),
    correctChoiceIndex: z.coerce.number().min(0, "A correct choice must be selected"),
    explanation: z.string().optional(),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    imageUrl: z.string().optional(),
});

const formSchema = z.object({
    isGrouped: z.boolean(),
    referenceText: z.string().optional(),
    referenceImageUrl: z.string().optional(),
    questions: z.array(questionSchema),
}).refine(data => {
    if (data.isGrouped) {
        return !!data.referenceText || !!data.referenceImageUrl;
    }
    return true;
}, {
    message: "A group must have a reference text or image.",
    path: ["referenceText"],
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

function TagCreator({ onTagCreated }: { onTagCreated: (newTag: { id: string, name: string }) => void }) {
    const [showInput, setShowInput] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const { toast } = useToast();

    const handleCreateTag = () => {
        if (newTagName.trim() === "") {
            toast({
                title: "Error",
                description: "Tag name cannot be empty.",
                variant: "destructive",
            });
            return;
        }
        // In a real app, you'd also check for duplicate tag names.
        const newTag = {
            id: `t${Date.now()}`, // Simple unique ID generation
            name: newTagName.trim(),
        };
        onTagCreated(newTag);
        toast({
            title: "Tag Created",
            description: `Successfully created tag: ${newTag.name}`,
        });
        setNewTagName("");
        setShowInput(false);
    };

    if (!showInput) {
        return (
            <Button type="button" variant="outline" size="sm" onClick={() => setShowInput(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Tag
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Input
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Enter new tag name"
                className="h-9"
            />
            <Button type="button" size="sm" onClick={handleCreateTag}>Save Tag</Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowInput(false)}>Cancel</Button>
        </div>
    );
}


export default function EditQuestionGroupPage() {
    const router = useRouter();
    const params = useParams();
    const groupId = params.id as string;
    const group = getQuestionGroupById(groupId);
    const groupQuestions = getQuestionsForGroup(groupId);
    const { toast } = useToast();
    const [allTags, setAllTags] = useState(initialTags);


    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isGrouped: true,
            referenceText: group?.referenceText || '',
            referenceImageUrl: group?.referenceImageUrl || '',
            questions: groupQuestions.map(q => ({
                ...q,
                correctChoiceIndex: q.choices.findIndex(c => c.id === q.correctChoiceId)
            })),
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "questions",
    });

    const isGrouped = form.watch('isGrouped');

    const onSubmit = (data: FormData) => {
        console.log("Form submitted", data);
        toast({
            title: "Question Group Saved!",
            description: "Your changes have been saved successfully."
        });
        router.push('/admin/questions');
    };
    
    if (!group) {
        return <div>Group not found.</div>
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
                    Edit Question Group
                </h1>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                             <div>
                                <CardTitle>Question Structure</CardTitle>
                                <CardDescription>Create a single question or a group of questions with a shared reference.</CardDescription>
                             </div>
                             <div className="flex items-center gap-2">
                                <Label htmlFor="is-grouped">Group Questions</Label>
                                <Switch id="is-grouped" checked={isGrouped} onCheckedChange={(checked) => form.setValue('isGrouped', checked)} disabled />
                             </div>
                        </div>
                    </CardHeader>
                    {isGrouped && (
                        <CardContent className="space-y-4 pt-4 border-t">
                            <h3 className="font-medium flex items-center gap-2"><BoxSelect className="h-5 w-5"/> Group Reference</h3>
                            <div>
                                <Label htmlFor="referenceText">Reference Text / Passage (Optional)</Label>
                                <Textarea id="referenceText" {...form.register('referenceText')} rows={5} />
                            </div>
                             <ImageUpload label="Reference Image (Optional)" initialImage={group.referenceImageUrl} onFileChange={(file) => {
                                // Handle file object
                                console.log("Reference image:", file)
                            }}/>
                            {form.formState.errors.referenceText && <p className="text-red-500 text-sm">{form.formState.errors.referenceText.message}</p>}
                        </CardContent>
                    )}
                </Card>

                {fields.map((questionField, index) => {
                    const { fields: choiceFields, append: appendChoice, remove: removeChoice } = useFieldArray({
                        control: form.control,
                        name: `questions.${index}.choices`
                    });

                    return (
                    <Card key={questionField.id}>
                        <CardHeader className="flex-row items-center justify-between">
                            <div>
                                <CardTitle>Question {index + 1}</CardTitle>
                                <CardDescription>Enter the question text, choices, and correct answer.</CardDescription>
                            </div>
                             <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                                <Trash2 className="h-4 w-4" />
                             </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div>
                                <Label htmlFor={`questions.${index}.text`}>Question Text</Label>
                                <Textarea id={`questions.${index}.text`} {...form.register(`questions.${index}.text`)} />
                                {form.formState.errors.questions?.[index]?.text && <p className="text-red-500 text-sm">{form.formState.errors.questions?.[index]?.text?.message}</p>}
                            </div>
                            
                            {/* Choices */}
                             <div>
                                <Label>Choices</Label>
                                 <Controller
                                    control={form.control}
                                    name={`questions.${index}.correctChoiceIndex`}
                                    render={({ field }) => (
                                        <RadioGroup onValueChange={(val) => field.onChange(parseInt(val))} value={String(field.value)} className="space-y-2 mt-2">
                                            {choiceFields.map((choiceField, choiceIndex) => (
                                                <div key={choiceField.id} className="flex items-center gap-2">
                                                    <RadioGroupItem value={String(choiceIndex)} id={`q-${index}-c-${choiceIndex}`} />
                                                    <Label htmlFor={`q-${index}-c-${choiceIndex}`} className="sr-only">Set as correct</Label>
                                                    <Input {...form.register(`questions.${index}.choices.${choiceIndex}.text`)} placeholder={`Choice ${choiceIndex + 1}`} className="flex-1" />
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeChoice(choiceIndex)} disabled={choiceFields.length <= 2}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    )}
                                />
                                {form.formState.errors.questions?.[index]?.choices && <p className="text-red-500 text-sm">{form.formState.errors.questions?.[index]?.choices?.message}</p>}
                                <Button type="button" variant="outline" size="sm" onClick={() => appendChoice({ text: '' })} className="mt-2">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Choice
                                </Button>
                             </div>

                             {/* Explanation and Image */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor={`questions.${index}.explanation`}>Explanation (Optional)</Label>
                                    <Textarea id={`questions.${index}.explanation`} {...form.register(`questions.${index}.explanation`)} />
                                </div>
                                <ImageUpload label="Optional Image for this Question" initialImage={form.getValues(`questions.${index}.imageUrl`)} onFileChange={(file) => {
                                    console.log(`Image for question ${index}:`, file);
                                }}/>
                             </div>

                             {/* Tags */}
                             <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <Label>Tags</Label>
                                    <TagCreator onTagCreated={(newTag) => setAllTags(prev => [...prev, newTag])} />
                                  </div>
                                 <Controller
                                    control={form.control}
                                    name={`questions.${index}.tags`}
                                    render={({ field }) => (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {allTags.map(tag => (
                                                <Label key={tag.id} className="flex items-center gap-2 p-2 rounded-md border bg-background hover:bg-secondary cursor-pointer has-[:checked]:bg-primary has-[:checked]:text-primary-foreground">
                                                    <Input type="checkbox" value={tag.id} checked={field.value?.includes(tag.id)}
                                                        onChange={(e) => {
                                                            const newValues = e.target.checked ? [...(field.value || []), tag.id] : field.value?.filter(id => id !== tag.id);
                                                            field.onChange(newValues);
                                                        }} className="h-4 w-4" />
                                                    <Tag className="mr-1 h-3 w-3"/>
                                                    {tag.name}
                                                </Label>
                                            ))}
                                        </div>
                                    )}
                                />
                                {form.formState.errors.questions?.[index]?.tags && <p className="text-red-500 text-sm mt-2">{form.formState.errors.questions?.[index]?.tags?.message}</p>}
                             </div>
                        </CardContent>
                    </Card>
                    )
                })}

                {isGrouped && (
                     <Button type="button" variant="outline" onClick={() => append({ text: '', choices: [{text: ''}, {text: ''}], correctChoiceIndex: 0, tags: [] })}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Another Question to Group
                    </Button>
                )}


                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => router.push('/admin/questions')}>Cancel</Button>
                    <Button type="submit">Save Changes</Button>
                </div>
            </form>
        </main>
    );
}

    