import type { ReactElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * Google Analytics on the public website (docs/website-analytics.md): off until a measurement ID is
 * set, and then loaded by one inline script that checks the host first. The component is read as the
 * element it returns: next/script renders its tag only inside a Next page.
 */

afterEach(() => {
  vi.resetModules();
  vi.doUnmock('@/lib/marketing/analytics');
  delete (window as Window & { gtag?: unknown }).gtag;
});

describe('the analytics tag', () => {
  it('renders nothing while GA_MEASUREMENT_ID is empty', async () => {
    const { GA_MEASUREMENT_ID } = await import('@/lib/marketing/analytics');
    const { SiteAnalytics } = await import('@/components/marketing/SiteAnalytics');
    if (GA_MEASUREMENT_ID) return; // The firm's ID is set: the other test covers the tag.
    expect(SiteAnalytics()).toBeNull();
  });

  it('with an ID: loads gtag.js only on kjslaw.com, configures that ID, and counts tel: taps as phone_call', async () => {
    vi.doMock('@/lib/marketing/analytics', async (importOriginal) => ({ ...(await importOriginal<object>()), GA_MEASUREMENT_ID: 'G-TESTID1234' }));
    const { SiteAnalytics } = await import('@/components/marketing/SiteAnalytics');
    const element = SiteAnalytics() as ReactElement<{ id: string; strategy: string; children: string }>;
    expect(element.props.id).toBe('site-analytics');
    expect(element.props.strategy).toBe('afterInteractive');
    const code = element.props.children;
    expect(code).toContain('if(location.hostname!=="kjslaw.com")return;');
    expect(code).toContain('gtag(\'config\',"G-TESTID1234")');
    expect(code).toContain('https://www.googletagmanager.com/gtag/js?id=');
    expect(code).toContain("gtag('event','phone_call'");
    // No consent prompt and no personal data: the script only ever sends events.
    expect(code).not.toMatch(/fullName|email|briefSummary/);
  });
});

describe('trackLead', () => {
  it('does nothing without the tag, and reports a generate_lead event with its source once the tag is there', async () => {
    const { trackLead } = await import('@/lib/marketing/analytics');
    expect(() => trackLead('form')).not.toThrow();
    const gtag = vi.fn();
    (window as Window & { gtag?: unknown }).gtag = gtag;
    trackLead('chat');
    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', { method: 'chat' });
  });
});
