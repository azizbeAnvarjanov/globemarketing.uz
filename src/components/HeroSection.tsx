'use client';

import React, { useState } from 'react';
import ContactModal from './ContactModal';
import { useLanguage, useTranslations } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { language } = useLanguage();
  const t = useTranslations();

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false);
  };
  return (
    <section className="relative h-screen bg-gray-800 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10"></div>
      
      {/* City Silhouette - Full height background */}
      <div 
        className="absolute inset-0 w-full h-full bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url(/bg.png)', 
          backgroundPosition: 'bottom center',
          backgroundSize: 'cover'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-start justify-center px-4" style={{ paddingTop: '300px' }}>
        <div className="container mx-auto text-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-4 lg:mb-6">
            {language === 'uz' ? (
              <>
                <span className="text-orange-Globe font-normal">{t.hero.titleStart}</span>{' '}
                {t.hero.title}{' '}
                {t.hero.titleEnd && `${t.hero.titleEnd}`}
              </>
            ) : (
              <>
                {t.hero.title}{' '}
                <span className="text-orange-Globe font-normal">{t.hero.titleStart}</span>{' '}
                {t.hero.titleEnd && `${t.hero.titleEnd}`}
              </>
            )}
          </h1>
          
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto mb-8 lg:mb-12 leading-relaxed px-4 sm:px-0 ">
            {t.hero.description}
          </p>
          
          <button 
            onClick={handleContactClick}
            className="bg-orange-Globe hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            {t.buttons.submitApplication}
          </button>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
};

export default HeroSection;
