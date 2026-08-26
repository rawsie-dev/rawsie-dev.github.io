import { error } from '@sveltejs/kit';

/**
 * @typedef {{
 *   title: string;
 *   date: string;
 *   description: string;
 *   status: string;
 *   authors: string[];
 *   tags?: string[];
 *   links?: { name: string; url: string }[];
 *   featured?: boolean;
 *   hidden?: boolean;
 *   summary?: string;
 * }} ResearchMetadata
 *
 * @typedef {{
 *   default: import('svelte').Component;
 *   metadata: ResearchMetadata;
 * }} ResearchModule
 */

/** @type {Record<string, ResearchModule>} */
const reports = import.meta.glob('/src/lib/content/research/*.md', {
	eager: true
});

export function load({ params }) {
	const path = `/src/lib/content/research/${params.slug}.md`;
	const research = reports[path];

	if (!research) {
		throw error(404, 'Research not found');
	}

	return {
		content: research.default,
		metadata: research.metadata
	};
}