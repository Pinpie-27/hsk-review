'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Level } from '@/data/types';
import { DayCard } from './DayCard';

type Props = { level: Level };

const STORAGE_KEY_HIDE = 'hsk-review:hideVn';
const STORAGE_KEY_DAY = (slug: string) => `hsk-review:${slug}:day`;

const dayHan = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
function toHanNumber(n: number): string {
  if (n <= 10) return dayHan[n];
  if (n < 20) return '十' + dayHan[n - 10];
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return dayHan[tens] + '十' + (ones ? dayHan[ones] : '');
  }
  return String(n);
}

export function LevelReview({ level }: Props) {
  const [dayIdx, setDayIdx] = useState(0);
  const [hideVn, setHideVn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activePillRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const savedDay = localStorage.getItem(STORAGE_KEY_DAY(level.slug));
      if (savedDay) {
        const n = parseInt(savedDay, 10);
        if (!Number.isNaN(n) && n >= 0 && n < level.days.length) setDayIdx(n);
      }
      const savedHide = localStorage.getItem(STORAGE_KEY_HIDE);
      if (savedHide === '1') setHideVn(true);
    } catch {}
  }, [level.slug, level.days.length]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY_DAY(level.slug), String(dayIdx));
    } catch {}
  }, [dayIdx, level.slug, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY_HIDE, hideVn ? '1' : '0');
    } catch {}
  }, [hideVn, mounted]);

  useEffect(() => {
    activePillRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [dayIdx]);

  const day = useMemo(() => level.days[dayIdx], [level, dayIdx]);
  const canPrev = dayIdx > 0;
  const canNext = dayIdx < level.days.length - 1;
  const progress = ((dayIdx + 1) / level.days.length) * 100;

  return (
    <>
      <div className="sticky top-0 z-20 backdrop-blur-md bg-paper/80 border-b border-rule/60">
        <div className="mx-auto max-w-3xl px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink2 hover:text-accent transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium">Home</span>
          </Link>
          <div className="text-[11px] font-semibold uppercase tracking-widest2 text-accent">
            {level.name}
          </div>
          <button
            onClick={() => setHideVn((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              hideVn
                ? 'bg-ink border-ink text-white'
                : 'bg-white border-rule text-ink2 hover:border-accent/50'
            }`}
          >
            <span className="han-serif text-sm">中</span>
            <span className="hidden sm:inline">{hideVn ? 'Chinese only' : 'Hide Vietnamese'}</span>
          </button>
        </div>
        <div
          className="h-[2px] bg-accent/80 transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="relative mx-auto max-w-3xl px-6 pt-10 pb-32">
        <header className="relative">
          <div className="flex items-baseline gap-5">
            <h1 className="han-serif font-black text-4xl sm:text-5xl leading-none text-ink tracking-wide">
              第<span className="text-accent">{toHanNumber(day.day)}</span>天
            </h1>
            <span className="h-px flex-1 bg-rule" />
            <span className="font-display italic tabular-nums text-lg sm:text-xl text-muted whitespace-nowrap">
              Day {String(day.day).padStart(2, '0')}
            </span>
          </div>

          <div
            aria-hidden
            className="absolute -right-6 -top-14 han-serif text-[140px] sm:text-[180px] leading-none font-black text-accent/[0.06] select-none pointer-events-none -z-10"
          >
            {toHanNumber(day.day)}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
            <span>{day.words.length} new words</span>
            {day.sentences.length > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-rule" />
                <span>{day.sentences.length} example sentences</span>
              </>
            )}
            {day.notes.length > 0 && !hideVn && (
              <>
                <span className="h-1 w-1 rounded-full bg-rule" />
                <span>{day.notes.length} notes</span>
              </>
            )}
          </div>
        </header>

        <nav className="no-scrollbar mt-8 -mx-6 px-6 flex gap-2 overflow-x-auto scroll-smooth">
          {level.days.map((d, i) => {
            const active = i === dayIdx;
            return (
              <button
                key={d.day}
                ref={active ? activePillRef : null}
                onClick={() => setDayIdx(i)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition border tabular-nums ${
                  active
                    ? 'bg-ink text-white border-ink shadow-[0_6px_16px_-6px_rgba(20,24,32,0.45)]'
                    : 'bg-white text-ink2 border-rule hover:border-ink/40 hover:text-ink'
                }`}
              >
                Day <span className={active ? 'opacity-70' : 'opacity-50'}>{d.day}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8">
          <DayCard day={day} hideVn={hideVn} />
        </div>

        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center rounded-full bg-white border border-rule shadow-[0_10px_40px_-8px_rgba(20,24,32,0.2)] p-1.5">
            <button
              onClick={() => canPrev && setDayIdx((i) => i - 1)}
              disabled={!canPrev}
              aria-label="Previous day"
              className="grid place-items-center w-10 h-10 rounded-full text-ink2 hover:bg-paper2 disabled:opacity-25 disabled:cursor-not-allowed transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="px-4 text-sm font-semibold tabular-nums text-ink">
              {dayIdx + 1}
              <span className="text-muted"> / {level.days.length}</span>
            </div>
            <button
              onClick={() => canNext && setDayIdx((i) => i + 1)}
              disabled={!canNext}
              aria-label="Next day"
              className="grid place-items-center w-10 h-10 rounded-full text-ink2 hover:bg-paper2 disabled:opacity-25 disabled:cursor-not-allowed transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
