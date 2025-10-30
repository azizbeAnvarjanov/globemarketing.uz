import { notFound } from "next/navigation";
import CaseContent from "./CaseContent";

interface CasePageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ];
}

export default function CasePage({ params }: CasePageProps) {
  const caseId = parseInt(params.id);
  
  if (isNaN(caseId)) {
    notFound();
  }
  
  return <CaseContent caseId={caseId} />;
}
