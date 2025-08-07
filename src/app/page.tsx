

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Lightbulb, BarChart2, BookOpen, Clock, Linkedin, Facebook, Twitter, Instagram, Menu, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


// Custom styles to match design.html
const customStyles = `
  .card-hover {
    transition: all 0.3s ease;
  }
  
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .bg-gradient-indigo {
    background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #4338ca 100%);
  }
`;

// Inject custom styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
}

function Header() {
    return (
        <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">EA</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ExamAce Philippines</h1>
                            <p className="text-sm text-indigo-600 font-medium">Professional Exam Preparation Platform</p>
                        </div>
                    </div>
                    <nav className="hidden lg:flex space-x-1">
                        <Link href="#features" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-sm transition-all">Features</Link>
                        <Link href="#exams" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-sm transition-all">Exam Types</Link>
                        <Link href="#pricing" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-sm transition-all">Pricing</Link>
                        <Link href="#about" className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-sm transition-all">About</Link>
                    </nav>
                    <div className="flex items-center space-x-3">
                        <button className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-all">
                            Sign In
                        </button>
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-all shadow-sm">
                            Start Free Trial
                        </button>
                        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">EA</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">ExamAce Philippines</h3>
                                <p className="text-sm text-gray-400">Professional Exam Preparation</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Empowering Filipino professionals to achieve their career goals through comprehensive exam preparation and practice tests for Civil Service, Nursing, CPA, Bar, and other professional licensure examinations.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Practice Tests</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Study Guides</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Progress Tracking</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Mock Exams</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Performance Analytics</Link></li>
                        </ul>
                    </div>

                    {/* Exam Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Exam Categories</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Civil Service Exam</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Nursing Licensure</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">CPA Board Exam</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Bar Examination</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Engineering Board</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Agriculturist Board</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Support & Legal */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support & Resources</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <ul className="space-y-2">
                                    <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
                                    <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Contact Support</Link></li>
                                    <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
                                    <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Tutorials</Link></li>
                                </ul>
                                <ul className="space-y-2">
                                    <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">System Status</Link></li>
                                    <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Updates</Link></li>
                                    <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Community</Link></li>
                                    <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
                            <div className="space-y-2 text-gray-300">
                                <p>📧 support@examace.ph</p>
                                <p>📞 +63 2 8123 4567</p>
                                <p>📍 Makati City, Metro Manila, Philippines</p>
                                <p>🕒 Monday - Friday: 8:00 AM - 6:00 PM (PHT)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2024 ExamAce Philippines. All rights reserved.
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</Link>
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
    { id: '1', title: "Civil Service Exam", abbr: "CSE", subjects: 8, questions: "2,500+", badge: "Most Popular", color: "slate", description: "Professional & Sub-professional levels. Pass rate: 14-18%" },
    { id: '2', title: "Nursing Licensure Exam", abbr: "NLE", subjects: 12, questions: "4,200+", badge: "High Demand", color: "teal", description: "Requires ≥75% general average for passing" },
    { id: '3', title: "CPA Board Exam", abbr: "CPALE", subjects: 10, questions: "3,800+", badge: "Professional", color: "violet", description: "Certified Public Accountant licensure examination" },
    { id: '3', title: "Bar Examination", abbr: "BAR", subjects: 8, questions: "3,200+", badge: "Premium", color: "amber", description: "Philippine Bar Exam for law practitioners" },
    { id: '3', title: "Agriculturist Board Exam", abbr: "ALE", subjects: 15, questions: "4,500+", badge: "Challenging", color: "emerald", description: "Pass rate: 29-30%. Comprehensive agriculture review" },
    { id: '1', title: "Engineering Board Exams", abbr: "ENGR", subjects: 20, questions: "6,000+", badge: "Popular", color: "indigo", description: "Civil, Mechanical, Electrical & Electronics Engineering" },
];

const features = [
    { icon: Lightbulb, title: "Instant Feedback", description: "Get explanations for every answer." },
    { icon: BarChart2, title: "Smart Analytics", description: "Track your weak areas." },
    { icon: Clock, title: "Timed Practice", description: "Real exam conditions." },
    { icon: BookOpen, title: "Study Materials", description: "Comprehensive guides." },
];

const subscriptionFeatures = [
    { text: "Practice your mistakes with personalized quizzes." },
    { text: "Track your progress with detailed performance analytics." },
    { text: "Master a wide range of topics with our extensive question bank." },
    { text: "Simulate real exam conditions with timed mock tests." },
    { text: "Get detailed explanations for every question." },
    { text: "Access all study materials and guides 24/7." },
];

const testimonials = [
    { name: "Maria Santos", role: "Civil Service Passer", avatar: "MA", text: "Passed Civil Service Professional with 89%! The practice questions were exactly like the real exam.", color: "bg-green-50" },
    { name: "John Reyes, RN", role: "Nursing Board Passer", avatar: "JR", text: "ExamAce helped me pass the Nursing Board on my first try. The explanations were incredibly helpful!", color: "bg-blue-50" },
    { name: "Anna Lopez, CPA", role: "CPA Board Passer", avatar: "AL", text: "The analytics feature showed me exactly where to focus my studies. Passed CPA Board with confidence!", color: "bg-purple-50" },
];


function TypewriterEffect() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = [
    "way to success",
    "ExamAce Philippines",
    ...examCategories.map(exam => exam.title)
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      if (!isDeleting && text === fullText) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setTypingSpeed(isDeleting ? 75 : 150);
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent border-r-2 border-yellow-400">
      {text}
    </span>
  );
}


export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background with enhanced gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        {/* Main heading with better typography */}
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-indigo-200 mb-4">
                                 Philippines' Leading Exam Prep Platform
                            </span>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight h-24 md:h-36">
                                Practice your <TypewriterEffect />
                            </h2>
                            <p className="text-xl md:text-2xl text-indigo-100 mb-10 max-w-4xl mx-auto leading-relaxed">
                                Join <strong className="text-white">50,000+</strong> successful Filipino professionals who passed their Civil Service, Nursing, CPA, and Bar exams with our AI-powered practice platform.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <button 
                                onClick={() => {
                                    document.getElementById('exam-categories')?.scrollIntoView({ 
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }}
                                className="bg-white text-indigo-900 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-green-100 transition-all transform hover:scale-105 shadow-xl"
                            >
                                Start Now
                            </button>
                            {/* <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                                Watch Demo
                            </button> */}
                        </div>

                        {/* Enhanced Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {stats.map(stat => (
                                <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                    <div className="text-sm text-indigo-200 font-medium">{stat.label}</div>
                                    <div className="text-xs text-indigo-300 mt-1">{stat.sublabel}</div>
                                </div>
                            ))}
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-12 pt-8 border-t border-white/20">
                            <p className="text-indigo-200 text-sm mb-4">Practice tests available for:</p>
                             <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                    slidesToScroll: 1,
                                }}
                                plugins={[
                                    Autoplay({
                                      delay: 2000,
                                      stopOnInteraction: false,
                                    }),
                                  ]}
                                className="w-full max-w-lg mx-auto"
                                >
                                <CarouselContent>
                                    {examCategories.map((exam, index) => (
                                    <CarouselItem key={index} className="basis-1/3 md:basis-1/4 lg:basis-1/5">
                                        <div className="p-1">
                                            <div className="flex items-center justify-center p-2 bg-white/5 rounded-md">
                                                <span className="text-lg font-semibold text-white">{exam.abbr}</span>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                             </Carousel>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main id="exam-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Exam Categories */}
                <section  className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Mock Test</h3>
                        <Link href="/mock-tests" passHref>
                            <Button variant="outline" className="flex items-center gap-2">
                                <View className="h-4 w-4" />
                                View All
                            </Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {examCategories.map((exam) => (
                            <div key={exam.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:transform hover:translate-y-[-4px] hover:shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 bg-${exam.color}-100 rounded-lg border-2 border-dashed border-${exam.color}-300 flex items-center justify-center`}>
                                        <span className={`text-xs text-${exam.color}-400 font-medium`}>IMG</span>
                                    </div>
                                    <span className={`${
                                        exam.badge === 'Most Popular' ? 'bg-rose-100 text-rose-800' :
                                        exam.badge === 'High Demand' ? 'bg-teal-100 text-teal-800' :
                                        exam.badge === 'Professional' ? 'bg-violet-100 text-violet-800' :
                                        exam.badge === 'Premium' ? 'bg-amber-100 text-amber-800' :
                                        exam.badge === 'Challenging' ? 'bg-orange-100 text-orange-800' :
                                        'bg-blue-100 text-blue-800'
                                    } text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                                        {exam.badge}
                                    </span>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">{exam.title}</h4>
                                <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-500">{exam.subjects} subjects • {exam.questions} questions</span>
                                    <span className="text-sm font-medium text-green-600">Free samples available</span>
                                </div>
                                <Link href={`/mock-test/${exam.id}`} passHref>
                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                        Take the Test
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                 {/* Why Subscribe Section */}
                 <section className="mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-900">Why Subscribe to ExamAce?</h3>
                        <p className="text-lg text-gray-600 mt-2">Unlock your full potential and pass your exam with confidence.</p>
                    </div>
                    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {subscriptionFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                    </div>
                                    <p className="text-gray-700">{feature.text}</p>
                                </div>
                            ))}
                        </div>
                         <div className="mt-8 text-center">
                            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md">
                                View Pricing & Plans
                            </button>
                        </div>
                    </div>
                </section>

                {/* Success Stories */}
                <section>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Success Stories from Our Users</h3>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="p-6">
                            <div className="space-y-4">
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.name} className={`flex items-start space-x-4 p-4 ${testimonial.color} rounded-lg`}>
                                        <div className={`w-10 h-10 ${
                                            testimonial.color === 'bg-green-50' ? 'bg-green-100' :
                                            testimonial.color === 'bg-blue-50' ? 'bg-blue-100' :
                                            'bg-purple-100'
                                        } rounded-full flex items-center justify-center flex-shrink-0`}>
                                            <span className={`${
                                                testimonial.color === 'bg-green-50' ? 'text-green-600' :
                                                testimonial.color === 'bg-blue-50' ? 'text-blue-600' :
                                                'text-purple-600'
                                            } font-medium text-sm`}>
                                                {testimonial.avatar}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{testimonial.name}</p>
                                            <p className="text-sm text-gray-600 mb-2">"{testimonial.text}"</p>
                                            <span className={`${
                                                testimonial.color === 'bg-green-50' ? 'bg-green-100 text-green-800' :
                                                testimonial.color === 'bg-blue-50' ? 'bg-blue-100 text-blue-800' :
                                                'bg-purple-100 text-purple-800'
                                            } text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                                                {testimonial.role}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all">
                                    Join 50,000+ Successful Professionals
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
