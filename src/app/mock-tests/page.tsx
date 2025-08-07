

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tests } from "@/lib/data";
import { Header } from "@/components/header";

const examCategories = [
    { id: '1', title: "Civil Service Exam", abbr: "CSE", subjects: 8, questions: "2,500+", badge: "Most Popular", color: "slate", description: "Professional & Sub-professional levels. Pass rate: 14-18%" },
    { id: '2', title: "Nursing Licensure Exam", abbr: "NLE", subjects: 12, questions: "4,200+", badge: "High Demand", color: "teal", description: "Requires ≥75% general average for passing" },
    { id: '3', title: "CPA Board Exam", abbr: "CPALE", subjects: 10, questions: "3,800+", badge: "Professional", color: "violet", description: "Certified Public Accountant licensure examination" },
    { id: '3', title: "Bar Examination", abbr: "BAR", subjects: 8, questions: "3,200+", badge: "Premium", color: "amber", description: "Philippine Bar Exam for law practitioners" },
    { id: '3', title: "Agriculturist Board Exam", abbr: "ALE", subjects: 15, questions: "4,500+", badge: "Challenging", color: "emerald", description: "Pass rate: 29-30%. Comprehensive agriculture review" },
    { id: '1', title: "Engineering Board Exams", abbr: "ENGR", subjects: 20, questions: "6,000+", badge: "Popular", color: "indigo", description: "Civil, Mechanical, Electrical & Electronics Engineering" },
];

// Helper to get some display properties, matching home page logic
const getDisplayProps = (testId: string) => {
    const exam = examCategories.find(e => e.id === testId);
    if (exam) {
        return { color: exam.color, badge: exam.badge, subjects: exam.subjects, questions: exam.questions };
    }
    // Fallback props
    return { color: "slate", badge: "General", subjects: "?", questions: "?" };
}


export default function MockTestsPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">All Mock Tests</h1>
                    <p className="mt-2 text-lg text-gray-600">Choose from our comprehensive list of practice exams to start your preparation.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tests.map((test) => {
                        const displayProps = getDisplayProps(test.id);
                        const questionCount = test.subjects?.reduce((sum, s) => sum + s.questionCount, 0) || test.questionCount || 0;
                        const subjectCount = test.subjects?.length || 0;

                        return (
                            <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:transform hover:translate-y-[-4px] hover:shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 bg-${displayProps.color}-100 rounded-lg border-2 border-dashed border-${displayProps.color}-300 flex items-center justify-center`}>
                                        <span className={`text-xs text-${displayProps.color}-400 font-medium`}>IMG</span>
                                    </div>
                                    <span className={`${
                                        displayProps.badge === 'Most Popular' ? 'bg-rose-100 text-rose-800' :
                                        displayProps.badge === 'High Demand' ? 'bg-teal-100 text-teal-800' :
                                        displayProps.badge === 'Professional' ? 'bg-violet-100 text-violet-800' :
                                        displayProps.badge === 'Premium' ? 'bg-amber-100 text-amber-800' :
                                        displayProps.badge === 'Challenging' ? 'bg-orange-100 text-orange-800' :
                                        'bg-blue-100 text-blue-800'
                                    } text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                                        {displayProps.badge}
                                    </span>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{test.title}</h4>
                                <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-500">{subjectCount} subjects • {questionCount} questions</span>
                                    <span className="text-sm font-medium text-green-600">Free samples available</span>
                                </div>
                                <Link href={`/mock-test/${test.id}`} passHref>
                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                        Take the Test
                                    </Button>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}
