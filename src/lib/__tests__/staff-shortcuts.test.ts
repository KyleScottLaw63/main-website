// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildCustomRoute } from "next/dist/lib/build-custom-route";
import nextConfig, { firmAppOrigin } from "../../../next.config";

/**
 * kjslaw.com/admin and /login send staff to the firm app's sign-in page (next.config.ts). The app
 * runs on its own subdomain; its address comes from the form's bridge setting, so the shortcut and
 * the form always reach the same app, and neither exists until the form is connected.
 */

afterEach(() => {
  vi.unstubAllEnvs();
});

async function ruleFor(path: string) {
  const redirects = await nextConfig.redirects!();
  return redirects.find((rule) => new RegExp(buildCustomRoute("redirect", rule, ["/_next"]).regex).test(path));
}

describe("staff shortcuts", () => {
  it("while the form is not connected, /admin and /login are not redirected (they are 404s)", async () => {
    vi.stubEnv("MATTERFOLD_INTAKE_ENDPOINT", "");
    for (const path of ["/admin", "/admin/", "/admin/matters", "/login"]) expect(await ruleFor(path), path).toBeUndefined();
  });

  it("once connected, /admin, anything under it, and /login open the app's sign-in page, temporarily, in one hop", async () => {
    vi.stubEnv("MATTERFOLD_INTAKE_ENDPOINT", "https://app.kjslaw.com/api/public/leads");
    for (const path of ["/admin", "/admin/", "/admin/matters/fictional", "/login", "/login/"]) {
      const rule = await ruleFor(path);
      expect(rule?.destination, path).toBe("https://app.kjslaw.com/login");
      expect(rule && "permanent" in rule ? rule.permanent : undefined, path).toBe(false);
    }
    // Pages that merely start the same way are untouched.
    for (const path of ["/administrator-fictional", "/login-help-fictional"]) expect(await ruleFor(path), path).toBeUndefined();
  });

  it("the app address is the bridge endpoint's origin, HTTPS only (plain HTTP only on this machine)", () => {
    expect(firmAppOrigin("https://app.kjslaw.com/api/public/leads")).toBe("https://app.kjslaw.com");
    expect(firmAppOrigin(" https://App.KJSLaw.com/api/public/leads ")).toBe("https://app.kjslaw.com");
    expect(firmAppOrigin("http://127.0.0.1:3101/api/public/leads")).toBe("http://127.0.0.1:3101");
    expect(firmAppOrigin("http://app.kjslaw.com/api/public/leads")).toBeNull();
    expect(firmAppOrigin("not a url")).toBeNull();
    expect(firmAppOrigin(undefined)).toBeNull();
  });
});
