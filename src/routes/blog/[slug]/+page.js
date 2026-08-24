import { error } from '@sveltejs/kit';

/**
 * @typedef {{
 *   title: string;
 *   date: string;
 *   description: string;
 *   tags?: string[];
 *   featured?: boolean;
 * }} PostMetadata
 *
 * @typedef {{
 *   default: import('svelte').Component;
 *   metadata: PostMetadata;
 * }} PostModule
 */

/** @type {Record<string, PostModule>} */
const posts = import.meta.glob('/src/lib/content/blog/*.md', {
	eager: true
});

export function load({ params }) {
	const path = `/src/lib/content/blog/${params.slug}.md`;
	const post = posts[path];

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		content: post.default,
		metadata: post.metadata
	};
}