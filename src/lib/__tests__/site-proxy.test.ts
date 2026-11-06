// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { siteProxy, trailingSlashRedirect } from "@/lib/site-proxy";

/** What the proxy answers for a path on the production host. */
function visit(path: string) {
  const response = siteProxy(new NextRequest(`https://kjslaw.com${path}`));
  return { response, location: response.headers.get("location") };
}

describe("trailing slashes (next.config.ts sets skipTrailingSlashRedirect; the proxy normalizes in one hop)", () => {
  it("answers a slashed page with one 308 to the same URL without the slash, keeping the query", () => {
    const cases: Array<[string, string]> = [
      ["/contact/", "https://kjslaw.com/contact"],
      ["/contact/?utm_source=fictional", "https://kjslaw.com/contact?utm_source=fictional"],
      ["/es/contacto/", "https://kjslaw.com/es/contacto"],
      ["/news/fictional-post/", "https://kjslaw.com/news/fictional-post"],
      ["/fictional-unknown-page//", "https://kjslaw.com/fictional-unknown-page"],
    ];
    for (const [path, expected] of cases) {
      const { response, location } = visit(path);
      expect(response.status, path).toBe(308);
      expect(location, path).toBe(expected);
    }
  });

  it("serves the API, Next's assets, /.well-known, and file names exactly as requested, slash or not", () => {
    for (const path of ["/api/consultation/", "/robots.txt/", "/llms.txt/", "/_next/static/chunks/fictional.js/", "/.well-known/security.txt/"]) {
      const { response, location } = visit(path);
      expect(response.status, path).toBe(200);
      expect(location, path).toBeNull();
      expect(trailingSlashRedirect(`https://kjslaw.com${path}`), path).toBeNull();
    }
  });

  it("leaves the home page and unslashed pages alone", () => {
    for (const path of ["/", "/contact", "/es", "/news/fictional-post?utm_source=fictional"]) {
      expect(visit(path).response.status, path).toBe(200);
    }
  });
});

describe("gone WordPress paths", () => {
  it("answer 410 directly, slash or not (never a 308 first), with a page that names the firm's real number", async () => {
    for (const path of ["/sample-page", "/sample-page/", "/wp-admin/", "/wp-admin/install.php", "/wp-login.php", "/wp-login.php/", "/xmlrpc.php/", "/wp-content/uploads/fictional.jpg", "/wp-json/wp/v2/posts"]) {
      const { response } = visit(path);
      expect(response.status, path).toBe(410);
      expect(response.headers.get("location"), path).toBeNull();
    }
    const html = await visit("/wp-admin/").response.text();
    expect(html).toContain('<meta name="robots" content="noindex">');
    expect(html).toContain("714-544-1460");
  });

  it("answer 410 for the Riverside verdict's posts the firm withdrew (2026-10-01), at their old and new addresses", () => {
    for (const path of [
      "/2024/12/26/kyle-scott-wins-jury-verdict-in-riverside-superior-court/",
      "/2021/08/12/kyle-scott-law-delivers-justice-475000-slip-fall-settlement/",
      "/news/riverside-jury-verdict-2-3-million",
      "/es/noticias/veredicto-jurado-riverside-2-3-millones/",
      "/news/kyle-scott-law-delivers-justice-475000-slip-fall-settlement",
    ]) {
      const { response } = visit(path);
      expect(response.status, path).toBe(410);
      expect(response.headers.get("location"), path).toBeNull();
    }
  });

  it("answer 410 for every medical malpractice page the firm took off the site (2026-11-05)", () => {
    for (const path of [
      "/orange-county-medical-malpractice-attorney/",
      "/orange-county-medical-malpractice-attorney",
      "/irvine-medical-malpractice-lawyer",
      "/santa-ana-medical-malpractice-lawyer",
      "/tustin-medical-malpractice-lawyer",
      "/medical-malpractice-attorney-tustin-ca/",
      "/es/abogado-de-negligencia-medica-condado-de-orange",
      "/es/abogado-de-negligencia-medica-irvine",
      "/es/abogado-de-negligencia-medica-santa-ana",
      "/es/abogado-de-negligencia-medica-tustin",
      "/guides/medical-malpractice-statute-of-limitations-california",
      "/guides/california-medical-malpractice-damages-cap",
      "/es/guias/plazo-para-demandar-por-negligencia-medica-california",
      "/es/guias/limite-de-danos-negligencia-medica-california",
      ...["medical-malpractice-damages-looking-back-at-prop-46","orange-county-attorney-on-medical-malpractice","medical-malpractice-verdicts-and-awards","medical-malpractice-law-in-orange-county","prop-46-increase-malpractice-insurance-rates","increasing-pain-suffering-victims-medical-malpractice-increase-healthcare-costs","california-medical-malpractice-statute-limitation-year-plaintiff-discovers-injury","california-law-limits-pain-suffering-medical-malpractice-cases"].map((slug) => `/news/${slug}`),
      ...["danos-por-negligencia-medica-mirada-atras-a-la-prop-46","abogado-del-condado-de-orange-habla-sobre-negligencia-medica","veredictos-e-indemnizaciones-por-negligencia-medica","ley-de-negligencia-medica-en-el-condado-de-orange","prop-46-no-aumentara-las-tarifas-de-seguros-por-negligencia-medica","aumentar-dolor-y-sufrimiento-por-negligencia-medica-no-subira-costos-de-salud","plazo-de-prescripcion-negligencia-medica-california-tras-descubrir-la-lesion","ley-de-california-limita-dolor-y-sufrimiento-en-negligencia-medica"].map((slug) => `/es/noticias/${slug}`),
      "/2021/05/26/medical-malpractice-damages-looking-back-at-prop-46/",
      "/2020/12/10/orange-county-attorney-on-medical-malpractice/",
      "/2020/12/02/medical-malpractice-verdicts-and-awards/",
      "/2020/09/25/medical-malpractice-law-in-orange-county/",
      "/2014/11/03/prop-46-increase-malpractice-insurance-rates/",
      "/2014/11/03/increasing-pain-suffering-victims-medical-malpractice-increase-healthcare-costs/",
      "/2013/10/16/california-medical-malpractice-statute-limitation-year-plaintiff-discovers-injury/",
      "/2012/07/24/california-law-limits-pain-suffering-medical-malpractice-cases/",
    ]) {
      const { response } = visit(path);
      expect(response.status, path).toBe(410);
      expect(response.headers.get("location"), path).toBeNull();
    }
  });

  it("does not catch live pages that merely start the same way", () => {
    for (const path of ["/sample-pages-fictional", "/wp-adminfictional", "/news/orange-county-history-fictional", "/news/riverside-jury-verdict-2-3-million-fictional", "/orange-county-medical-malpractice-attorney-fictional", "/news/medical-malpractice-law-in-orange-county-fictional"]) {
      expect(visit(path).response.status, path).toBe(200);
    }
  });
});
