'use client';

import { useState } from 'react';

export function AlertsSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          projectType: 'contact',
          budget: 'not-specified',
          timeline: 'not-specified',
          description: 'New-work alerts signup. Please email me when new works or shows are announced.',
        }),
      });
      if (!res.ok) throw new Error('Signup failed');
      setDone(true);
    } catch {
      setError('Could not sign you up just now — please try again, or email the studio.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="border border-accent/40 bg-accent/5 p-6 text-center">
        <p className="font-medium">You are on the list.</p>
        <p className="text-sm text-muted-foreground mt-1">New works and shows, straight to your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border border-border p-6 bg-card/30">
      <p className="font-medium mb-1">New-work alerts</p>
      <p className="text-sm text-muted-foreground mb-5">
        A short email when a new work is finished or a show opens. No noise in between.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none text-white placeholder:text-white/40"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none text-white placeholder:text-white/40"
        />
      </div>
      {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="px-6 py-3 bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 min-h-[44px]"
      >
        {busy ? 'Signing up...' : 'Sign up for alerts'}
      </button>
    </form>
  );
}
