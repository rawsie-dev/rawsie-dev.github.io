<script lang="ts">
	import { page } from '$app/state';
	import Logo from '$lib/components/Logo.svelte';

	let scrolled = $state(false);

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			scrolled = window.scrollY > 20;
		});
	}

	const links = [
		{ name: 'About', href: '/about' },
		// { name: 'Work', href: '/work' },
		// { name: 'Research', href: '/research' },
        { name: 'Blog', href: '/blog' },
		// { name: 'Contact', href: '/contact' }
	] as const;

	import { resolve } from '$app/paths';
</script>

<nav class:scrolled>
	<div class="nav-inner">
		<a href={resolve("/")} class="logo flex items-center gap-2">
			<Logo class="w-10 h-10 text-[#5be4ff] group-hover:text-[#FFCDFE] transition-colors duration-300" />

			<span class="font-fredoka">RAWSIE</span>
		</a>
		<div class="links">
			{#each links as link (link.href)}
				<a
					href={resolve(link.href)}
					class:active={page.url.pathname.startsWith(link.href)}
				>
					{link.name}
				</a>
			{/each}
		</div>

		<div class="status">
			<span class="dot"></span>
			<span>building</span>
		</div>
	</div>
</nav>

<style>
	.font-fredoka {
        font-family: 'Fredoka', sans-serif;
        font-weight: 700;
		font-size: 28px;
    }

	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100;

		border-bottom: 1px solid transparent;

		transition:
			background 0.3s ease,
			backdrop-filter 0.3s ease,
			border-color 0.3s ease;
	}

	nav.scrolled {
		background: rgba(11, 11, 18, 0.72);
		backdrop-filter: blur(16px);
		border-bottom-color: rgba(255, 255, 255, 0.07);
	}

	.nav-inner {
		width: min(1200px, calc(100% - 40px));
		height: 72px;
		margin: auto;

		display: flex;
		align-items: center;
		gap: 40px;
	}

	.logo {
		color: white;
		font-size: 16px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-decoration: none;
	}

	.links {
		display: flex;
		gap: 28px;
		margin-left: auto;
	}

	.links a {
		position: relative;

		color: #888895;
		font-size: 14px;
		text-decoration: none;

		transition: color 0.2s ease;
	}

	.links a:hover,
	.links a.active {
		color: white;
	}

	.links a.active::after {
		content: '';

		position: absolute;
		left: 0;
		right: 0;
		bottom: -7px;

		height: 1px;
		background: #5be4ff;
	}

	.status {
		display: flex;
		align-items: center;
		gap: 7px;

		color: #686875;
		font-size: 11px;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;

		background: #5be4ff;
		box-shadow: 0 0 10px rgba(91, 228, 255, 0.7);
	}

	@media (max-width: 700px) {
		.links {
			display: none;
		}

		.status {
			margin-left: auto;
		}
	}
</style>