export const prerender = false; // remove this when you add a project post
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
 * }} ProjectsMetadata
 *
 * @typedef {{
 *   default: import('svelte').Component;
 *   metadata: ProjectsMetadata;
 * }} ProjectsModule
 */

/** @type {Record<string, ProjectsModule>} */
const projects = import.meta.glob('/src/lib/content/projects/*.md', {
	eager: true
});

export function load({ params }) {
	const path = `/src/lib/content/projects/${params.slug}.md`;
	const project = projects[path];

	if (!project) {
		throw error(404, 'Project not found');
	}

	return {
		content: project.default,
		metadata: project.metadata
	};
}