"use client";

import { useContactForm } from "@/hooks/useContactForm";

export function ContactForm() {
  const { form, errors, status, updateField, submit } = useContactForm();

  return (
    <section id="contact" className="scroll-mt-[calc(var(--nav-height)+1rem)]">
      <div className="mb-6 space-y-2">
        <p className="text-xs tracking-[0.25em] text-white/45 uppercase">Get in touch</p>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Contact</h2>
      </div>

      <form
        className="pointer-events-auto space-y-4 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md sm:p-6"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
        noValidate
      >
        <div className="space-y-2">
          <label htmlFor="contact-name" className="block text-sm text-white/75">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-xs text-red-300" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-email" className="block text-sm text-white/75">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-300" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="contact-message" className="block text-sm text-white/75">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="min-h-[140px] w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25"
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <p className="text-xs text-red-300" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="pointer-events-auto rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send message"}
          </button>

          {status === "success" && (
            <p className="text-sm text-emerald-300" role="status">
              Message sent successfully.
            </p>
          )}

          {status === "error" && (
            <p className="text-sm text-red-300" role="alert">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
