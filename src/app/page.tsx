import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import CasesSection from '@/components/CasesSection';
import TeamSection from '@/components/TeamSection';
import ComparisonSection from '@/components/ComparisonSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="cases">
        <CasesSection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <ComparisonSection />
      <div id="faq">
        <FAQSection />
      </div>
      <div id="contacts">
        <ContactSection />
      </div>
    </div>
  );
}
