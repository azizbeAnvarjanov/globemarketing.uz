'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContactModal from './ContactModal';
import { useLanguage, useTranslations } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const { language, setLanguage } = useLanguage();
  const t = useTranslations();

  const handleContactClick = () => {
    setIsContactModalOpen(true);
    setIsMobileMenuOpen(false); // Закрываем мобильное меню если открыто
  };

  const handleCloseModal = () => {
    setIsContactModalOpen(false);
  };

  const handleLanguageChange = (newLanguage: 'ru' | 'uz') => {
    setLanguage(newLanguage);
    setIsLanguageDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen || isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, isLanguageDropdownOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm" ref={menuRef}>
      <div className="container mx-auto px-4 lg:px-6" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <nav className="flex items-center justify-between">
          {/* Logo - always Link to home */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-200 cursor-pointer">
            <Image 
              src="/logo.png" 
              alt="Globe Marketing Logo" 
              width={120} 
              height={40} 
              className="h-8 lg:h-10 w-auto"
              priority
            />
          </Link>
          
          {/* Navigation Menu - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/#services" className="text-white hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base cursor-pointer">
              {t.navigation.services}
            </Link>
            <Link href="/#cases" className="text-white hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base cursor-pointer">
              {t.navigation.resources}
            </Link>
            <Link href="/#team" className="text-white hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base cursor-pointer">
              {t.navigation.agency}
            </Link>
            <Link href="/#faq" className="text-white hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base cursor-pointer">
              {t.navigation.career}
            </Link>
            <Link href="/#contacts" className="text-white hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base cursor-pointer">
              {t.navigation.contacts}
            </Link>
          </div>
          
          {/* Language and CTA */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center text-white text-sm hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              >
                <span className="hidden sm:block">{language === 'ru' ? t.language.ru : t.language.uz}</span>
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isLanguageDropdownOpen && (
                <div className="absolute top-8 right-0 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg py-2 min-w-[80px] z-50">
                  <button 
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleLanguageChange('ru')}
                  >
                    {t.language.ru}
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleLanguageChange('uz')}
                  >
                    {t.language.uz}
                  </button>
                </div>
              )}
            </div>
            
            {/* CTA Button - opens modal */}
            <button 
              onClick={handleContactClick}
              className="text-orange-Globe hover:text-orange-600 transition-colors duration-200 font-medium text-xs sm:text-sm lg:text-base cursor-pointer"
            >
              <span className="hidden sm:inline">{t.buttons.submitApplicationShort}</span>
              <span className="sm:hidden">{t.buttons.submitApplicationMobile}</span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button 
              className="text-white ml-2 p-1 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 bg-black/20 backdrop-blur-sm rounded-lg">
            <div className="flex flex-col space-y-4 p-4">
              <Link href="/#services" className="text-white hover:text-gray-300 transition-colors duration-200 py-2 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                {t.navigation.services}
              </Link>
              <Link href="/#cases" className="text-white hover:text-gray-300 transition-colors duration-200 py-2 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                {t.navigation.resources}
              </Link>
              <Link href="/#team" className="text-white hover:text-gray-300 transition-colors duration-200 py-2 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                {t.navigation.agency}
              </Link>
              <Link href="/#faq" className="text-white hover:text-gray-300 transition-colors duration-200 py-2 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                {t.navigation.career}
              </Link>
              <Link href="/#contacts" className="text-white hover:text-gray-300 transition-colors duration-200 py-2 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>
                {t.navigation.contacts}
              </Link>
              <div className="pt-2 border-t border-white/20">
                <span className="text-white text-sm block mb-2">{t.language.languageLabel}</span>
                <button 
                  onClick={handleContactClick}
                  className="text-orange-Globe hover:text-orange-600 transition-colors duration-200 font-medium cursor-pointer"
                >
                  {t.buttons.submitApplicationShort}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={handleCloseModal} 
      />
    </header>
  );
};

export default Header;
