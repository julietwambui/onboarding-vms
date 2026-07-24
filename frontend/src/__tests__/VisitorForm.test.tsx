import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

import VisitorForm from "@/components/VisitorForm";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock API client
vi.mock("@/lib/apiClient", () => ({
  apiClient: {
    post: vi.fn().mockResolvedValue({}),
  },
}));

describe("VisitorForm Component", () => {

  test("should render the visitor registration form", () => {
    render(<VisitorForm onSuccess={vi.fn()} />);

    expect(screen.getByText(/visitor registration/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/purpose of visit/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /register visitor/i,
      })
    ).toBeInTheDocument();
  });

  test("should display validation errors for empty fields", async () => {
    const user = userEvent.setup();

    render(<VisitorForm onSuccess={vi.fn()} />);

    await user.click(
      screen.getByRole("button", {
        name: /register visitor/i,
      })
    );

    expect(
      await screen.findByText(/full name is required/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/purpose is required/i)
    ).toBeInTheDocument();
  });

  test("should allow typing into input fields", async () => {
    const user = userEvent.setup();

    render(<VisitorForm onSuccess={vi.fn()} />);

    const fullName = screen.getByLabelText(/full name/i);
    const purpose = screen.getByLabelText(/purpose of visit/i);

    await user.type(fullName, "Juliet Wambui");
    await user.type(purpose, "Project Meeting");

    expect(fullName).toHaveValue("Juliet Wambui");
    expect(purpose).toHaveValue("Project Meeting");
  });

  test("should render the submit button", () => {
    render(<VisitorForm onSuccess={vi.fn()} />);

    expect(
      screen.getByRole("button", {
        name: /register visitor/i,
      })
    ).toBeEnabled();
  });

});