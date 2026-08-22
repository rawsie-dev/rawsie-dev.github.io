<script lang="ts">
	import { page } from '$app/state';

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
        // { name: 'Blog', href: '/blog' },
		// { name: 'Contact', href: '/contact' }
	] as const;

	import { resolve } from '$app/paths';
</script>

<nav class:scrolled>
	<div class="nav-inner">
		<a href={resolve("/")} class="logo flex items-center gap-2">
			<svg
				width="512" 
				height="512"
				viewBox="0 0 512 512"
				class="w-10 h-10 text-[#5be4ff] transition-colors duration-200 hover:text-[#FFCDFE]"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="448" y="248" width="64" height="264" fill="currentColor"/>
				<path d="M408 0C465.438 0 512 46.5624 512 104C512 161.438 465.438 208 408 208C364.737 208 327.646 181.583 311.973 144H394V143.989C415.716 143.556 433.187 125.82 433.187 104C433.187 82.1804 415.716 64.443 394 64.0098V64H311.973C327.646 26.4172 364.737 0 408 0Z" fill="currentColor"/>
				<path d="M408 144C465.438 144 512 190.562 512 248C512 291.263 485.583 328.353 448 344.026V248C448 226.243 430.629 208.542 409 208.012V208H311.973C327.646 170.417 364.737 144 408 144Z" fill="currentColor"/>
				<rect width="404" height="64" fill="currentColor"/>
				<path d="M64 144H398V208H64V326H0V0H64V144Z" fill="currentColor"/>
				<rect x="90" y="352" width="86" height="64" fill="currentColor"/>
				<path d="M64 314.187C64 335.173 81.0132 352.187 102 352.187H176.187C165.031 389.216 130.666 416.187 90 416.187C40.2944 416.187 0 375.892 0 326.187C0 285.521 26.9707 251.155 64 240V314.187Z" fill="currentColor"/>
			</svg>

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