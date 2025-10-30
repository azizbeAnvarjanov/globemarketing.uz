﻿﻿﻿﻿'use client';

import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import Image from 'next/image';

interface CaseData {
  id: number;
  image: string;
  youtubeUrl?: string;
  title: string;
  problem: string;
  insight: string;
  solution: string;
  result: string;
}

interface CaseModalProps {
  caseData: CaseData;
}

export default function CaseModal({ caseData }: CaseModalProps) {
  return (
    <>
      {/* Header - всегда видимый */}
      <Header />
      
      <div 
        className='min-h-screen bg-cover bg-center bg-no-repeat relative'
        style={{
          backgroundImage: 'url(/bg.png)'
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-orange-900/80"></div>
    
        
        <div className='relative z-10 pt-32 pb-20'>
          <div className='max-w-6xl mx-auto px-4'>
            {/* Main content */}
                    {/* Back button - позиция согласно спецификации */}
        <Link
          href="/"
          className='relative  w-16 h-16 flex items-center justify-left text-white hover:text-gray-300 transition-colors duration-200 z-[9999]'
        >
          <svg className='w-10 h-10' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </Link>
            <div className='text-white'>
              
              {/* YouTube Video or Image */}
              <div className='mb-12'>
                {caseData.youtubeUrl ? (
                  <div className='relative w-full' style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      src={caseData.youtubeUrl}
                      title={`Case ${caseData.id} Video`}
                      className='absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <Image 
                    src={caseData.image} 
                    alt={`Case ${caseData.id}`}
                    width={1152}
                    height={384}
                    className='w-full h-96 object-cover rounded-2xl shadow-2xl'
                  />
                )}
              </div>
              {/* Title */}
              <h1 className='text-3xl lg:text-4xl font-light mb-8 leading-relaxed'>
                {caseData.title}
              </h1>
              
              

              {/* Content sections - согласно спецификации UI блоков */}
              <div className='space-y-12'>
                {/* Problem */}
                <div>
                  <h2 className='text-white text-4xl font-semibold mb-6'>Проблема</h2>
                  <p className='text-gray-300 text-3xl leading-relaxed'>
                    {caseData.problem}
                  </p>
                </div>

                {/* Insight */}
                <div>
                  <h2 className='text-white text-4xl font-semibold mb-6'>Инсайт</h2>
                  <p className='text-gray-300 text-3xl leading-relaxed'>
                    {caseData.insight}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h2 className='text-white text-4xl font-semibold mb-6'>Решение</h2>
                  <p className='text-gray-300 text-3xl leading-relaxed'>
                    {caseData.solution}
                  </p>
                </div>

                {/* Result */}
                <div>
                  <h2 className='text-white text-4xl font-semibold mb-6'>Результат</h2>
                  <p className='text-gray-300 text-3xl leading-relaxed'>
                    {caseData.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer - в самом низу согласно спецификации */}
        <div className='relative z-10'>
          <Footer />
        </div>
      </div>
    </>
  );
}
