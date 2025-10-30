'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTranslations } from '@/contexts/LanguageContext';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations();

  const faqData = t.faq.questions;

  useEffect(() => {
    contentRefs.current.forEach((content, index) => {
      if (content) {
        if (index === activeIndex) {
          gsap.to(content, {
            height: 'auto',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        } else {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      }
    });
  }, [activeIndex]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section 
      className="py-20 px-4 bg-black bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/WeAre.png)'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-while-400 text-sm mb-4 tracking-wide">{t.faq.sectionLabel}</p>
          <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight">
            {t.faq.title}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`border-2 ${
                activeIndex === index ? 'border-orange-500' : 'border-gray-600/30'
              } rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm transition-all duration-300`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full p-6 text-left flex items-center justify-between text-white transition-colors duration-200 cursor-pointer ${
                  activeIndex === index 
                    ? 'bg-orange-600/20 hover:bg-orange-600/30' 
                    : 'hover:bg-orange-600/10'
                }`}
              >
                <span className="text-lg font-medium pr-4">{item.question}</span>
                <div 
                  className={`w-8 h-8 rounded-full ${
                    activeIndex === index ? 'border-2 border-white' : 'border-2 border-orange-500'
                  } flex items-center justify-center transition-all duration-300 flex-shrink-0`}
                >
                  {activeIndex === index ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Answer Content */}
              <div
                ref={(el) => { contentRefs.current[index] = el; }}
                className="overflow-hidden"
                style={{ height: index === 0 ? 'auto' : 0 }}
              >
                <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
