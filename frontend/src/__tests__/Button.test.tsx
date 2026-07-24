import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button Component", () => {

  test("should render button with text", () => {
    render(<Button>Register Visitor</Button>);

    expect(
      screen.getByRole("button", { name: /register visitor/i })
    ).toBeInTheDocument();
  });

  test("should call onClick when clicked", async () => {
    const user = userEvent.setup();

    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick}>
        Register Visitor
      </Button>
    );

    await user.click(
      screen.getByRole("button", {
        name: /register visitor/i,
      })
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("should render a disabled button", () => {
    render(
      <Button disabled>
        Register Visitor
      </Button>
    );

    expect(
      screen.getByRole("button", {
        name: /register visitor/i,
      })
    ).toBeDisabled();
  });

});