<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { afterNavigate } from '$app/navigation';
	import { trackView } from '$lib/views';

	let { children } = $props();

	// Runs on first load and on every client-side navigation
	afterNavigate(({ from, to }) => {
		if (!to?.url || from?.url.pathname === to.url.pathname) return;
		trackView(to.url.pathname);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
