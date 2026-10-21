'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import type { LegacyPostSummary, LegacyPostTopic } from '@/lib/marketing/data/legacyPosts';
import type { SiteLocale } from '@/lib/marketing/i18n';
import { Input } from '@/components/marketing/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/marketing/ui/native-select';

const copy = {
  en: {
    topics: {
      all: 'All topics',
      auto: 'Vehicle Accidents',
      premises: 'Unsafe Property',
      medical: 'Medical Malpractice',
      brain: 'Brain Injuries',
      dog: 'Dog Bites',
      sexual: 'Abuse & Harassment',
      wrongful: 'Wrongful Death',
      general: 'Personal Injury & Firm News',
    },
    index: '/data/legacy-news-index.json',
    eyebrow: 'Complete publication history',
    title: 'Legal Article Archive',
    intro: 'Browse articles originally published by Kyle Scott Law. Older articles are clearly dated and preserved for reference.',
    search: 'Search articles',
    searchPlaceholder: 'Search by topic or title',
    filter: 'Filter by topic',
    loading: 'Loading archive…',
    article: 'article',
    articles: 'articles',
    archived: 'Archived firm publication.',
    read: 'Read article',
    loadingArticles: 'Loading articles…',
    showAll: (count: number) => `Show all ${count} archived articles`,
    loadError: 'The complete archive could not be loaded. Please try again.',
    noMatches: 'No articles match that search.',
  },
  es: {
    topics: {
      all: 'Todos los temas',
      auto: 'Accidentes de vehículos',
      premises: 'Propiedades peligrosas',
      medical: 'Negligencia médica',
      brain: 'Lesiones cerebrales',
      dog: 'Mordeduras de perro',
      sexual: 'Abuso y acoso',
      wrongful: 'Muerte injusta',
      general: 'Lesiones personales y noticias del despacho',
    },
    index: '/data/legacy-news-index-es.json',
    eyebrow: 'Historial completo de publicaciones',
    title: 'Archivo de artículos legales',
    intro: 'Consulte los artículos que Kyle Scott Law publicó originalmente. Los artículos anteriores llevan su fecha y se conservan como referencia.',
    search: 'Buscar artículos',
    searchPlaceholder: 'Buscar por tema o título',
    filter: 'Filtrar por tema',
    loading: 'Cargando el archivo…',
    article: 'artículo',
    articles: 'artículos',
    archived: 'Publicación archivada del despacho.',
    read: 'Leer el artículo',
    loadingArticles: 'Cargando artículos…',
    showAll: (count: number) => `Ver los ${count} artículos archivados`,
    loadError: 'No se pudo cargar el archivo completo. Inténtelo de nuevo.',
    noMatches: 'Ningún artículo coincide con esa búsqueda.',
  },
} satisfies Record<SiteLocale, { topics: Record<LegacyPostTopic | 'all', string> } & Record<string, unknown>>;

/** Lowercase, without accents, so "lesion" finds "lesión". */
const searchable = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function LegacyNewsArchive({
  posts,
  totalCount,
  locale = 'en',
}: {
  posts: LegacyPostSummary[];
  totalCount: number;
  locale?: SiteLocale;
}) {
  const text = copy[locale];
  const topicLabels = text.topics;
  const [archivePosts, setArchivePosts] = useState(posts);
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<LegacyPostTopic | 'all'>('all');
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const archiveLoaded = archivePosts.length >= totalCount;

  async function loadCompleteArchive() {
    if (archiveLoaded || isLoading) return;
    setIsLoading(true);
    setLoadError(false);
    try {
      const response = await fetch(text.index, {
        cache: 'force-cache',
      });
      if (!response.ok) throw new Error('Unable to load article archive');
      const completeArchive = (await response.json()) as LegacyPostSummary[];
      setArchivePosts(completeArchive);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const matches = useMemo(() => {
    const normalizedQuery = searchable(query.trim());
    return archivePosts.filter((post) => {
      const topicMatches = topic === 'all' || post.topic === topic;
      const queryMatches =
        !normalizedQuery ||
        searchable(`${post.title} ${post.excerpt} ${post.category}`).includes(normalizedQuery);
      return topicMatches && queryMatches;
    });
  }, [archivePosts, query, topic]);
  const visibleMatches =
    showAll || query || topic !== 'all' ? matches : matches.slice(0, 24);

  return (
    <section
      className="legacy-archive"
      id="article-archive"
      aria-labelledby="legacy-archive-title"
    >
      <header className="legacy-archive-heading">
        <div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h2 id="legacy-archive-title">{text.title}</h2>
        </div>
        <p>{text.intro}</p>
      </header>

      <div className="legacy-archive-toolbar">
        <label htmlFor="legacy-news-search">
          <span>{text.search}</span>
          <span className="legacy-search-field">
            <Search aria-hidden="true" />
            <Input
              id="legacy-news-search"
              type="search"
              value={query}
              onFocus={() => void loadCompleteArchive()}
              onChange={(event) => {
                setQuery(event.target.value);
                setShowAll(true);
                void loadCompleteArchive();
              }}
              placeholder={text.searchPlaceholder}
            />
          </span>
        </label>
        <label htmlFor="legacy-news-topic">
          <span>{text.filter}</span>
          <NativeSelect
            id="legacy-news-topic"
            value={topic}
            onChange={(event) => {
              setTopic(event.target.value as LegacyPostTopic | 'all');
              setShowAll(true);
              void loadCompleteArchive();
            }}
          >
            {Object.entries(topicLabels).map(([value, label]) => (
              <NativeSelectOption value={value} key={value}>
                {label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </label>
        <output>
          {isLoading ? (
            text.loading
          ) : (
            <>
              <strong>
                {!archiveLoaded && !query && topic === 'all'
                  ? totalCount
                  : matches.length}
              </strong>{' '}
              {matches.length === 1 ? text.article : text.articles}
            </>
          )}
        </output>
      </div>

      <div className="legacy-archive-grid">
        {visibleMatches.map((post) => (
          <article className="legacy-archive-card" key={post.path}>
            <div>
              <span>{topicLabels[post.topic]}</span>
              <time dateTime={post.dateTime}>{post.date}</time>
            </div>
            <h3>
              <Link href={post.path}>{post.title}</Link>
            </h3>
            {post.excerpt ? (
              <p>{post.excerpt}</p>
            ) : (
              <p>{text.archived}</p>
            )}
            <Link href={post.path}>
              {text.read} <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>

      {!showAll && !query && topic === 'all' && totalCount > 24 ? (
        <button
          className="legacy-show-all"
          type="button"
          disabled={isLoading}
          onClick={async () => {
            await loadCompleteArchive();
            setShowAll(true);
          }}
        >
          {isLoading ? text.loadingArticles : text.showAll(totalCount)}
        </button>
      ) : null}
      {loadError ? (
        <p className="legacy-archive-empty" role="alert">
          {text.loadError}
        </p>
      ) : null}
      {matches.length === 0 ? (
        <p className="legacy-archive-empty">{text.noMatches}</p>
      ) : null}
    </section>
  );
}
