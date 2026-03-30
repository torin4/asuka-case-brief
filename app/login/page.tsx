type SearchParams = { next?: string; error?: string };

export default function LoginPage({ searchParams }: { searchParams?: SearchParams }) {
  const nextRaw = searchParams?.next ?? '/case-dashboard';
  const next = nextRaw === '/' ? '/case-dashboard' : nextRaw;
  const error = searchParams?.error === '1';

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', padding: 24 }}>
      <div style={{ maxWidth: 420, margin: '0 auto' }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Sign in</h1>
        <p style={{ marginTop: 8, color: '#555', fontSize: 14 }}>
          Password-protected access for this case dashboard.
        </p>

        {error ? (
          <div style={{ marginTop: 12, background: '#fee2e2', color: '#991b1b', padding: 10, borderRadius: 8 }}>
            Incorrect password.
          </div>
        ) : null}

        <form method="post" action="/api/login" style={{ marginTop: 16 }}>
          <input type="hidden" name="next" value={next} />
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            style={{
              width: '100%',
              padding: 10,
              border: '1px solid #ddd',
              borderRadius: 8,
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: 12,
              width: '100%',
              padding: 11,
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

