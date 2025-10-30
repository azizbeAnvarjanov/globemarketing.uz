'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { useTranslations } from '@/contexts/LanguageContext';
import Image from 'next/image';

export default function TeamSection() {
  const [currentSlide, setCurrentSlide] = useState(0); // Начинаем с 0 для 3 элементов
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations();

  const teamMembers = [
    {
      id: 1,
      name: t.team.members[0].name,
      position: t.team.members[0].position,
      image: "/Slide_1.jpg"
    },
    {
      id: 2,
      name: t.team.members[1].name,
      position: t.team.members[1].position,
      image: "/Slide_2.jpg"
    },
    {
      id: 3,
      name: t.team.members[2].name,
      position: t.team.members[2].position,
      image: "/Slide_3.jpg"
    },
    {
      id: 4,
      name: t.team.members[3].name,
      position: t.team.members[3].position,
      image: "/Slide_4.JPG"
    },
    {
      id: 5,
      name: t.team.members[4].name,
      position: t.team.members[4].position,
      image: "/Slide_5.PNG"
    },
    {
      id: 6,
      name: t.team.members[5].name,
      position: t.team.members[5].position,
      image: "/Slide_6.PNG"
    },
    {
      id: 7,
      name: t.team.members[6].name,
      position: t.team.members[6].position,
      image: "/Slide_7.PNG"
    },
    {
      id: 8,
      name: t.team.members[7].name,
      position: t.team.members[7].position,
      image: "/Slide_8.png"
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % teamMembers.length;
      console.log(`Next slide: ${prev} -> ${next}, total: ${teamMembers.length}`);
      return next;
    });
  }, [teamMembers.length]);

  const updateSlidePositions = useCallback(() => {
    if (!containerRef.current) return;

    slidesRef.current.forEach((slide, index) => {
      if (!slide) return;

      const isCenter = index === currentSlide;
      const isPrev = index === (currentSlide - 1 + teamMembers.length) % teamMembers.length;
      const isNext = index === (currentSlide + 1) % teamMembers.length;
      
      // Для 3 элементов всегда показываем все карточки
      const scale = isCenter ? 1 : 0.8;
      const opacity = isCenter ? 1 : 0.7;
      let xPosition = 0;
      
      if (isCenter) {
        xPosition = 0;
      } else if (isPrev) {
        xPosition = -330; // Уменьшаем отступ до ~50px между краями карточек
      } else if (isNext) {
        xPosition = 330; // Уменьшаем отступ до ~50px между краями карточек
      }

      gsap.to(slide, {
        scale: scale,
        opacity: opacity,
        x: xPosition,
        zIndex: isCenter ? 20 : 10,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }, [currentSlide, teamMembers.length]);

  // Auto-rotation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging, teamMembers.length, nextSlide]);

  // Анимация переходов с GSAP
  useEffect(() => {
    updateSlidePositions();
  }, [currentSlide, updateSlidePositions]);

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const previous = (prev - 1 + teamMembers.length) % teamMembers.length;
      console.log(`Prev slide: ${prev} -> ${previous}, total: ${teamMembers.length}`);
      return previous;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
    
    // Анимация при перетаскивании
    if (containerRef.current) {
      gsap.set(containerRef.current, { x: diff * 0.1 });
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    // Возвращаем контейнер на место
    if (containerRef.current) {
      gsap.to(containerRef.current, { x: 0, duration: 0.3 });
    }
    
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
    
    if (containerRef.current) {
      gsap.set(containerRef.current, { x: diff * 0.1 });
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
    
    if (containerRef.current) {
      gsap.to(containerRef.current, { x: 0, duration: 0.3 });
    }
    
    setDragOffset(0);
  };

  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-white-400 text-sm mb-4 tracking-wide">{t.team.sectionLabel}</p>
          <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight mb-6">
            {t.team.title}
          </h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            {t.team.subtitle}
          </p>
        </div>

        {/* Team Slider */}
        <div className="relative overflow-hidden">
          <div 
            ref={containerRef}
            className="flex items-center justify-center cursor-grab select-none relative"
            style={{ height: '500px' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {teamMembers.map((member, index) => {
              const isCenter = index === currentSlide;
              
              return (
                <div
                  key={member.id}
                  ref={(el) => { slidesRef.current[index] = el; }}
                  className="absolute flex-shrink-0"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div
                    className={`relative rounded-3xl overflow-hidden ${
                      isCenter ? '' : 'w-72 h-72'
                    }`}
                    style={isCenter ? { width: '350px', height: '420px' } : {}}
                  >
                    <Image 
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <div className={`absolute ${isCenter ? 'bottom-6 left-6 right-6' : 'bottom-4 left-4 right-4'}`}>
                      <h3 className={`text-white font-bold mb-1 ${
                        isCenter ? 'text-2xl lg:text-3xl mb-2' : 'text-lg'
                      }`}>
                        {member.name}
                      </h3>
                      <p className={`text-gray-300 ${
                        isCenter ? 'text-base lg:text-lg' : 'text-sm'
                      }`}>
                        {member.position}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
