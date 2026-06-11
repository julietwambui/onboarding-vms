// VisitorTable Component — Sprint 3
//
// 👤 Frontend Intern Task
//
// A reusable table component that displays a list of visitors.
// This component is responsible ONLY for rendering the table.
// It should NOT fetch data or call the API directly.
//
// Props:
//   visitors   — the array of visitors to display (passed in from the page)
//   onCheckIn  — called with the visitor's id when "Check In" is clicked
//   onCheckOut — called with the visitor's id when "Check Out" is clicked

import { Visitor } from "@/types/visitor";

interface VisitorTableProps {
  visitors: Visitor[];
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
}

export default function VisitorTable({
  visitors,
  onCheckIn,
  onCheckOut,
}: VisitorTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Purpose</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {visitors.map((visitor) => (
          <tr key={visitor.id}>
            {/* TODO: Render visitor.fullName in a <td> */}

            {/* TODO: Render visitor.purpose in a <td> */}

            {/* TODO: Render a status badge in a <td> */}
            {/* Use distinct colours: PENDING = yellow, CHECKED_IN = green, CHECKED_OUT = grey */}

            <td>
              {/* TODO: Show "Check In" button ONLY if visitor.status === "PENDING" */}
              {/* onClick={() => onCheckIn(visitor.id)} */}

              {/* TODO: Show "Check Out" button ONLY if visitor.status === "CHECKED_IN" */}
              {/* onClick={() => onCheckOut(visitor.id)} */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
