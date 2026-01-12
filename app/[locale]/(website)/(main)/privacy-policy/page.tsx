import { Mail, Phone, Clock } from 'lucide-react';
import Image from 'next/image';
import { images } from '@/constants/images';
import { getTranslations } from 'next-intl/server';

const PrivacyPolicyPage = async () => {
  const t = await getTranslations('privacy_policy');

  const rights = [
    { title: t('sections.rights.list.access.title'), desc: t('sections.rights.list.access.desc') },
    { title: t('sections.rights.list.correction.title'), desc: t('sections.rights.list.correction.desc') },
    { title: t('sections.rights.list.deletion.title'), desc: t('sections.rights.list.deletion.desc') },
    { title: t('sections.rights.list.objection.title'), desc: t('sections.rights.list.objection.desc') },
    { title: t('sections.rights.list.portability.title'), desc: t('sections.rights.list.portability.desc') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-primary-color1 text-white py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                {t('title')}
              </h1>
              <p className="text-white/90 text-sm md:text-base">
                {t('header_desc')}
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
              <span className="text-primary-color1">①</span> {t('sections.intro.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t.rich('sections.intro.p1', {
                important: (chunks) => <strong className="text-primary-color1">{chunks}</strong>
              })}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('sections.intro.p2')}
            </p>
          </section>

          {/* Data Collection */}
          <section id="data-collection" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1">②</span> {t('sections.collection.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t('sections.collection.desc')}
            </p>
            <div className="border-l-4 border-primary-color1 dark:border-primary-color1 bg-primary-color1/5 dark:bg-primary-color1/10 p-4 mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('sections.collection.direct_title')}</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>{t(`sections.collection.items.${i}`)}</li>
                ))}
              </ul>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('sections.collection.footer')}
            </p>
          </section>

          {/* Use of Data */}
          <section id="use-of-data" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1">③</span> {t('sections.usage.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t('sections.usage.desc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li key={i}>{t(`sections.usage.items.${i}`)}</li>
              ))}
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section id="cookies" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1">④</span> {t('sections.cookies.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t('sections.cookies.desc')}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('sections.cookies.essential_title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('sections.cookies.essential_desc')}</p>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('sections.cookies.performance_title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('sections.cookies.performance_desc')}</p>
            </div>
          </section>

          {/* Third Party Services */}
          <section id="third-party" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1">⑤</span> {t('sections.third_party.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t('sections.third_party.desc')}
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i}>{t(`sections.third_party.items.${i}`)}</li>
              ))}
            </ul>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              {t('sections.third_party.footer')}
            </p>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1">⑥</span> {t('sections.rights.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t('sections.rights.desc')}
            </p>
            <div className="space-y-4">
              {rights.map((right, index) => (
                <div key={index} className="border-l-4 border-primary-color1 pl-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{right.title}:</h3>
                  <p className="text-gray-600 dark:text-gray-300">{right.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
              {t('sections.rights.footer')}
            </p>
          </section>

          {/* Contact Us */}
          <section id="contact" className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-primary-color1">⑦</span> {t('sections.contact.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {t('sections.contact.desc')}
            </p>
            <div className="bg-primary-color1/10 dark:bg-primary-color1/20 p-4 md:p-6 rounded">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-primary-color1 dark:text-primary-color1 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{t('sections.contact.email_label')}</h3>
                    <a href="mailto:privacy@clande.com" className="text-primary-color1 hover:underline">
                      privacy@clande.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-primary-color1 dark:text-primary-color1 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{t('sections.contact.phone_label')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">+33 (0) 1 23 45 678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-primary-color1 dark:text-primary-color1 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">{t('sections.contact.hours_label')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t('sections.contact.hours_value')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
            {t('last_updated')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;