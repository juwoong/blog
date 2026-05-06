import { getStore, type Store } from '@netlify/blobs';
import type { APIContext } from 'astro';

export const prerender = false;

type ViewRecord = {
	views: number;
	updatedAt: string;
};

const STORE_NAME = 'post-views';
const MAX_INCREMENT_ATTEMPTS = 5;
const VIEW_KEY_PATTERN = /^(ko|en):[A-Za-z0-9][A-Za-z0-9._~/% -]{0,220}$/;
const memoryViews = new Map<string, ViewRecord>();

export async function GET({ request }: APIContext) {
	const url = new URL(request.url);
	const key = normalizeViewKey(url.searchParams.get('key'));

	if (!key) {
		return json({ error: 'Invalid view key' }, { status: 400 });
	}

	try {
		return json({ views: await getViewCount(key) });
	} catch (error) {
		console.error('Failed to load view count', error);
		return json({ error: 'Unable to load view count' }, { status: 503 });
	}
}

export async function POST({ request }: APIContext) {
	const key = normalizeViewKey(await readViewKey(request));

	if (!key) {
		return json({ error: 'Invalid view key' }, { status: 400 });
	}

	try {
		return json({ views: await incrementViewCount(key) });
	} catch (error) {
		console.error('Failed to update view count', error);
		return json({ error: 'Unable to update view count' }, { status: 503 });
	}
}

async function readViewKey(request: Request): Promise<string | null> {
	try {
		const body = await request.json();
		return typeof body?.key === 'string' ? body.key : null;
	} catch {
		return null;
	}
}

function normalizeViewKey(key: string | null): string | null {
	const normalizedKey = key?.trim();

	if (!normalizedKey || !VIEW_KEY_PATTERN.test(normalizedKey)) {
		return null;
	}

	return normalizedKey;
}

async function getViewCount(key: string): Promise<number> {
	return withStore(
		async (store) => {
			const record = await store.get(storageKey(key), {
				consistency: 'strong',
				type: 'json',
			});
			return sanitizeViews(record?.views);
		},
		() => sanitizeViews(memoryViews.get(key)?.views),
	);
}

async function incrementViewCount(key: string): Promise<number> {
	return withStore(
		(store) => incrementBlobViewCount(store, key),
		() => {
			const current = sanitizeViews(memoryViews.get(key)?.views);
			const next = current + 1;

			memoryViews.set(key, {
				views: next,
				updatedAt: new Date().toISOString(),
			});

			return next;
		},
	);
}

async function incrementBlobViewCount(store: Store, key: string): Promise<number> {
	const keyForStore = storageKey(key);

	for (let attempt = 0; attempt < MAX_INCREMENT_ATTEMPTS; attempt += 1) {
		const entry = await store.getWithMetadata(keyForStore, {
			consistency: 'strong',
			type: 'json',
		});
		const nextRecord: ViewRecord = {
			views: sanitizeViews(entry?.data?.views) + 1,
			updatedAt: new Date().toISOString(),
		};

		if (entry?.etag) {
			const result = await store.setJSON(keyForStore, nextRecord, {
				onlyIfMatch: entry.etag,
			});

			if (result.modified) {
				return nextRecord.views;
			}
		} else {
			const result = await store.setJSON(keyForStore, nextRecord, {
				onlyIfNew: true,
			});

			if (result.modified) {
				return nextRecord.views;
			}
		}
	}

	throw new Error('Could not update view count after retries');
}

async function withStore<T>(
	useBlobStore: (store: Store) => Promise<T>,
	useMemoryStore: () => T,
): Promise<T> {
	try {
		return await useBlobStore(getStore(STORE_NAME, { consistency: 'strong' }));
	} catch (error) {
		if (import.meta.env.DEV) {
			return useMemoryStore();
		}

		throw error;
	}
}

function storageKey(key: string): string {
	return `posts/${encodeURIComponent(key)}`;
}

function sanitizeViews(value: unknown): number {
	return typeof value === 'number' && Number.isFinite(value) && value > 0
		? Math.floor(value)
		: 0;
}

function json(body: unknown, init: ResponseInit = {}): Response {
	const headers = new Headers(init.headers);

	headers.set('content-type', 'application/json; charset=utf-8');
	headers.set('cache-control', 'no-store');

	return new Response(JSON.stringify(body), {
		...init,
		headers,
	});
}
