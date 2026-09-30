'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { chatLauncherCopy } from '@/components/marketing/chat-launcher-copy';
import type { SiteLocale } from '@/lib/marketing/i18n';

const loadChatWidget = () => import('@/components/marketing/ChatWidgetPanel').then((module) => ({ default: module.ChatWidgetPanel }));
const LazyChatWidget = lazy(loadChatWidget);

export function ChatWidget({ locale = 'en' }: { locale?: SiteLocale }) {
  const [loaded, setLoaded] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const copy = chatLauncherCopy[locale];

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.04 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`chat-widget-slot${footerVisible ? ' is-footer-visible' : ''}`}>
      {!loaded ? (
      <button
        className="chat-launcher"
        type="button"
        aria-label={copy.name}
        onClick={() => setLoaded(true)}
        onPointerEnter={() => void loadChatWidget()}
        onFocus={() => void loadChatWidget()}
      >
        <span className="chat-presence" aria-hidden="true" />
        <MessageCircle aria-hidden="true" />
        <span>{copy.visible}</span>
      </button>
      ) : (
        <Suspense fallback={<button className="chat-launcher" type="button" aria-label={copy.loadingName}><MessageCircle aria-hidden="true" /><span>{copy.visible}</span></button>}>
          <LazyChatWidget locale={locale} />
        </Suspense>
      )}
    </div>
  );
}
