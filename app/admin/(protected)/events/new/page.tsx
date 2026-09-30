import type { Metadata } from "next";
import Link from "next/link";
import EventForm from "@/components/admin/EventForm";

export const metadata: Metadata = { title: "New event" };

export default function NewEventPage() {
  return (
    <div className="max-w-3xl">
      <Link href="/admin" className="text-sm font-semibold text-navy-800 hover:text-navy-600">
        <span aria-hidden>&larr;</span> All events
      </Link>
      <h1 className="mt-4 font-semibold tracking-tight text-3xl text-navy-900">New event</h1>
      <p className="mt-2 text-muted">Save the details first. You can then add photos, videos, documents and winners.</p>
      <div className="mt-8">
        <EventForm />
      </div>
    </div>
  );
}
