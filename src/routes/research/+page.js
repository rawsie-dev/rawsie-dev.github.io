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
const reports = import.meta.glob('/src/lib/content/research/*.md', {
    eager: true
});

export function load() {
    const reportEntries = Object.entries(reports).map(([path, report]) => {
        const slug = path.split('/').pop()?.replace('.md', '');

        if (!slug) {
            throw error(500, 'Invalid reports filename');
        }

        return {
            slug,
            metadata: report.metadata
        };
    })
    
    // Remove hidden reports
    .filter((project) => !project.metadata.hidden);
    

    reportEntries.sort(
        (a, b) =>
            new Date(b.metadata.date).getTime() -
            new Date(a.metadata.date).getTime()
    );

    return {
        // Featured Research
        featuredResearch: reportEntries.filter(
            (report) => report.metadata.featured
        ),

        // Normal Research
        research: reportEntries.filter(
            (report) => !report.metadata.featured
        )
    };
}