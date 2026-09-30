import "@testing-library/jest-dom/vitest";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { act } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * No form may ever put its fields in a URL. A `<form>` with `onSubmit` and no `action` is a
 * plain HTML form until React attaches `onSubmit`: a press before hydration is the browser's own
 * GET, with every named field — a client's name, a date of birth, an authenticator code — in the query
 * string. Every such form carries a function `action` (submitsThroughOnSubmit, or the one
 * useNonResettingFormAction returns), which React renders as an inert `javascript:` action, or
 * `method="post"` (src/components/shared/form-submit.ts). Fictional values only.
 */

import { ConsultationForm } from "@/components/marketing/ConsultationForm";
import { GovernmentClaimDeadlineTool } from "@/components/marketing/GovernmentClaimDeadlineTool";

const fetchMock = vi.fn();

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  fetchMock.mockReset();
});

const ROOT = process.cwd();

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "__tests__" || entry.name === "node_modules" ? [] : sourceFiles(full);
    return /\.(tsx|jsx)$/.test(entry.name) ? [full] : [];
  });
}

/** Each `<form …>` opening tag in a JSX source, with the line it starts on (braces and strings skipped). */
function formTags(source: string) {
  const tags: { line: number; tag: string }[] = [];
  const start = /<form(?=[\s>/])/g;
  for (let match = start.exec(source); match; match = start.exec(source)) {
    let depth = 0;
    let quote: string | null = null;
    let index = match.index + 5;
    for (; index < source.length; index += 1) {
      const char = source[index];
      if (quote) {
        if (char === "\\") index += 1;
        else if (char === quote) quote = null;
        continue;
      }
      if (char === '"' || char === "'" || char === "`") quote = char;
      else if (char === "{") depth += 1;
      else if (char === "}") depth -= 1;
      else if (char === ">" && depth === 0) break;
    }
    tags.push({ line: source.slice(0, match.index).split("\n").length, tag: source.slice(match.index, index + 1) });
  }
  return tags;
}

const hasOnSubmit = (tag: string) => /\bonSubmit\s*=/.test(tag);
const hasAction = (tag: string) => /\baction\s*=/.test(tag);
const postsNatively = (tag: string) => /\bmethod\s*=\s*(?:"post"|'post'|\{\s*["']post["']\s*\})/i.test(tag);
/** A form whose submission is JavaScript-only must be inert before hydration. */
const leaksBeforeHydration = (tag: string) => hasOnSubmit(tag) && !hasAction(tag) && !postsNatively(tag);

describe("source scan: forms submitted by onSubmit", () => {
  it("the scan reads multi-line tags and handlers with arrows and braces", () => {
    const sample = [
      '<form className="a" onSubmit={(event) => { event.preventDefault(); if (a > b) run({ x: 1 }); }}>',
      "<form\n  onSubmit={submit}\n  className={`b ${c}`}\n>",
      '<form action={submitsThroughOnSubmit} onSubmit={(event) => { event.preventDefault(); }}>',
      '<form method="post" onSubmit={submit}>',
      "<form {...formProps} className=\"c\">",
      "<formatted value={1} />",
    ].join("\n");
    const tags = formTags(sample);
    expect(tags.map(({ line }) => line)).toEqual([1, 2, 6, 7, 8]);
    expect(tags.map(({ tag }) => leaksBeforeHydration(tag))).toEqual([true, true, false, false, false]);
  });

  it("every <form> with onSubmit also has an action or method=\"post\"", () => {
    const offenders = sourceFiles(path.join(ROOT, "src")).flatMap((file) =>
      formTags(readFileSync(file, "utf8"))
        .filter(({ tag }) => leaksBeforeHydration(tag))
        .map(({ line }) => `${path.relative(ROOT, file).split(path.sep).join("/")}:${line}`),
    );
    expect(offenders).toEqual([]);
  });

  it("a form built only from spread props gets them from useNonResettingFormAction (which carries an action)", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(path.join(ROOT, "src"))) {
      const source = readFileSync(file, "utf8");
      for (const { line, tag } of formTags(source)) {
        const spread = /\{\s*\.\.\.(\w+)\s*\}/.exec(tag)?.[1];
        if (!spread || hasOnSubmit(tag) || hasAction(tag) || postsNatively(tag)) continue;
        const fromHook = new RegExp(`\\[[^\\]]*\\b${spread}\\b[^\\]]*\\]\\s*=\\s*useNonResettingFormAction\\b`).test(source);
        if (!fromHook) offenders.push(`${path.relative(ROOT, file).split(path.sep).join("/")}:${line} {...${spread}}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});

describe("before hydration", () => {
  it("the website's consultation form is rendered with an inert action: no native GET, nothing in a URL", () => {
    const tag = /<form[^>]*>/.exec(renderToString(<ConsultationForm />))?.[0] ?? "";
    expect(tag).toMatch(/\baction="javascript:/);
    expect(tag).not.toMatch(/\bmethod=/);
  });

  it("the government-claim deadline tool is rendered the same way", () => {
    const tag = /<form[^>]*>/.exec(renderToString(<GovernmentClaimDeadlineTool />))?.[0] ?? "";
    expect(tag).toMatch(/\baction="javascript:/);
  });

  it("a press React held before hydration sends nothing once the page is ready", async () => {
    vi.stubGlobal("fetch", fetchMock);
    const container = document.createElement("div");
    container.innerHTML = renderToString(<ConsultationForm />);
    document.body.appendChild(container);
    const form = container.querySelector("form")!;
    const name = container.querySelector<HTMLInputElement>('input[name="fullName"]')!;
    name.value = "Fictional Visitor";
    // What React's inline script does with a press before hydration: hold the form and its entries.
    (document as unknown as { $$reactFormReplay?: unknown[] }).$$reactFormReplay = [form, null, new FormData(form)];
    let root: ReturnType<typeof hydrateRoot> | undefined;
    try {
      await act(async () => {
        root = hydrateRoot(container, <ConsultationForm />);
      });
      // React replays the held press into the form's action (the no-op), not into onSubmit.
      await waitFor(() => expect(name).toHaveValue(""));
      expect(fetchMock).not.toHaveBeenCalled();
    } finally {
      act(() => root?.unmount());
      container.remove();
      delete (document as unknown as { $$reactFormReplay?: unknown[] }).$$reactFormReplay;
    }
  });
});

describe("after hydration, onSubmit still does the work (and a refusal keeps what was typed)", () => {
  it("the consultation form posts its entries once, as JSON, and keeps them when refused", async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ message: "Enter a valid phone number." }), { status: 400 }));
    vi.stubGlobal("fetch", fetchMock);
    const { container } = render(<ConsultationForm />);
    const name = container.querySelector<HTMLInputElement>('input[name="fullName"]')!;
    fireEvent.change(name, { target: { value: "Fictional Visitor" } });
    fireEvent.change(container.querySelector('input[name="phone"]')!, { target: { value: "(714) 555-0123" } });
    fireEvent.change(container.querySelector('select[name="caseTypeChoice"]')!, { target: { value: "dog_bite" } });
    fireEvent.change(container.querySelector('textarea[name="briefSummary"]')!, { target: { value: "A fictional dog bite at a park." } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /Request a case review/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a valid phone number.");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/consultation");
    expect(JSON.parse(String(init.body))).toMatchObject({ fullName: "Fictional Visitor", phone: "(714) 555-0123", caseType: "other_pi", entry: "form" });
    expect(name).toHaveValue("Fictional Visitor");
  });
});
