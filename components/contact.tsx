"use client";

import React from "react"

import { useState } from "react";

export function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-3 text-xs tracking-[0.4em] uppercase text-muted-foreground">
          Get in Touch
        </p>
        <h2 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Begin a conversation
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
          Whether you are a gallery, institution, or private collector — we
          welcome inquiries about commissions, exhibitions, and collaborations.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 flex max-w-md flex-col gap-4 sm:flex-row"
        >
          <label htmlFor="email-input" className="sr-only">
            Email address
          </label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 border-b border-foreground/20 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            className="border border-foreground/20 bg-transparent px-8 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {submitted ? "Sent" : "Inquire"}
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-xs tracking-[0.15em] uppercase text-primary">
            Thank you. We will be in touch.
          </p>
        )}
      </div>
    </section>
  );
}
