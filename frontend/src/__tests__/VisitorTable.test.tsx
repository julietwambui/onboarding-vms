import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi, beforeEach} from "vitest";

import VisitorTable from "@/components/VisitorTable";

describe("VisitorTable Component", () => {
  const onCheckIn = vi.fn();
  const onCheckOut = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render visitor information", () => {
    render(
      <VisitorTable
        visitors={[
          {
            id: "1",
            fullName: "Juliet Wambui",
            purpose: "Project Meeting",
            status: "PENDING",

          },
        ]}
        onCheckIn={onCheckIn}
        onCheckOut={onCheckOut}
        isAuthenticated={true}
      />
    );

    expect(screen.getByText("Juliet Wambui")).toBeInTheDocument();
    expect(screen.getByText("Project Meeting")).toBeInTheDocument();
    expect(screen.getByText("PENDING")).toBeInTheDocument();
  });

  test("should call onCheckIn when Check In button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <VisitorTable
        visitors={[
          {
            id: "1",
            fullName: "Juliet Wambui",
            purpose: "Meeting",
            status: "PENDING",
           
          },
        ]}
        onCheckIn={onCheckIn}
        onCheckOut={onCheckOut}
        isAuthenticated={true}
      />
    );

    await user.click(screen.getByRole("button", { name: /check in/i }));

    expect(onCheckIn).toHaveBeenCalledWith("1");
  });

  test("should call onCheckOut when Check Out button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <VisitorTable
        visitors={[
          {
            id: "2",
            fullName: "Jane Mwangi",
            purpose: "Interview",
            status: "CHECKED_IN",
          },
        ]}
        onCheckIn={onCheckIn}
        onCheckOut={onCheckOut}
        isAuthenticated={true}
      />
    );

    await user.click(screen.getByRole("button", { name: /check out/i }));

    expect(onCheckOut).toHaveBeenCalledWith("2");
  });

  test("should disable buttons when user is not authenticated", () => {
    render(
      <VisitorTable
        visitors={[
          {
            id: "1",
            fullName: "Juliet Wambui",
            purpose: "Meeting",
            status: "PENDING",
           
          },
        ]}
        onCheckIn={onCheckIn}
        onCheckOut={onCheckOut}
        isAuthenticated={false}
      />
    );

    expect(
      screen.getByRole("button", { name: /check in/i })
    ).toBeDisabled();
  });
});