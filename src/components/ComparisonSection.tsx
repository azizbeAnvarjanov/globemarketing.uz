'use client';

import { useTranslations } from '@/contexts/LanguageContext';

export default function ComparisonSection() {
  const t = useTranslations();
  return (
    <section 
      className="py-20 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/bg.png)'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-white-400 text-sm mb-4 tracking-wide">{t.comparison.sectionLabel}</p>
          <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight mb-4">
            {t.comparison.title}
          </h2>
          {t.comparison.subtitle && (
            <h3 className="text-white text-2xl lg:text-3xl font-semibold mb-4">
              {t.comparison.subtitle}
            </h3>
          )}
          <p className="text-gray-300 text-lg">
            {t.comparison.description}
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Other Agencies Card */}
          <div className="bg-gray-900/50 rounded-3xl p-8 hover:scale-105 transition-transform duration-300 ease-in-out">
            <h3 className="text-white text-2xl font-semibold mb-8">{t.comparison.otherAgencies.title}</h3>
            <div className="space-y-4">
              {t.comparison.otherAgencies.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Globe Marketing Card */}
          <div 
            className="rounded-3xl p-8 relative overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out"
            style={{
              background: 'linear-gradient(135deg, rgba(49, 17, 6, 0.5), rgba(227, 68, 9, 0.5))'
            }}
          >
            <div className="space-y-5">
              {t.comparison.whyGlobe.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white text-base leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* Conclusion */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white text-lg font-semibold text-center">
                {t.comparison.conclusion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
