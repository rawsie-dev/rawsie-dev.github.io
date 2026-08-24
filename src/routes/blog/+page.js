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
 *   metadata: PostMetadata;
 * }} PostModule
 */

/** @type {Record<string, PostModule>} */
const posts = import.meta.glob('/src/lib/content/blog/*.md', {
    eager: true
});

export function load() {
    const postEntries = Object.entries(posts).map(([path, post]) => {
        const slug = path.split('/').pop()?.replace('.md', '');

        if (!slug) {
            throw error(500, 'Invalid blog post filename');
        }

        return {
            slug,
            metadata: post.metadata
        };
    });

    postEntries.sort(
        (a, b) =>
            new Date(b.metadata.date).getTime() -
            new Date(a.metadata.date).getTime()
    );

    return {
        posts: postEntries
    };
}