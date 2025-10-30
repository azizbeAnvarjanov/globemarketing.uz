'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Footer from './Footer';
import { useTranslations } from '@/contexts/LanguageContext';
interface FormData {
  name: string;
  phone: string;
  email: string;
  position: string;
  service: string;
  how: string;
  agreedToTerms: boolean;
}

export default function ContactSection() {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isHowOpen, setIsHowOpen] = useState(false);
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<FormData>({
    defaultValues: {
      phone: '+998 ',
      agreedToTerms: false
    }
  });

  const phoneValue = watch('phone');
  const agreedToTerms = watch('agreedToTerms');

  // Форматирование телефона
  const formatPhone = (value: string) => {
    const numbersOnly = value.replace(/\D/g, '');
    
    if (!numbersOnly.startsWith('998')) {
      return '+998 ';
    }
    
    let formattedNumber = '+998';
    const restNumbers = numbersOnly.substring(3);
    
    if (restNumbers.length > 0) {
      formattedNumber += ' ' + restNumbers.substring(0, 2);
    }
    if (restNumbers.length > 2) {
      formattedNumber += ' ' + restNumbers.substring(2, 5);
    }
    if (restNumbers.length > 5) {
      formattedNumber += ' ' + restNumbers.substring(5, 7);
    }
    if (restNumbers.length > 7) {
      formattedNumber += ' ' + restNumbers.substring(7, 9);
    }
    
    return restNumbers.length > 9 ? phoneValue : formattedNumber;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue('phone', formatted);
  };

  const handleServiceClick = () => setIsServiceOpen(!isServiceOpen);
  const handleHowClick = () => setIsHowOpen(!isHowOpen);

  const onSubmit = (data: FormData) => {
    console.log('Отправка заявки:', data);
  };

  return (
    <section 
      className="py-20 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/bg.png)'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-orange-900/80"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-400 text-sm mb-4 tracking-wide">{t.contact.sectionLabel}</p>
          <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-gray-300 text-lg">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30">
            <h3 className="text-white text-2xl font-semibold mb-8">{t.contact.modalTitle}</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('name', { 
                      required: t.contact.validation.nameRequired,
                      validate: value => {
                        if (value.trim() === '') return t.contact.validation.nameEmpty;
                        if (/\d/.test(value)) return t.contact.validation.nameNoNumbers;
                        return true;
                      }
                    })}
                    type="text"
                    placeholder={t.contact.form.namePlaceholder}
                    className={`w-full bg-transparent border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${
                      errors.name ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder={t.contact.form.phonePlaceholder}
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    inputMode="numeric"
                    className={`w-full bg-transparent border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none ${
                      errors.phone ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  <input type="hidden" {...register('phone', { 
                    required: t.contact.validation.phoneRequired,
                    validate: value => value !== '+998 ' || t.contact.validation.phoneInvalid 
                  })} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              
              <input
                {...register('email')}
                type="email"
                placeholder={t.contact.form.emailPlaceholder}
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              />
              
              <input
                {...register('position')}
                type="text"
                placeholder={t.contact.form.positionPlaceholder}
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              />

              <div className="relative">
                <select
                  {...register('service')}
                  onMouseDown={handleServiceClick}
                  onChange={(e) => {
                    register('service').onChange(e);
                    setIsServiceOpen(false);
                  }}
                  className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-gray-400 focus:border-orange-500 focus:outline-none cursor-pointer appearance-none pr-12"
                >
                  <option value="" className="bg-gray-800">{t.contact.form.servicePlaceholder}</option>
                  {t.contact.form.services.map(service => (
                    <option key={service.value} value={service.value} className="bg-gray-800">{service.label}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg 
                    className={`w-6 h-6 transition-all duration-200 ${
                      isServiceOpen ? 'text-white rotate-90' : 'text-orange-500 rotate-0'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  {...register('how')}
                  onMouseDown={handleHowClick}
                  onChange={(e) => {
                    register('how').onChange(e);
                    setIsHowOpen(false);
                  }}
                  className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-gray-400 focus:border-orange-500 focus:outline-none cursor-pointer appearance-none pr-12"
                >
                  <option value="" className="bg-gray-800">{t.contact.form.howPlaceholder}</option>
                  {t.contact.form.howOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-gray-800">{option.label}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg 
                    className={`w-6 h-6 transition-all duration-200 ${
                      isHowOpen ? 'text-white rotate-90' : 'text-orange-500 rotate-0'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div className={`flex items-center gap-3 ${
                errors.agreedToTerms ? 'animate-pulse' : ''
              }`}>
                <div className="relative">
                  <input
                    {...register('agreedToTerms', { 
                      required: t.contact.validation.agreementRequired 
                    })}
                    type="checkbox"
                    id="terms"
                    className="sr-only"
                  />
                  <label
                    htmlFor="terms"
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                      agreedToTerms 
                        ? 'bg-orange-500 border-orange-500' 
                        : errors.agreedToTerms
                        ? 'bg-transparent border-red-500 hover:border-red-400'
                        : 'bg-transparent border-gray-600 hover:border-orange-500'
                    }`}
                  >
                    {agreedToTerms && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </label>
                </div>
                <label htmlFor="terms" className={`text-sm cursor-pointer ${
                  errors.agreedToTerms ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {t.contact.form.agreementText}
                </label>
              </div>
              {errors.agreedToTerms && <p className="text-red-400 text-xs">{errors.agreedToTerms.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer ${
                  isSubmitting 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {isSubmitting ? t.common.submitLoading : t.buttons.submitApplication}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Footer - в отдельном контейнере */}
      <div className="relative z-10">
        <Footer />
      </div>
    </section>
  );
}
