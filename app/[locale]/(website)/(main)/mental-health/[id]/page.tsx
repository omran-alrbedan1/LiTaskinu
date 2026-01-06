// app/(website)/[locale]/(main)/psychiatrists/[id]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
    Mail,
    Phone,
    Globe,
    BookOpen,
    GraduationCap,
    MessageCircle,
    Award,
    Star,
    Calendar,
    Clock,
    MessageSquare
} from 'lucide-react';
import { MOCK_PSYCHIATRISTS } from '@/constants/temporary';
import Link from 'next/link';
import FloatingChatButton from '@/components/website/shared/FloatingChatButton';

interface PsychiatristDetailPageProps {
    params: {
        id: string;
        locale: string;
    };
}

export default function PsychiatristDetailPage({ params }: PsychiatristDetailPageProps) {
    const { id } = params;

    const psychiatrist = MOCK_PSYCHIATRISTS.find(p => p.id.toString() === id);

    if (!psychiatrist) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Main Profile Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column - Compact Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Profile Image Card with Gradient Effect */}
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-color1 to-primary-color1/40 rounded-2xl opacity-60 group-hover:opacity-100 blur transition duration-500"></div>
                                <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-2xl transition-shadow">
                                    <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-primary-color1/20 mb-4">
                                        <Image
                                            src={psychiatrist.image.src}
                                            alt={psychiatrist.name}
                                            fill
                                            className="object-cover"
                                            priority
                                            placeholder="blur"
                                            blurDataURL={psychiatrist.image.blurDataURL}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Compact Contact Info Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-2 hover:shadow-xl transition-all duration-300">
                                <div className="space-y-3">
                                    {/* Email */}
                                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-color1/5 hover:to-transparent transition-all duration-300 group">
                                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-color1/20 to-primary-color1/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Mail className="h-4 w-4 text-primary-color1" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <a
                                                href={`mailto:${psychiatrist.email}`}
                                                className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-color1 transition-colors truncate block font-medium"
                                                title={psychiatrist.email}
                                            >
                                                {psychiatrist.email}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-color1/5 hover:to-transparent transition-all duration-300 group">
                                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-color1/20 to-primary-color1/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <Phone className="h-4 w-4 text-primary-color1" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <a
                                                href={`tel:${psychiatrist.phone.replace(/\D/g, '')}`}
                                                className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-color1 transition-colors truncate block font-medium"
                                            >
                                                {psychiatrist.phone}
                                            </a>
                                        </div>
                                    </div>

                                    {/* Languages */}
                                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3 mb-3 px-1">
                                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-color1/20 to-primary-color1/10 flex items-center justify-center flex-shrink-0">
                                                <Globe className="h-4 w-4 text-primary-color1" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Languages
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 pl-12">
                                            {psychiatrist.languages.map((language, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-primary-color1/15 to-primary-color1/5 text-primary-color1 border-2 border-primary-color1/20 hover:border-primary-color1/50 hover:shadow-md transition-all"
                                                >
                                                    {language}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Main Content */}
                    <div className="lg:col-span-3">
                        {/* Main Content Container */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow">
                            {/* Header Section */}
                            <div className="relative py-3 px-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/50">
                                <div className="flex relative flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                                            {psychiatrist.name}
                                        </h1>
                                    </div>

                                    <div className="absolute right-0 top-0 flex items-center gap-2 bg-gradient-to-r from-primary-color1/10 to-primary-color1/5 border-2 border-primary-color1/30 p-2 rounded-full hover:border-primary-color1/60 transition-all">
                                        <Star className="h-4 w-4 text-primary-color1 fill-primary-color1" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {psychiatrist.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Experience Section */}
                            <div className="py-3 px-6 border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-gray-50/30 hover:to-transparent dark:hover:from-gray-800/30 transition-all">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-color1/20 to-primary-color1/10 flex items-center justify-center shadow-sm">
                                        <Award className="h-6 w-6 text-primary-color1" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Professional Experience
                                        </h3>
                                        <div className="h-1 w-16 bg-gradient-to-r from-primary-color1 to-primary-color1/40 rounded-full mt-1"></div>
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base max-w-3xl">
                                    {psychiatrist.experience}
                                </p>
                            </div>

                            {/* Bio Section */}
                            <div className="py-3 px-6 border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-gray-50/30 hover:to-transparent dark:hover:from-gray-800/30 transition-all">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-color1/20 to-primary-color1/10 flex items-center justify-center shadow-sm">
                                        <GraduationCap className="h-6 w-6 text-primary-color1" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Professional Background
                                        </h3>
                                        <div className="h-1 w-16 bg-gradient-to-r from-primary-color1 to-primary-color1/40 rounded-full mt-1"></div>
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base max-w-3xl">
                                    {psychiatrist.bio}
                                </p>
                            </div>

                            {/* Specializations Section */}
                            <div className="py-3 px-6 hover:bg-gradient-to-r hover:from-gray-50/30 hover:to-transparent dark:hover:from-gray-800/30 transition-all">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-color1/20 to-primary-color1/10 flex items-center justify-center shadow-sm">
                                        <BookOpen className="h-6 w-6 text-primary-color1" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Areas of Specialization
                                        </h3>
                                        <div className="h-1 w-16 bg-gradient-to-r from-primary-color1 to-primary-color1/40 rounded-full mt-1"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                                    {psychiatrist.specialization.map((spec, index) => (
                                        <div
                                            key={index}
                                            className="group relative overflow-hidden flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-color1/50 transition-all bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-850 hover:shadow-lg"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary-color1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary-color1/20 to-primary-color1/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <BookOpen className="h-4 w-4 text-primary-color1" />
                                            </div>
                                            <span className="relative text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary-color1 transition-colors">
                                                {spec}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Chat Button */}
            <FloatingChatButton
                url={`./${id}/chat`}
            />
        </div>
    );
}