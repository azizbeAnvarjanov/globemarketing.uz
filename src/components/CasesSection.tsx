"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "@/contexts/LanguageContext";

export default function CasesSection() {
  const [showAllCases, setShowAllCases] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations();

  const handleToggleCases = () => {
    if (showAllCases) {
      // Если скрываем кейсы, прокручиваем к началу секции
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setShowAllCases(!showAllCases);
  };

  const allCases = t.cases.projects.map((project, index) => ({
    id: index + 1,
    image: `/case_${(index % 4) + 1}.jpg`,
    name: project.name,
    houses: project.houses,
    sold: project.sold,
    period: project.period,
  }));

  // Показываем все кейсы или первые 2
  const casesToShow = showAllCases ? allCases : allCases.slice(0, 2);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-400 text-sm mb-4 tracking-wide">
            {t.cases.sectionLabel}
          </p>
          <h2 className="text-white text-3xl lg:text-5xl font-light leading-tight mb-4">
            {t.cases.title}
          </h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto">
            {t.cases.subtitle}
          </p>
        </div>

        {/* Cases Grid */}
        <div className="flex flex-wrap gap-6">
          {casesToShow.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer transform transition-all duration-500 md:h-[400px] w-[600px] h-[250px] mb-3 ${
                index >= 4 && showAllCases ? "animate-fade-in" : ""
              }`}
              style={{
                aspectRatio: "755 / 419",
                animationDelay: index >= 4 ? `${(index - 4) * 100}ms` : "0ms",
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${caseItem.image})` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/60 transition-colors duration-300"></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-bold mb-3">
                  {caseItem.name}
                </h3>
                <div className="space-y-1 mb-4">
                  <p className="text-gray-200 text-sm">{caseItem.houses}</p>
                  <p className="text-orange-Globe text-sm font-semibold">
                    {caseItem.sold}
                  </p>
                  <p className="text-gray-300 text-xs">{caseItem.period}</p>
                </div>
                <Link
                  href={`/case/${caseItem.id}`}
                  className="bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-full text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer inline-block w-fit"
                >
                  {t.buttons.viewCase}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button
            onClick={handleToggleCases}
            className="bg-orange-Globe hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            {showAllCases ? t.buttons.hideCases : t.buttons.moreCases}
          </button>
        </div>
      </div>
    </section>
  );
}
