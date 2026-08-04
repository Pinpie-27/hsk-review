import type { Day } from '@/data/types';

type Props = { day: Day; hideVn: boolean };

export function DayCard({ day, hideVn }: Props) {
  const hasSentences = day.sentences.length > 0;
  const hasNotes = day.notes.length > 0;

  return (
    <div className="space-y-6">
      <Section kicker="生词" title="New words" count={day.words.length}>
        <ul className="divide-y divide-rule/60">
          {day.words.map((w, i) => (
            <li key={`${w}-${i}`} className="flex items-baseline gap-5 py-4 first:pt-1 last:pb-1">
              <span className="font-display italic text-xs tabular-nums text-muted w-6 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="han-serif text-[28px] sm:text-[32px] leading-tight font-medium text-ink tracking-wide">
                {w}
              </span>
            </li>
          ))}
        </ul>
        {day.numbers.length > 0 && (
          <div className="mt-5 pt-4 border-t border-dashed border-rule flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest2 font-semibold text-muted">
              Ref
            </span>
            <div className="flex flex-wrap gap-1.5">
              {day.numbers.map((n, i) => (
                <span
                  key={`${n}-${i}`}
                  className="inline-flex items-center rounded-md bg-paper2 border border-rule/70 px-1.5 py-0.5 text-[11px] font-medium text-ink2 tabular-nums"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        )}
      </Section>

      {hasSentences && (
        <Section kicker="例句" title="Examples" count={day.sentences.length}>
          <ol className="space-y-5">
            {day.sentences.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display italic text-accent text-xl tabular-nums shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="han-serif text-[19px] sm:text-[21px] leading-[1.7] text-ink font-medium">
                  {s}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {hasNotes && !hideVn && (
        <Section kicker="语法" title="Grammar / Notes" count={day.notes.length}>
          <ul className="space-y-3">
            {day.notes.map((n, i) => (
              <li
                key={i}
                className="relative pl-5 text-[15px] leading-relaxed text-ink2"
              >
                <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {day.words.length === 0 && !hasSentences && !hasNotes && (
        <div className="card px-6 py-16 text-center text-muted">
          <div className="han-serif text-4xl text-accent/30 mb-3">空</div>
          <div className="text-sm">No content for this day yet.</div>
        </div>
      )}
    </div>
  );
}

function Section({
  kicker,
  title,
  count,
  children,
}: {
  kicker: string;
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="card px-6 py-6 sm:px-8 sm:py-7 relative overflow-hidden">
      <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-accent rounded-r-full" />
      <div className="flex items-baseline justify-between gap-3 pl-3">
        <div className="flex items-baseline gap-3">
          <span className="han-serif text-lg font-bold text-accent">{kicker}</span>
          <span className="text-[11px] uppercase tracking-widest2 font-semibold text-muted">
            {title}
          </span>
        </div>
        {typeof count === 'number' && (
          <span className="text-xs font-medium tabular-nums text-muted">{count}</span>
        )}
      </div>
      <div className="mt-4 pl-3">{children}</div>
    </section>
  );
}
