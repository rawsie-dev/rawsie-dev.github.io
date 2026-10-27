<script>
	import { page } from '$app/state';

	/** @param {HTMLDivElement} node */
	function giscus(node) {
		const script = document.createElement('script');
		script.src = 'https://giscus.app/client.js';
		script.async = true;
		script.crossOrigin = 'anonymous';
		Object.entries({
			repo: 'rawsie-dev/rawsie-dev.github.io',
			'repo-id': 'R_kgDOSP1tlA',
			category: 'Comments',
			'category-id': 'DIC_kwDOSP1tlM4DJwKe',
			mapping: 'pathname',
			strict: '1',
			'reactions-enabled': '1',
			'emit-metadata': '0',
			'input-position': 'top',
			theme: `${location.origin}/giscus-theme.css?v=2`,
			lang: 'en',
			loading: 'lazy'
		}).forEach(([k, v]) => script.setAttribute(`data-${k}`, v));

		node.appendChild(script);
	}
</script>

<!-- Remount on every navigation so each page loads its own thread -->
{#key page.url.pathname}
	<div use:giscus class="mt-16"></div>
{/key}
