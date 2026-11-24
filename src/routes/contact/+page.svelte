<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>Contact — Rawsie</title>
	<meta
		name="description"
		content="Get in touch with Rawsie for collaborations, projects, research, or a friendly hello."
	/>
</svelte:head>

<Navbar />

<main>
	<PageHeader
		title="Contact"
		description="Places where you may find me."
		titleColor="#FFCDFF"
	/>

	<section class="contact">
		<div class="container">
			<nav class="contact-list" aria-label="Contact links">
				<a href="mailto:me@rawsie.dev">
					<span class="name">Email</span>
					<span class="dash" aria-hidden="true"></span>
					<span class="link">me@rawsie.dev</span>
				</a>

				<a href="https://github.com/rawsie-dev" target="_blank" rel="noopener noreferrer">
					<span class="name">GitHub</span>
					<span class="dash" aria-hidden="true"></span>
					<span class="link">github.com/rawsie-dev</span>
					<span class="arrow" aria-hidden="true">↗</span>
				</a>

				<a href="https://www.youtube.com/@RawsieDev" target="_blank" rel="noopener noreferrer">
					<span class="name">YouTube</span>
					<span class="dash" aria-hidden="true"></span>
					<span class="link">youtube.com/@RawsieDev</span>
					<span class="arrow" aria-hidden="true">↗</span>
				</a>
			</nav>
		</div>
	</section>
</main>

<Footer />

<style>
	.contact {
		padding: 40px 0 140px;
		background: #0b0b12;
	}

	.container {
		width: min(1100px, calc(100% - 40px));
		margin: auto;
	}

	.contact-list {
		display: flex;
		flex-direction: column;
		border-top: 1px solid rgba(255, 255, 255, 0.09);
	}

	.contact-list a {
		display: grid;
		grid-template-columns: 110px 24px minmax(0, 1fr) 24px;
		align-items: center;
		min-height: 74px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.09);
		color: #f5f5fa;
		font-size: 16px;
		text-decoration: none;
		transition:
			background 0.2s ease,
			padding 0.2s ease;
	}

	.contact-list a:hover {
		padding-left: 12px;
		background: rgba(91, 228, 255, 0.025);
	}

	.name {
		font-family: 'Space Grotesk', sans-serif;
		font-weight: 500;
	}

	.dash {
		color: #686875;
	}

	.link {
		min-width: 0;
		overflow-wrap: anywhere;
		color: #a1a1b0;
	}

	.contact-list a:hover .name,
	.contact-list a:hover .link {
		color: #5be4ff;
	}

	.arrow {
		justify-self: end;
		color: #686875;
		font-family: Inter, sans-serif;
		transition:
			color 0.2s ease,
			transform 0.25s ease;
	}

	.contact-list a:hover .arrow {
		color: #ffcdfe;
		transform: translate(3px, -3px);
	}

	@media (max-width: 760px) {
		.contact {
			padding: 32px 0 100px;
		}

		.container {
			width: calc(100% - 32px);
		}

		.contact-list a {
			grid-template-columns: 84px 18px minmax(0, 1fr) 18px;
			min-height: 68px;
			font-size: 14px;
		}
	}

	@media (max-width: 420px) {
		.contact-list a {
			grid-template-columns: 74px 14px minmax(0, 1fr) 16px;
		}
	}
</style>