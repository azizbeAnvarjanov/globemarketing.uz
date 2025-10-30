// Пример использования i18n в компонентах
// Этот файл показывает, как быстро интегрировать переводы в остальные компоненты

import { useTranslations } from '@/contexts/LanguageContext';
import Link from 'next/link';

// Пример для ServicesSection
export function ServicesSection() {
  const t = useTranslations();
  
  return (
    <section>
      <p>{t.services.sectionLabel}</p>
      <h2>{t.services.title}</h2>
      
      {/* Для данных услуг можно использовать переводы */}
      <h3>{t.services.serviceTitle}</h3>
      <p>{t.services.serviceDescription}</p>
      
      {/* Теги */}
      {t.services.tags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))}
      
      <button>{t.buttons.submitApplication}</button>
    </section>
  );
}

// Пример для CasesSection  
export function CasesSection() {
  const t = useTranslations();
  
  return (
    <section>
      <p>{t.cases.sectionLabel}</p>
      <h2>{t.cases.title}</h2>
      
      {/* Кнопки */}
      <button>{t.buttons.viewCase}</button>
      <button>{t.buttons.moreCases}</button>
    </section>
  );
}

// Пример для TeamSection
export function TeamSection() {
  const t = useTranslations();
  
  return (
    <section>
      <p>{t.team.sectionLabel}</p>
      <h2>{t.team.title}</h2>
      
      {/* Члены команды */}
      {t.team.members.map((member, index) => (
        <div key={index}>
          <h3>{member.name}</h3>
          <p>{member.position}</p>
        </div>
      ))}
    </section>
  );
}

// Пример для ContactModal/ContactSection
export function ContactForm() {
  const t = useTranslations();
  
  return (
    <form>
      <h3>{t.contact.modalTitle}</h3>
      
      {/* Поля формы */}
      <input placeholder={t.contact.form.namePlaceholder} />
      <input placeholder={t.contact.form.phonePlaceholder} />
      <input placeholder={t.contact.form.emailPlaceholder} />
      <input placeholder={t.contact.form.positionPlaceholder} />
      
      {/* Выпадающие списки */}
      <select>
        <option value="">{t.contact.form.servicePlaceholder}</option>
        {t.contact.form.services.map((service) => (
          <option key={service.value} value={service.value}>
            {service.label}
          </option>
        ))}
      </select>
      
      {/* Согласие */}
      <label>{t.contact.form.agreementText}</label>
      
      <button type="submit">{t.buttons.submitApplication}</button>
    </form>
  );
}

// Пример для Footer
export function Footer() {
  const t = useTranslations();
  
  return (
    <footer>
      <h2>{t.footer.companyName}</h2>
      
      {/* Навигация */}
      <nav>
        <Link href="/#services">{t.navigation.services}</Link>
        <Link href="/#cases">{t.navigation.cases}</Link>
        <Link href="/#team">{t.navigation.agency}</Link>
        <Link href="/#contacts">{t.navigation.contacts}</Link>
      </nav>
    </footer>
  );
}
