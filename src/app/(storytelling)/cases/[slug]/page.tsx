import { notFound } from 'next/navigation';
import { NOOMO_CASES, NOOMO_CASE_SLUGS } from '@/components/noomo/cases/cases-data';
import { NoomoCaseView } from '@/components/noomo/cases/NoomoCaseView';

export function generateStaticParams() {
  return NOOMO_CASE_SLUGS.map((slug) => ({ slug }));
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = NOOMO_CASES[slug];
  if (!data) {
    notFound();
  }
  return <NoomoCaseView data={data} />;
}
