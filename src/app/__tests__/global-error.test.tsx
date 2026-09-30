import "@testing-library/jest-dom/vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import GlobalError from "../global-error";

function failure(message: string, digest?: string) {
  const error = new Error(message) as Error & { digest?: string };
  if (digest) error.digest = digest;
  return error;
}

let consoleError: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  // Rendering a whole <html> document inside the test container makes React warn about nesting.
  consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  cleanup();
  consoleError.mockRestore();
  window.history.replaceState(null, "", "/");
});

describe("the last-resort error page", () => {
  it("renders its own document, brand-neutral, with no message or stack", () => {
    const html = renderToStaticMarkup(
      <GlobalError error={failure("Oasis staff console: settlement statement failed for Rosa Fictional", "90210887766554433")} retry={() => {}} />,
    );
    expect(html.startsWith("<html")).toBe(true);
    expect(html).toContain("<body");
    expect(html).toContain("Sorry, this page didn’t load.");
    expect(html).toContain("Reference 902108877665");
    for (const leak of ["Oasis", "staff", "settlement", "Rosa", "90210887766554433"]) {
      expect(html).not.toContain(leak);
    }
  });

  it("retries on request", () => {
    const retry = vi.fn();
    render(<GlobalError error={failure("x")} retry={retry} />);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("speaks Spanish on the Spanish site", () => {
    window.history.replaceState(null, "", "/es/contacto");
    render(<GlobalError error={failure("x")} retry={() => {}} />);
    expect(screen.getByRole("button", { name: "Intentar de nuevo" })).toBeInTheDocument();
    expect(screen.getByText("Lo sentimos, esta página no se cargó.")).toBeInTheDocument();
  });
});
