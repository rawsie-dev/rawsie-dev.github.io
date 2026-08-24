<script>
	// import { page } from '$app/state';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>404 — Rawsie</title>
</svelte:head>

<Navbar />

<main>
	<section class="error">
		<div class="glow cyan"></div>
		<div class="glow pink"></div>

		<div class="content">
			<div class="code">404</div>

			<h1>
				Looks like<br />
				you're <span>lost.</span>
			</h1>

			<p>
				The page you're looking for doesn't seem to exist.
			</p>

			<a href={resolve("/")}>Take me home ↗</a>
		</div>
	</section>
</main>

<Footer />

<style>
	.error {
		position: relative;

		min-height: 85vh;

		display: flex;
		align-items: center;
		justify-content: center;

		overflow: hidden;

		background: #0b0b12;
	}

	.content {
		position: relative;
		z-index: 2;

		width: min(800px, calc(100% - 40px));

		text-align: center;
	}

	.code {
		margin-bottom: 25px;

		color: #5be4ff;

		font-family: 'Space Grotesk', sans-serif;
		font-size: 14px;
		letter-spacing: 0.2em;
	}

	h1 {
		margin: 0;

		color: white;

		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(60px, 10vw, 120px);
		line-height: 0.9;
		letter-spacing: -0.06em;
	}

	h1 span {
		color: #ffcdfe;
	}

	p {
		margin: 35px auto;

		color: #888895;
		font-size: 18px;
	}

	a {
		display: inline-block;

		padding: 13px 20px;

		border: 1px solid rgba(91, 228, 255, 0.25);
		border-radius: 100px;

		color: #5be4ff;
		font-size: 13px;
		text-decoration: none;
	}

	a:hover {
		background: rgba(91, 228, 255, 0.08);
	}

	.glow {
		position: absolute;

		width: 450px;
		height: 450px;

		border-radius: 50%;
		filter: blur(120px);
	}

	.glow.cyan {
		top: -200px;
		left: -150px;
		background: rgba(91, 228, 255, 0.08);
	}

	.glow.pink {
		right: -150px;
		bottom: -200px;
		background: rgba(255, 205, 254, 0.08);
	}
</style>