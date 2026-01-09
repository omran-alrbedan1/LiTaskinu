import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  className = ''
}: FeatureCardProps) {
  return (
    <div className={`group relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
      
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Icon Container */}
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-light/40 mb-6`}>
          <div className={`relative w-8 h-8 text-primary-color1`}>
            <Icon className="w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-br opacity-10 blur-md from-current to-transparent"></div>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>

        {/* Decorative Line */}
        <div className="mt-6">
          <div className={`h-1 w-16 rounded-full bg-primary-color1 opacity-70`}></div>
        </div>
      </div>
    </div>
  );
}