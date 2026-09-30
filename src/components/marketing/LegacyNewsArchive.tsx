'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import type { LegacyPostSummary, LegacyPostTopic } from '@/lib/marketing/data/legacyPosts';
import { Input } from '@/components/marketing/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/marketing/ui/native-select';

const topicLabels: Record<LegacyPostTopic | 'all', string> = {
  all: 'All topics',
  auto: 'Vehicle Accidents',
  premises: 'Unsafe Property',
  medical: 'Medical Malpractice',
  brain: 'Brain Injuries',
  dog: 'Dog Bites',
  sexual: 'Abuse & Harassment',
  wrongful: 'Wrongful Death',
  general: 'Personal Injury & Firm News',
};

export function LegacyNewsArchive({
  posts,
  totalCount,
}: {
  posts: LegacyPostSummary[];
  totalCount: number;
}) {
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
      const response = await fetch('/data/legacy-news-index.json', {
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
    const normalizedQuery = query.trim().toLowerCase();
    return archivePosts.filter((post) => {
      const topicMatches = topic === 'all' || post.topic === topic;
      const queryMatches =
        !normalizedQuery ||
        `${post.title} ${post.excerpt} ${post.category}`
          .toLowerCase()
          .includes(normalizedQuery);
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
          <p className="eyebrow">Complete publication history</p>
          <h2 id="legacy-archive-title">Legal Article Archive</h2>
        </div>
        <p>
          Browse articles originally published by Kyle Scott Law. Older articles
          are clearly dated and preserved for reference.
        </p>
      </header>

      <div className="legacy-archive-toolbar">
        <label htmlFor="legacy-news-search">
          <span>Search articles</span>
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
              placeholder="Search by topic or title"
            />
          </span>
        </label>
        <label htmlFor="legacy-news-topic">
          <span>Filter by topic</span>
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
            'Loading archive…'
          ) : (
            <>
              <strong>
                {!archiveLoaded && !query && topic === 'all'
                  ? totalCount
                  : matches.length}
              </strong>{' '}
              {matches.length === 1 ? 'article' : 'articles'}
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
              <p>Archived firm publication.</p>
            )}
            <Link href={post.path}>
              Read article <ArrowRight aria-hidden="true" />
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
          {isLoading
            ? 'Loading articles…'
            : `Show all ${totalCount} archived articles`}
        </button>
      ) : null}
      {loadError ? (
        <p className="legacy-archive-empty" role="alert">
          The complete archive could not be loaded. Please try again.
        </p>
      ) : null}
      {matches.length === 0 ? (
        <p className="legacy-archive-empty">No articles match that search.</p>
      ) : null}
    </section>
  );
}
