"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    // Stub submit, replace with real endpoint later
    await new Promise((r) => setTimeout(r, 600));
    // eslint-disable-next-line no-console
    console.log("[contact stub]", { name, email, message });
    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close contact form"
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
            data-cursor="hover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Contact"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 240 }}
            className="relative ml-auto h-full w-full max-w-md overflow-y-auto bg-paper px-7 py-8 shadow-2xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl tracking-tight">Contact</h2>
              <button
                type="button"
                onClick={onClose}
                data-cursor="hover"
                className="rounded-full border border-line px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper"
              >
                Close
              </button>
            </div>

            {status === "success" ? (
              <div className="mt-12 rounded-2xl bg-ink p-8 text-paper">
                <p className="text-lg">
                  Thank you! Your submission has been received!
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  data-cursor="hover"
                  className="mt-6 rounded-full bg-paper px-4 py-2 text-sm text-ink"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <Field
                  label="Name"
                  value={name}
                  onChange={setName}
                  required
                  placeholder="Your name"
                />
                <Field
                  label="Email Address"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  required
                  placeholder="you@company.com"
                />
                <Field
                  label="Message"
                  value={message}
                  onChange={setMessage}
                  textarea
                  required
                  placeholder="Tell us about your project"
                />

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  data-cursor="hover"
                  className={cn(
                    "w-full rounded-full bg-ink py-3.5 text-sm text-paper transition-colors hover:bg-ink-soft",
                    status === "submitting" && "opacity-60"
                  )}
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </button>

                {status === "error" && (
                  <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                    Oops! Something went wrong while submitting the form.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          rows={5}
          data-cursor="hover"
          className="w-full resize-none rounded-2xl border border-line bg-white/50 px-4 py-3 text-base outline-none transition-colors placeholder:text-muted focus:border-ink"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          type={type}
          data-cursor="hover"
          className="w-full rounded-2xl border border-line bg-white/50 px-4 py-3 text-base outline-none transition-colors placeholder:text-muted focus:border-ink"
        />
      )}
    </label>
  );
}
