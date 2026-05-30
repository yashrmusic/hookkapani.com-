'use client';

import { useState } from 'react';

export default function ContentAdminPage() {
  const [token, setToken] = useState('');
  const [jsonText, setJsonText] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadContent = async () => {
    if (!token.trim()) {
      setStatus('Enter admin token before loading content.');
      return;
    }

    setIsLoading(true);
    setStatus('');
    try {
      const response = await fetch('/api/admin/content', {
        headers: {
          'x-admin-token': token,
        },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        setStatus(data?.error || 'Failed to load content JSON.');
        return;
      }
      setJsonText(JSON.stringify(data, null, 2));
      setStatus('Loaded content JSON.');
    } catch {
      setStatus('Failed to load content JSON.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async () => {
    if (!token.trim()) {
      setStatus('Enter admin token before saving content.');
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      setStatus('Invalid JSON. Please fix formatting.');
      return;
    }

    setIsLoading(true);
    setStatus('');
    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify(parsed),
      });
      const result = await response.json();
      if (!response.ok) {
        setStatus(result.error || 'Save failed.');
        return;
      }
      setStatus('Saved content JSON successfully.');
    } catch {
      setStatus('Failed to save content JSON.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Content Admin</h1>
        <p className="text-muted-foreground mb-8">
          Lightweight JSON editor for homepage content. Set `CMS_ADMIN_TOKEN` in environment before using save.
        </p>

        <div className="mb-4">
          <label htmlFor="token" className="block text-sm mb-2">Admin Token</label>
          <input
            id="token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full bg-transparent border border-border px-3 py-2 outline-none focus:border-accent"
            placeholder="Enter CMS_ADMIN_TOKEN"
          />
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={loadContent}
            disabled={isLoading}
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 transition-colors"
          >
            Load JSON
          </button>
          <button
            onClick={saveContent}
            disabled={isLoading}
            className="px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            Save JSON
          </button>
        </div>

        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          rows={20}
          className="w-full bg-transparent border border-border px-3 py-3 font-mono text-sm outline-none focus:border-accent"
          placeholder="Load JSON to start editing..."
        />

        {status && <p className="mt-4 text-sm text-muted-foreground">{status}</p>}
      </div>
    </main>
  );
}
