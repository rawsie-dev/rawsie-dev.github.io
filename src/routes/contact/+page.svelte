<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	import {
        Mail,
        ArrowUpRight,
    } from '@lucide/svelte';

	import {
		siGithub,
		siYoutube,
		siBluesky
	} from 'simple-icons'
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
					<span class="icon" aria-hidden="true">
                        <Mail size={19} strokeWidth={1.6} />
                    </span>
					<span class="name">Email</span>
					<span class="dash" aria-hidden="true"></span>
					<span class="link">me@rawsie.dev</span>
				</a>

				<a href="https://github.com/rawsie-dev" target="_blank" rel="noopener noreferrer">
					<span class="icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" class="brand-icon github-icon">
                            <path d={siGithub.path} fill="currentColor" />
                        </svg>
                    </span>
					<span class="name">GitHub</span>
					<span class="dash" aria-hidden="true"></span>
					<span class="link">github.com/rawsie-dev</span>
					<ArrowUpRight class="arrow" size={18} strokeWidth={1.6} aria-hidden="true" />
				</a>

				<a href="https://www.youtube.com/@RawsieDev" target="_blank" rel="noopener noreferrer">
					<span class="icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" class="brand-icon youtube-icon">
                            <path d={siYoutube.path} fill="currentColor" />
                        </svg>
                    </span>
					<span class="name">YouTube</span>
					<span class="dash" aria-hidden="true"></span>
					<span class="link">youtube.com/@RawsieDev</span>
					<ArrowUpRight class="arrow" size={18} strokeWidth={1.6} aria-hidden="true" />
				</a>

				<a href="https://bsky.app/profile/rawsie.dev" target="_blank" rel="noopener noreferrer">
					<span class="icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" class="brand-icon bluesky-icon">
                            <path d={siBluesky.path} fill="currentColor" />
                        </svg>
                    </span>
					<span class="name">Bluesky</span>
					<span class="dash" aria-hidden="true"></span>
					<span class="link">@rawsie.dev</span>
					<ArrowUpRight class="arrow" size={18} strokeWidth={1.6} aria-hidden="true" />
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
		grid-template-columns: 20px 110px 24px minmax(0, 1fr) 24px;
		column-gap: 8px;
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

	:global(.arrow) {
		justify-self: end;
		color: #686875;
		font-family: Inter, sans-serif;
		transition:
			color 0.2s ease,
			transform 0.25s ease;
	}

	.icon {
		display: flex;
		align-items: center;
		color: #a1a1b0;
		transition: color 0.25s ease;
	}

	.brand-icon {
		width: 19px;
		height: 19px;
		fill: currentColor;
	}

	.github-icon {
		--brand-color: #ffffff;
	}

	.youtube-icon {
		--brand-color: #ff0033;
	}

	.bluesky-icon {
		--brand-color: #0085ff;
	}

	.contact-list a:hover .github-icon {
		color: var(--brand-color);
	}

	.contact-list a:hover .youtube-icon {
		color: var(--brand-color);
	}

	.contact-list a:hover .bluesky-icon {
		color: var(--brand-color);
	}

	.contact-list a:hover :global(.arrow) {
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
			grid-template-columns: 20px 84px 18px minmax(0, 1fr) 18px;
			min-height: 68px;
			font-size: 14px;
		}
	}

	@media (max-width: 420px) {
		.contact-list a {
			grid-template-columns: 20px 74px 14px minmax(0, 1fr) 16px;
		}
	}
</style>