"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNotificationToast } from "@/components/ui/NotificationToast";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function RequiredMark() {
  return <span className="text-bronze"> *</span>;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast, toast } = useNotificationToast();

  const updateField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm(initialState);
        showToast("Your message was sent successfully.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        {toast}
        <div className="contact-form-card flex min-h-[28rem] flex-col items-start justify-center">
        <p className="font-serif text-display-lg text-foreground">Message sent.</p>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
          Thank you for reaching out. Our team will respond within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn-primary mt-8 px-7"
        >
          Send another message
        </button>
      </div>
      </>
    );
  }

  return (
    <>
      {toast}
    <form onSubmit={handleSubmit} className="contact-form-card">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="contact-label">
            Full Name
            <RequiredMark />
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={updateField("name")}
            placeholder="Your name"
            className="contact-field"
            suppressHydrationWarning
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="contact-label">
            Email
            <RequiredMark />
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={updateField("email")}
            placeholder="you@email.com"
            className="contact-field"
            suppressHydrationWarning
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="contact-label">
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={updateField("phone")}
            placeholder="+27 xx xxx xxxx"
            className="contact-field"
            suppressHydrationWarning
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="contact-label">
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={updateField("subject")}
            placeholder="What is this about?"
            className="contact-field"
            suppressHydrationWarning
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="contact-message" className="contact-label">
          Message
          <RequiredMark />
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={updateField("message")}
          placeholder="Tell us how we can help..."
          className="contact-field min-h-[10rem] resize-y"
          suppressHydrationWarning
        />
      </div>

      <div className="mt-8 border-t border-border/25 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary px-7 py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
    </>
  );
}
