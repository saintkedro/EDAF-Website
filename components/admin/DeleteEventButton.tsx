"use client";

import { useTransition } from "react";
import { deleteEvent } from "@/app/admin/actions";
import { dangerButton } from "@/components/admin/styles";

export default function DeleteEventButton({ eventId }: { eventId: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm("Delete this event and everything in it? This cannot be undone.")) {
          startTransition(() => deleteEvent(eventId));
        }
      }}
      className={dangerButton}
    >
      {pending ? "Deleting…" : "Delete event"}
    </button>
  );
}
