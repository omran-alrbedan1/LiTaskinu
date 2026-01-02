import { Mail, Phone, Clock } from 'lucide-react';
import Image from 'next/image';
import { images } from '@/constants/images';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-primary-color1 text-white py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                Privacy Policy
              </h1>
              <p className="text-white/90 text-sm md:text-base">
                We are strongly committed to protecting your privacy and providing transparent information about how we collect, use, and share your personal information. Last updated: February 10th, 2025
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src={images.privacyPolicy}
                height={160}
                width={160}
                alt="privacy-policy"
                className="w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 dark:brightness-90"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-900/50 p-4 md:p-8">
          {/* Introduction */}
          <section id="introduction" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1 dark:text-primary-color1">①</span> Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Welcome to the <strong className="text-primary-color1 dark:text-primary-color1">Clande</strong> website (the "legal frame"). This Privacy Policy outlines the personal information practices of our website and related online products and features (collectively, "Products").
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This Privacy Policy describes the types of personal information we collect from you and how we use, share, and protect it. We are committed to protecting your privacy and being transparent about our data processing activities.
            </p>
          </section>

          {/* Data Collection */}
          <section id="data-collection" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1 dark:text-primary-color1">②</span> Data Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We collect information about you directly from you and automatically through your use of our Products, as well as from third parties.
            </p>
            <div className="border-l-4 border-primary-color1 dark:border-primary-color1 bg-primary-color1/5 dark:bg-primary-color1/10 p-4 mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Information we collect directly from you:</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Your name, email address, phone number, and other contact information</li>
                <li>Account credentials, such as your username and password</li>
                <li>Payment information when you make a purchase</li>
                <li>Communications you send to us</li>
              </ul>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Types of information we use: names, contact info (such email, address, phone number), demographic details (location, interests, and preferences), technical data (browser type, IP address, device, cookie data), usage information, and files and content you provide to us. If we collect sensitive or special categories of data from you, we will always inform you and obtain your consent where required.
            </p>
          </section>

          {/* Use of Data */}
          <section id="use-of-data" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1 dark:text-primary-color1">③</span> Use of Data
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We use the data we collect about you for:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
              <li>Providing and personalizing our products and services to you, including any tailored features or content</li>
              <li>Processing payments and completing your requested transactions</li>
              <li>Sending you important information about the Products or service updates</li>
              <li>Communicating with you about your account or responding to your inquiries</li>
              <li>Marketing and promotional communications (with your consent where required)</li>
              <li>Improving, customizing, and developing our Products</li>
              <li>Conducting analytics and research about how you use the Products</li>
              <li>Ensuring the safety, integrity, and security of our systems and our products</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section id="cookies" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1 dark:text-primary-color1">④</span> Cookies and Tracking
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to collect information about you for various purposes. These technologies help us to provide and improve our services, understand user behavior, and provide you with a more personalized experience.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Essential cookies:</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These cookies are required for you to access our website and features and use its functionalities. Essential cookies cannot be disabled or turned off, as the site is dependent upon them.
              </p>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Performance cookies:</h3>
              <p className="text-gray-600 dark:text-gray-300">
                These cookies collect information about how you use our website so we can improve it. For instance, performance cookies tell us which pages are most frequently visited, help us record difficulties you may have with the site, and show us whether our advertising is effective or not.
              </p>
            </div>
          </section>

          {/* Third Party Services */}
          <section id="third-party" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1 dark:text-primary-color1">⑤</span> Third party Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              We may use trusted third-party service providers to enhance your experience on our platform. These service providers may have access to your personal information only to perform their services on our behalf.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
              <li>Payment processors to facilitate secure payment transactions</li>
              <li>Analytics providers to help us improve our services</li>
              <li>Customer support platforms for efficient communication</li>
              <li>Cloud hosting services for data storage and processing</li>
              <li>Marketing platforms for sending newsletters and promotions (with your consent)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              We require such third parties with which we share your personal information to provide an equivalent level of protection of your personal information as we do.
            </p>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1 dark:text-primary-color1">⑥</span> Your Rights
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <div className="space-y-4">
              {[
                { title: 'Access', desc: 'Request a copy of the personal information we hold about you.' },
                { title: 'Correction', desc: 'Request that we correct any inaccurate or incomplete personal information.' },
                { title: 'Deletion', desc: 'Request that we delete your personal information, subject to certain exceptions.' },
                { title: 'Objection', desc: 'Object to our processing of your personal information for certain purposes.' },
                { title: 'Data Portability', desc: 'Request a copy of your personal information in a structured, commonly used, and machine-readable format.' }
              ].map((right, index) => (
                <div key={index} className="border-l-4 border-primary-color1 dark:border-primary-color1 pl-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{right.title}:</h3>
                  <p className="text-gray-600 dark:text-gray-300">{right.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the contact information provided in the Contact Us section below.
            </p>
          </section>

          {/* Contact Us */}
          <section id="contact" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1 dark:text-primary-color1">⑦</span> Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              If you have any questions or concerns about this Privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-primary-color1/10 dark:bg-primary-color1/20 p-4 md:p-6 rounded">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-primary-color1 dark:text-primary-color1 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Email:</h3>
                    <a href="mailto:privacy@clande.com" className="text-primary-color1 dark:text-primary-color1 hover:underline">
                      privacy@clande.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-primary-color1 dark:text-primary-color1 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Phone:</h3>
                    <p className="text-gray-600 dark:text-gray-300">+33 (0) 1 23 45 678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-primary-color1 dark:text-primary-color1 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Business Hours:</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monday to Friday, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
            Last updated: February 10th, 2025. We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;