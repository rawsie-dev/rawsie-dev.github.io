<script>
	let { title, description = '' } = $props();
</script>

<section class="header">
	<div class="container">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<h1 class="font-bold">{@html title}</h1>

		{#if description}
			<p>{description}</p>
		{/if}
	</div>
</section>

<style>
	.header {
		padding: 150px 0 50px;
		background: #0b0b12;
	}

	.container {
		width: min(1100px, calc(100% - 40px));
		margin: auto;
	}

	h1 {
		max-width: 1000px;

		margin: 0;

		color: white;

		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(52px, 6vw, 88px);
		line-height: 0.92;
		letter-spacing: -0.065em;
	}

	h1 :global(.cyan) {
		color: #5be4ff;
	}

	h1 :global(.pink) {
		color: #ffcdfe;
	}

	p {
		max-width: 650px;
		margin: 40px 0 0;

		color: #888895;

		font-size: 18px;
		line-height: 1.7;
	}

	@media (max-width: 600px) {
		.header {
			padding-top: 140px;
		}
	}
</style>