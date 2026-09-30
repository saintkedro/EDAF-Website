"use client";

import { useState } from "react";
import { contact } from "@/lib/content";

const foundationTopics = [
  "General enquiry",
  "Sir Edet Amana Scholarship",
  "Partnership",
  "Donation or support",
  "Volunteering",
];

const fieldClass =
  "mt-2 w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/20";

export default function ContactForm({
  recipient = contact.email,
  recipientName = "the Foundation",
  topics = foundationTopics,
}: {
  recipient?: string;
  recipientName?: string;
  topics?: string[];
}) {
  const [opened, setOpened] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();

    const subject = `${topic} - ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy-900">
          Full name
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy-900">
          Email address
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="block text-sm font-medium text-navy-900">
        Topic
        <select name="topic" className={fieldClass} defaultValue={topics[0]}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-navy-900">
        Message
        <textarea name="message" required rows={6} className={`${fieldClass} resize-y`} />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-navy-800 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-navy-700 sm:w-auto"
      >
        Send message
      </button>
      <p className="text-sm text-muted" role="status">
        {opened ? (
          <>
            Your email app should now open with your message. If it didn&apos;t, email us directly at{" "}
            <a href={`mailto:${recipient}`} className="font-medium text-navy-800 underline">
              {recipient}
            </a>
            .
          </>
        ) : (
          `Sending opens your email app with your message addressed to ${recipientName}.`
        )}
      </p>
    </form>
  );
}
