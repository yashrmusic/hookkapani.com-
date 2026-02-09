"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-10 lg:px-16">
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <p
          className="mb-3 text-xs tracking-[0.4em] uppercase text-muted-foreground transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(8px)",
          }}
        >
          Let{"'"}s Collaborate
        </p>
        <h2
          className="font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "150ms",
          }}
        >
          Begin a conversation
        </h2>
        <p
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "300ms",
          }}
        >
          Whether you{"'"}re a gallery, architect, public space curator, or
          private collector — if your project needs soul and structure, we
          {"'"}re here.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 flex max-w-lg flex-col gap-6 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "500ms",
          }}
        >
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex-1">
              <label htmlFor="name-input" className="sr-only">
                Name
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email-input" className="sr-only">
                Email
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message-input" className="sr-only">
              Message
            </label>
            <textarea
              id="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project"
              rows={3}
              className="w-full resize-none border-b border-foreground/20 bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-300"
            />
          </div>
          <button
            type="submit"
            className="self-center border border-foreground/20 bg-transparent px-10 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:tracking-[0.3em]"
          >
            {submitted ? "Sent" : "Send Message"}
          </button>
        </form>

        {submitted && (
          <p className="mt-6 text-xs tracking-[0.15em] uppercase text-primary animate-fade-up">
            Thank you. We will be in touch.
          </p>
        )}
      </div>
    </section>
  );
}
