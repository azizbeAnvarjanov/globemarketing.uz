'use client';

import { useState } from 'react';
import ContactModal from './ContactModal';
import { useTranslations } from '@/contexts/LanguageContext';

export default function ServicesSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const t = useTranslations();

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false);
  };
  const services = [
    {
      id: 1,
      title: t.services.marketing.title,
      items: t.services.marketing.items,
      backgroundImage: "/service1.jpg"
    },
    {
      id: 2,
      title: t.services.branding.title,
      items: t.services.branding.items,
      backgroundImage: "/service2.jpg"
    },
    {
      id: 3,
      title: t.services.website.title,
      items: t.services.website.items,
      backgroundImage: "/service3.jpg"
    },
    {
      id: 4,
      title: t.services.smmMedia.title,
      items: t.services.smmMedia.items,
      backgroundImage: "/service4.jpg"
    }
  ];

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-400 text-sm mb-4 tracking-wide">{t.services.sectionLabel}</p>
          <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight mb-6">
            {t.services.title}
          </h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-3xl p-8 lg:p-10 backdrop-blur-sm border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group overflow-hidden"
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Title */}
                <h3 className="text-orange-Globe text-2xl lg:text-3xl font-bold mb-6">
                  {service.title}
                </h3>

                {/* Items List */}
                <ul className="text-gray-300 text-base leading-relaxed mb-8 space-y-3 flex-grow">
                  {service.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-orange-Globe mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button 
                  onClick={handleContactClick}
                  className="bg-orange-Globe hover:bg-orange-600 text-white px-6 py-3 rounded-full text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer w-fit"
                >
                  {t.buttons.submitApplication}
                </button>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-orange-Globe/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
}
