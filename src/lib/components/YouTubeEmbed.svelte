<script>
	let { url, preview = false, title = 'YouTube video' } = $props();

	/** @param {string} value */
	function getVideoId(value) {
		try {
			const parsed = new URL(value);
			if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1);
			if (parsed.hostname === 'youtube.com' || parsed.hostname === 'www.youtube.com') {
				if (parsed.pathname === '/watch') return parsed.searchParams.get('v');
				const match = parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/);
				return match?.[1] ?? null;
			}
		} catch {
			return null;
		}
		return null;
	}

	let videoId = $derived(getVideoId(url));
</script>

{#if preview && videoId}
	<div class="my-8 aspect-video overflow-hidden rounded-xl">
		<iframe
			src="https://www.youtube-nocookie.com/embed/{videoId}"
			{title}
			class="h-full w-full"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>
{:else}
	<a href={url}>{url}</a>
{/if}

