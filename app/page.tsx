import Link from 'next/link';
import { levels } from '@/data';
import { InstallPrompt } from '@/components/InstallPrompt';

const upcoming = [
  { slug: 'hsk1', name: 'HSK 1', han: '一' },
  { slug: 'hsk3', name: 'HSK 3', han: '三' },
  { slug: 'hsk4', name: 'HSK 4', han: '四' },
  { slug: 'hsk5', name: 'HSK 5', han: '五' },
  { slug: 'hsk6', name: 'HSK 6', han: '六' },
];

const levelHan: Record<string, string> = {
  hsk1: '一',
  hsk2: '二',
  hsk3: '三',
  hsk4: '四',
  hsk5: '五',
  hsk6: '六',
};

export default function Home() {
  const activeSlugs = new Set(levels.map((l) => l.slug));

  return (
    <main className="relative mx-auto max-w-3xl px-6 pt-14 pb-24 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 -top-8 select-none han-serif text-[240px] leading-none font-black text-accent/[0.06] sm:text-[320px]"
      >
        汉
      </div>

      <header className="relative">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest2 text-accent">
          <span className="seal h-6 w-6 text-[13px]">汉</span>
          <span>Chinese Study Notebook</span>
        </div>
        <h1 className="mt-6 font-display font-semibold text-5xl sm:text-7xl leading-[1.02] tracking-tight text-ink">
          HSK <span className="italic text-accent">Review</span>
        </h1>
        <p className="mt-5 max-w-lg text-ink2 leading-relaxed">
          Review Chinese vocabulary and example sentences day by day. Open it on your phone anywhere — like flipping through a small notebook.
        </p>
        <InstallPrompt />
      </header>

      <div className="rule mt-14" />

      <section className="mt-10">
        <SectionHeading kicker="第一部分" title="Currently studying" />
        <div className="mt-5 space-y-3">
          {levels.map((level) => (
            <Link
              key={level.slug}
              href={`/${level.slug}`}
              className="group card block px-6 py-6 sm:px-8 sm:py-7 transition hover:-translate-y-0.5 hover:border-accent/40 active:translate-y-0"
            >
              <div className="flex items-center gap-6">
                <div className="grid place-items-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-paper2 border border-rule">
                  <span className="han-serif text-4xl sm:text-5xl font-bold text-accent">
                    {levelHan[level.slug] ?? '汉'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold uppercase tracking-widest2 text-accent">
                    Current
                  </div>
                  <div className="mt-0.5 font-display text-2xl sm:text-3xl font-semibold text-ink">
                    {level.name}
                  </div>
                  {level.subtitle && (
                    <div className="mt-1 text-sm text-muted">{level.subtitle}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl sm:text-4xl font-semibold tabular-nums text-ink">
                    {level.days.length}
                  </div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-widest text-muted">
                    days
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-muted">
                  {level.days.reduce((n, d) => n + d.words.length, 0)} words ·{' '}
                  {level.days.reduce((n, d) => n + d.sentences.length, 0)} example sentences
                </span>
                <span className="font-medium text-accent group-hover:translate-x-1 transition inline-flex items-center gap-1">
                  Start
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading kicker="第二部分" title="Coming soon" />
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {upcoming
            .filter((u) => !activeSlugs.has(u.slug))
            .map((u) => (
              <div
                key={u.slug}
                className="card px-4 py-5 text-center opacity-60 select-none"
              >
                <div className="han-serif text-3xl font-bold text-ink2">{u.han}</div>
                <div className="mt-2 text-sm font-medium text-ink2">{u.name}</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted">Soon</div>
              </div>
            ))}
        </div>
      </section>

      <footer className="mt-20 flex items-center justify-between text-xs text-muted">
        <span className="han-serif text-base text-ink2">加油！</span>
        <span>Learn a little every day.</span>
      </footer>
    </main>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="han-serif text-sm text-accent">{kicker}</span>
      <span className="h-px flex-1 bg-rule" />
      <span className="text-[11px] uppercase tracking-widest2 font-semibold text-muted">
        {title}
      </span>
    </div>
  );
}
