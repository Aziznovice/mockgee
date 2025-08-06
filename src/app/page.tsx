
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Lightbulb, BarChart2, BookOpen, Clock, Linkedin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-7xl items-center justify-between">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">EA</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-bold font-headline">ExamAce Philippines</span>
                        <span className="text-xs text-muted-foreground">Professional Exam Preparation Platform</span>
                    </div>
                </Link>
                <nav className="hidden items-center gap-6 text-sm md:flex">
                    <Link href="#" className="font-medium transition-colors hover:text-primary">Features</Link>
                    <Link href="#" className="font-medium transition-colors hover:text-primary">Exam Types</Link>
                    <Link href="#" className="font-medium transition-colors hover:text-primary">Pricing</Link>
                    <Link href="#" className="font-medium transition-colors hover:text-primary">About</Link>
                </nav>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="#">Sign In</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="#">Start Free Trial</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto max-w-7xl px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                         <Link href="/" className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground">EA</AvatarFallback>
                            </Avatar>
                            <span className="font-bold text-white font-headline">ExamAce Philippines</span>
                        </Link>
                        <p className="mt-4 text-sm">Empowering Filipino professionals to achieve their career goals through comprehensive exam preparation.</p>
                        <div className="mt-4 flex space-x-4">
                            <Link href="#" className="hover:text-white"><Facebook className="h-5 w-5"/></Link>
                            <Link href="#" className="hover:text-white"><Twitter className="h-5 w-5"/></Link>
                            <Link href="#" className="hover:text-white"><Instagram className="h-5 w-5"/></Link>
                            <Link href="#" className="hover:text-white"><Linkedin className="h-5 w-5"/></Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="#" className="hover:text-white">Dashboard</Link></li>
                            <li><Link href="#" className="hover:text-white">Practice Tests</Link></li>
                            <li><Link href="#" className="hover:text-white">Progress Tracking</Link></li>
                            <li><Link href="#" className="hover:text-white">Performance Analytics</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Support & Resources</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-white">Contact Support</Link></li>
                            <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-white">System Status</Link></li>
                            <li><Link href="#" className="hover:text-white">Community</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact Information</h3>
                        <ul className="mt-4 space-y-2">
                            <li className="flex items-center gap-2"><span>support@examace.ph</span></li>
                            <li className="flex items-center gap-2"><span>+63 2 8123 4567</span></li>
                            <li className="flex items-center gap-2"><span>Makati City, Metro Manila</span></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-6 text-sm flex justify-between">
                    <p>&copy; 2024 ExamAce Philippines. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const stats = [
    { value: "15,000+", label: "Practice Questions", sublabel: "Updated Weekly" },
    { value: "85%", label: "Peer Rate Improvement", sublabel: "Verified Results" },
    { value: "12", label: "Exam Categories", sublabel: "All Major Exams" },
    { value: "24/7", label: "Study Access", sublabel: "Mobile & Desktop" },
];

const examCategories = [
    { title: "Civil Service Exam", subjects: 8, questions: "2,500+", badge: "Most Popular", color: "gray" },
    { title: "Nursing Licensure Exam", subjects: 12, questions: "4,200+", badge: "High-Demand", color: "green" },
    { title: "CPA Board Exam", subjects: 10, questions: "3,800+", badge: "Professional", color: "purple" },
    { title: "Bar Examination", subjects: 8, questions: "3,200+", badge: "Premium", color: "orange" },
    { title: "Agriculturist Board Exam", subjects: 15, questions: "4,500+", badge: "Challenging", color: "green" },
    { title: "Engineering Board Exams", subjects: 20, questions: "6,000+", badge: "Popular", color: "purple" },
];

const features = [
    { icon: Lightbulb, title: "Instant Feedback", description: "Get explanations for every answer." },
    { icon: BarChart2, title: "Smart Analytics", description: "Track your weak areas." },
    { icon: Clock, title: "Timed Practice", description: "Real exam conditions." },
    { icon: BookOpen, title: "Study Materials", description: "Comprehensive guides." },
];

const testimonials = [
    { name: "Maria Santos", role: "Civil Service Passer", avatar: "MA", text: "'Passed Civil Service Professional with 89%! The practice questions were exactly like the real exam.'", color: "bg-green-100 dark:bg-green-900/30" },
    { name: "John Reyes, RN", role: "Nursing Board Passer", avatar: "JR", text: "'ExamAce helped me pass the Nursing Board on my first try. The explanations were incredibly helpful.'", color: "bg-blue-100 dark:bg-blue-900/30" },
    { name: "Anna Lopez, CPA", role: "CPA Board Passer", avatar: "AL", text: "'The analytics feature showed me exactly where to focus my studies. Passed CPA Board with confidence!'", color: "bg-purple-100 dark:bg-purple-900/30" },
];

export default function Home() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-primary via-purple-700 to-indigo-900 text-white py-20 md:py-32">
                    <div className="container mx-auto max-w-7xl px-4 text-center">
                        <Badge variant="secondary" className="mb-4">
                            <span className="mr-2">🇵🇭</span> Philippines' Leading Exam Prep Platform
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
                            Master Your Professional Exams
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-lg text-primary-foreground/80">
                            Join 50,000+ successful Filipino professionals who passed their Civil Service, Nursing, CPA, and Bar exams with our AI-powered practice platform.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="#">Try Sample Questions Free</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                                Watch Demo
                            </Button>
                        </div>
                    </div>
                </section>
                
                {/* Stats Section */}
                <section className="bg-background py-16">
                    <div className="container mx-auto max-w-7xl px-4">
                         <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
                            {stats.map(stat => (
                                <div key={stat.label} className="rounded-lg bg-muted/50 p-6 text-center">
                                    <h3 className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</h3>
                                    <p className="text-sm font-semibold mt-1">{stat.label}</p>
                                    <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Exam Categories Section */}
                <section className="py-16 bg-muted/40">
                    <div className="container mx-auto max-w-7xl px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold font-headline">Try Sample Questions by Exam Category</h2>
                            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Get instant access to sample questions from all exam categories. No registration required.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {examCategories.map((exam) => (
                                <Card key={exam.title} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-md bg-${exam.color}-100 flex items-center justify-center`}>
                                                    <BookOpen className={`h-5 w-5 text-${exam.color}-600`} />
                                                </div>
                                                <CardTitle className="font-headline text-lg">{exam.title}</CardTitle>
                                            </div>
                                            <Badge variant="outline" className={`border-${exam.color}-500 text-${exam.color}-600`}>{exam.badge}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
                                        <p>{exam.subjects} subjects • {exam.questions} questions</p>
                                        <p className="text-green-600 font-semibold">Free samples available</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className={`w-full bg-${exam.color}-600 hover:bg-${exam.color}-700`} asChild>
                                            <Link href="#">
                                                Try Sample Questions
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Features Section */}
                <section className="py-16">
                    <div className="container mx-auto max-w-5xl px-4 text-center">
                         <h2 className="text-3xl font-bold font-headline mb-4">What You Get with ExamAce</h2>
                         <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mt-8">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex flex-col items-center">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <feature.icon className="h-6 w-6"/>
                                    </div>
                                    <h3 className="mt-4 font-semibold">{feature.title}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 bg-muted/40">
                    <div className="container mx-auto max-w-4xl px-4">
                        <h2 className="text-3xl font-bold text-center font-headline mb-8">Success Stories from Our Users</h2>
                        <div className="space-y-4">
                            {testimonials.map((testimonial) => (
                                <Card key={testimonial.name} className={testimonial.color}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-4">
                                            <Avatar>
                                                <AvatarFallback className="bg-primary/20">{testimonial.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{testimonial.name}</p>
                                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                                <blockquote className="mt-2 italic border-l-2 pl-4">{testimonial.text}</blockquote>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                         <div className="text-center mt-12">
                             <Button size="lg">Join 50,000+ Successful Professionals</Button>
                         </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}
