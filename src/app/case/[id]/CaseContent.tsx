'use client';

import { useTranslations } from "@/contexts/LanguageContext";
import CaseModal from "@/components/CaseModal";
import { CaseData } from "@/types/case";

export default function CaseContent({ caseId }: { caseId: number }) {
  const t = useTranslations();
  const caseData = t.all_cases.find((c: CaseData) => c.id === caseId);

  if (!caseData) {
    return null; // This will be handled by the parent's notFound()
  }

  return <CaseModal caseData={caseData} />;
}
