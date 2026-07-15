import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders its children and responds to clicks", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Envoyer</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled and non-interactive while loading", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Envoi…
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Envoi…" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not swallow the disabled state when explicitly set", () => {
    render(<Button disabled>Envoyer</Button>);
    expect(screen.getByRole("button", { name: "Envoyer" })).toBeDisabled();
  });
});
