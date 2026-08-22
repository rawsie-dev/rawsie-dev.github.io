<script>
	import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Contact — Rawsie</title>
</svelte:head>

<Navbar />

<main>
	<section class="contact">
		<div class="container">
			<div class="main-contact">
				<span class="label">GET IN TOUCH</span>

				<a class="email cyan-text" href="mailto:me@rawsie.dev">
					me@rawsie.dev
					<span>↗</span>
				</a>
			</div>

			<div class="socials">
				<a href="https://github.com/rawsie-dev">
					<span>01</span>
					GitHub
					<span>↗</span>
				</a>

				<a href="mailto:me@rawsie.dev">
					<span>02</span>
					Email
					<span>↗</span>
				</a>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	.contact {
		padding: 50px 0 180px;

		background: #0b0b12;
	}

	.container {
		width: min(1100px, calc(100% - 40px));
		margin: auto;
	}

	.main-contact {
		padding: 60px 0;

		border-top: 1px solid rgba(255, 255, 255, 0.08);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.label {
		color: #686875;
		font-size: 13px;
		letter-spacing: 0.15em;
	}

	.email {
		display: flex;
		align-items: center;
		justify-content: space-between;

		margin-top: 30px;

		font-family: 'Space Grotesk', sans-serif;
		font-size: clamp(30px, 6vw, 70px);
		letter-spacing: -0.05em;
		text-decoration: none;

		transition: color 0.2s ease;
	}

	.email:hover {
		color: white;
	}

	.email span {
		font-family: Inter, sans-serif;
		font-size: 30px;
	}

	.socials {
		margin-top: 70px;
	}

	.socials a {
		display: grid;
		grid-template-columns: 60px 1fr 30px;
		align-items: center;

		padding: 25px 0;

		border-bottom: 1px solid rgba(255, 255, 255, 0.07);

		color: white;

		font-size: 17px;
		text-decoration: none;
	}

	.socials a:first-child {
		border-top: 1px solid rgba(255, 255, 255, 0.07);
	}

	.socials a > span:first-child {
		color: #686875;
		font-size: 10px;
	}

	.socials a > span:last-child {
		color: #686875;
	}

	.socials a:hover > span:last-child {
		color: #5be4ff;
	}
</style>