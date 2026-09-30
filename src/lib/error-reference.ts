/**
 * The short reference an error page shows: at most 12 letters and digits of
 * Next's error digest, enough to find the matching server log line and
 * nothing more. Error messages and stacks are never shown.
 */
export function shortErrorReference(digest: string | undefined | null): string | null {
  const value = digest?.trim().replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
  return value ? value : null;
}
