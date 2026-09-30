// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { siteProxy } from "@/lib/site-proxy";

/** The x-site-locale the proxy hands the page (<html lang>, the 404 page's language). */
function siteLocale(path: string) {
  const response = siteProxy(new NextRequest(`https://kjslaw.com${path}`));
  return response.headers.get("x-middleware-request-x-site-locale");
}

describe("x-site-locale: only the Spanish site is Spanish", () => {
  it.each(["/es", "/es/abogado-de-lesiones-personales-orange-county", "/es/no-existe"])("%s is Spanish", (path) => {
    expect(siteLocale(path)).toBe("es-US");
  });

  // English URLs that merely begin with the letters "es" (the old site's, or a typo)
  // get the English 404, not "Esta página no existe."
  it.each(["/estate-planning", "/escondido-personal-injury-attorney", "/essential", "/", "/news"])("%s is English", (path) => {
    expect(siteLocale(path)).toBe("en-US");
  });
});
