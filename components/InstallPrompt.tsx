'use client';

import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const DISMISS_KEY = 'hsk-review:installDismissed';

export function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ua = navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua);
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsIOS(iOS);
    setIsStandalone(standalone);

    try {
      if (localStorage.getItem(DISMISS_KEY)) setDismissed(true);
    } catch {}

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstallEvent(null));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!mounted || isStandalone || dismissed) return null;
  if (!isIOS && !installEvent) return null;

  const handleInstall = async () => {
    if (installEvent) {
      await installEvent.prompt();
      const res = await installEvent.userChoice;
      if (res.outcome === 'accepted') setInstallEvent(null);
    } else if (isIOS) {
      setShowIOSHint(true);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
  };

  return (
    <>
      <div className="card mt-8 p-4 sm:p-5 flex items-center gap-4">
        <div className="grid place-items-center h-11 w-11 rounded-xl bg-accent text-paper han-serif font-black text-2xl shrink-0">
          汉
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-ink">Install this app</div>
          <div className="text-xs text-muted mt-0.5">
            Add to your home screen for offline access — study anywhere.
          </div>
        </div>
        <button
          onClick={handleInstall}
          className="rounded-full bg-ink text-white text-sm font-medium px-4 py-2 hover:bg-black transition shrink-0"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="grid place-items-center h-7 w-7 rounded-full text-muted hover:text-ink hover:bg-paper2 transition shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {showIOSHint && <IOSHint onClose={() => setShowIOSHint(false)} />}
    </>
  );
}

function IOSHint({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full sm:max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="grid place-items-center h-10 w-10 rounded-xl bg-accent text-paper han-serif font-black text-xl">
            汉
          </div>
          <div>
            <div className="font-semibold text-lg text-ink">Install on iPhone</div>
            <div className="text-xs text-muted">Add HSK Review to your home screen</div>
          </div>
        </div>

        <ol className="mt-6 space-y-4 text-sm text-ink2">
          <li className="flex gap-3">
            <span className="grid place-items-center h-6 w-6 rounded-full bg-accent text-white text-xs font-bold tabular-nums shrink-0">
              1
            </span>
            <span>
              Tap the <strong className="text-ink">Share</strong> icon at the bottom of Safari
              <span className="inline-block ml-1 align-text-bottom">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="grid place-items-center h-6 w-6 rounded-full bg-accent text-white text-xs font-bold tabular-nums shrink-0">
              2
            </span>
            <span>
              Scroll and tap <strong className="text-ink">Add to Home Screen</strong>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="grid place-items-center h-6 w-6 rounded-full bg-accent text-white text-xs font-bold tabular-nums shrink-0">
              3
            </span>
            <span>
              Tap <strong className="text-ink">Add</strong> in the top right corner
            </span>
          </li>
        </ol>

        <div className="mt-6 rounded-2xl bg-paper2 px-4 py-3 text-xs text-muted">
          Must be opened in <strong className="text-ink">Safari</strong>. Chrome or in-app browsers can&apos;t install PWAs on iOS.
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-ink text-white py-3 text-sm font-medium hover:bg-black transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
