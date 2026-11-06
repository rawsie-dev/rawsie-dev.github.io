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
		padding: 150px 20px 30px;
		background: #0b0b12;
		/* border-color: #ffffff;
		border-width: 1px; */
	}

	.container {
		width: 100%;
		max-width: 1100px;
		margin: auto;
	}

	h1 {
        max-width: 1000px;
        margin: 0;

        color: white;

        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(52px, 6vw, 88px);
        line-height: 1;
        letter-spacing: -0.04em;
    }

    h1 :global(.cyan) {
        color: #5be4ff;
    }

    h1 :global(.pink) {
        color: #ffcdfe;
    }

    p {
        max-width: 650px;
        margin: 32px 0 0;

        color: #b7b7bd;

        font-size: 18px;
        line-height: 1.7;
    }

    @media (max-width: 600px) {
        .header {
            padding-top: 100px;
            padding-bottom: 24px;
        }
    }
</style>