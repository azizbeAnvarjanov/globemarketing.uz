'use client';

import { useTranslations } from '@/contexts/LanguageContext';

export default function VideoSection() {
  const t = useTranslations();

  const handlePlayClick = () => {
    console.log('Playing showreel video');
  };

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden aspect-video">
          {/* Desert landscape background pattern */}
          <div 
            className="absolute inset-0  bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/VideoSectionBg.png)' }}
          ></div>

          {/* Showreel text - top left */}
          <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
            <div className="relative">
              <h2 className="text-5xl lg:text-7xl font-bold text-white leading-none">
                {t.video.showreel}
              </h2>
              
              <div 
                className="absolute top-0 left-0 text-5xl lg:text-7xl font-bold leading-none text-transparent"
                style={{
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.3)'
                }}
              >
                {t.video.showreel}
              </div>
            </div>
          </div>

          {/* Globe Marketing text - bottom right */}
          <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12">
            <h3 className="text-3xl lg:text-8xl font-regular text-white text-right leading-tight">
              {t.video.GlobeMarketing}
            </h3>
          </div>

          {/* Play button - bottom left */}
          <button
            onClick={handlePlayClick}
            className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 bg-white hover:bg-gray-100 transition-all duration-300 shadow-2xl group hover:scale-105 cursor-pointer flex items-center justify-center w-16 h-16 rounded-full sm:w-20 sm:h-20 lg:w-[120px] lg:h-[120px] lg:rounded-[54px]"
            aria-label="Play showreel video"
          >
            {/* Play icon - responsive triangle */}
            <div className="relative">
              {/* Mobile/Tablet triangle */}
              <div className="w-0 h-0 ml-1 lg:hidden" style={{
                borderLeft: '12px solid #ff6b35',
                borderTop: '9px solid transparent',
                borderBottom: '9px solid transparent'
              }}></div>
              
              {/* Desktop triangle */}
              <div className="w-0 h-0 ml-2 hidden lg:block" style={{
                borderLeft: '24px solid #ff6b35',
                borderTop: '18px solid transparent',
                borderBottom: '18px solid transparent'
              }}></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
