import { promises as fs, readFileSync } from 'node:fs';
import path from 'node:path';

const htmlPath = path.join(process.cwd(), 'case-dashboard.html');
let dashboardHtml: string | null = null;

// Prefer build-time loading so Vercel doesn't depend on runtime filesystem state.
try {
  dashboardHtml = readFileSync(htmlPath, 'utf8');
} catch {
  dashboardHtml = null;
}

export async function GET() {
  // Serve the existing dashboard HTML exactly as-is (inline CSS/JS + CDN chart libs).
  const html = dashboardHtml ?? (await fs.readFile(htmlPath, 'utf8'));

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      // Dashboard contains sensitive patient/legal content; avoid caching.
      'cache-control': 'no-store, private'
    }
  });
}

