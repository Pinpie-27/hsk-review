import { notFound } from 'next/navigation';
import { getLevel, levels } from '@/data';
import { LevelReview } from '@/components/LevelReview';

type Props = { params: Promise<{ level: string }> };

export function generateStaticParams() {
  return levels.map((l) => ({ level: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { level: slug } = await params;
  const level = getLevel(slug);
  if (!level) return { title: 'Not found' };
  return {
    title: `${level.name} · HSK Review`,
    description: level.subtitle,
  };
}

export default async function LevelPage({ params }: Props) {
  const { level: slug } = await params;
  const level = getLevel(slug);
  if (!level) notFound();
  return <LevelReview level={level} />;
}
