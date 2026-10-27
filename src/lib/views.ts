import { dev } from '$app/environment';

export const VIEWS_ENDPOINT = 'https://rawsie-views.rawsie.workers.dev';

export function trackView(path: string) {
	if (dev || VIEWS_ENDPOINT.includes('REPLACE_ME')) return;
	fetch(`${VIEWS_ENDPOINT}/hit`, {
		method: 'POST',
		headers: { 'Content-Type': 'text/plain' },
		body: JSON.stringify({ path }),
		keepalive: true
	}).catch(() => {});
}
