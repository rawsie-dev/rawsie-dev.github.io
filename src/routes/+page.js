import { error } from '@sveltejs/kit';

/**
 * @typedef {{
 *   title: string;
 *   date: string;
 *   description: string;
 *   tags?: string[];
 *   featured?: boolean;
 *   hidden?: boolean;
 * }} PostMetadata
 *
 * @typedef {{
 *   metadata: PostMetadata;
 * }} PostModule
 */

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
 * }} ProjectsMetadata
 *
 * @typedef {{
 *   metadata: ProjectsMetadata;
 * }} ProjectsModule
 */

/** @type {Record<string, PostModule>} */
const posts = import.meta.glob('/src/lib/content/blog/*.md', {
	eager: true
});

/** @type {Record<string, ProjectsModule>} */
const projects = import.meta.glob('/src/lib/content/projects/*.md', {
    eager: true
});

export function load() {
	const postEntries = Object.entries(posts)
		.map(([path, post]) => {
			const slug = path.split('/').pop()?.replace('.md', '');

			if (!slug) {
				throw error(500, 'Invalid blog post filename');
			}

			return {
				slug,
				metadata: post.metadata
			};
		})
		.filter((post) => !post.metadata.hidden);

	postEntries.sort(
		(a, b) =>
			new Date(b.metadata.date).getTime() -
			new Date(a.metadata.date).getTime()
	);

	const projectEntries = Object.entries(projects).map(([path, project]) => {
			const slug = path.split('/').pop()?.replace('.md', '');
	
			if (!slug) {
				throw error(500, 'Invalid projects filename');
			}
	
			return {
				slug,
				metadata: project.metadata
			};
		})
		
		// Remove hidden projects
		.filter((project) => !project.metadata.hidden);
		
	
		projectEntries.sort(
			(a, b) =>
				new Date(b.metadata.date).getTime() -
				new Date(a.metadata.date).getTime()
		);

	return {
		featuredPosts: postEntries.filter(
			(post) => post.metadata.featured
		),
		recentPosts: postEntries.slice(0, 3),

		 // Featured projects
        featuredProjects: projectEntries.filter(
            (project) => project.metadata.featured
        )
	};
}