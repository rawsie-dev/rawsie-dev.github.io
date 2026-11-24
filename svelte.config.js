
import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

function escapeKatexBraces() {
	return (tree) => {
		const visit = (node, inKatex) => {
			const isKatex =
				inKatex ||
				(node.type === 'element' && node.properties?.className?.includes('katex') === true);

			if (isKatex && node.type === 'text' && node.value) {
				node.type = 'raw';
				node.value = node.value.replaceAll('{', '&#123;').replaceAll('}', '&#125;');
				return;
			}

			for (const child of node.children ?? []) visit(child, isKatex);
		};

		visit(tree, false);
	};
}

const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [remarkMath],
			rehypePlugins: [[rehypeKatex, { output: 'html' }], escapeKatexBraces]
		})
	],
	compilerOptions: {
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
    kit: {
		adapter: adapter(),
		prerender: {
			handleUnseenRoutes: 'ignore'
		}
    }
};

export default config;
