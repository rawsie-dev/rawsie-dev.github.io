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
 *   metadata: ProjectsMetadata;
 * }} ProjectsModule
 */

/** @type {Record<string, ProjectsModule>} */
const projects = import.meta.glob('/src/lib/content/projects/*.md', {
    eager: true
});

export function load() {
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
        // Featured projects
        featuredProjects: projectEntries.filter(
            (project) => project.metadata.featured
        ),

        // Normal projects
        projects: projectEntries.filter(
            (project) => !project.metadata.featured
        )
    };
}