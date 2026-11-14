import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { defineConfig } from 'vite';

type MathNode = {
	type: string;
	value?: string;
	properties?: { className?: string[] };
	children?: MathNode[];
};

function escapeKatexBraces() {
	return (tree: MathNode) => {
		const visit = (node: MathNode, inKatex: boolean): void => {
			const isKatex =
				inKatex ||
				(node.type === 'element' && node.properties?.className?.includes('katex') === true);

			if (isKatex && node.type === 'text' && node.value) {
				node.type = 'raw';
				node.value = node.value.replaceAll('{', '&#123;').replaceAll('}', '&#125;');
				return;
			}

			for (const child of node.children ?? []) {
				visit(child, isKatex);
			}
		};

		visit(tree, false);
	};
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			extensions: ['.svelte', '.md'],

			prerender: {
				handleUnseenRoutes: 'ignore'
			},

			preprocess: [
				mdsvex({
					extensions: ['.md'],
					remarkPlugins: [remarkMath],
					rehypePlugins: [
						[rehypeKatex, { output: 'html' }],
						escapeKatexBraces
					]
				})
			],
			
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		})
	]
});
