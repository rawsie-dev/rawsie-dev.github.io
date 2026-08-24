<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import Logo from '$lib/components/Logo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>About — Rawsie</title>
	<meta
		name="description"
		content="Learn more about Rawsie, their interests, background, and things they build."
	/>
</svelte:head>

<Navbar />
<PageHeader title="About Me" description="Learn more about Rawsie, their interests, background, and things they build." />
<main>
	<section class="about">
		<div class="container">
			<div class="photo">
                <Logo class="text-[#5be4ff]" />
				<div class="orb cyan"></div>
				<div class="orb pink"></div>
			</div>

			<div class="text">
                <p class="lead font-bold">
                    Heya! I'm <span class="cyan-text">Rawsie</span>
                </p>
                <br />
                <p>
                    I'm a student, researcher, and builder who likes understanding how things work, and then trying to make them better.
                </p>
                <br />
                <p>
                    I am interested in <span class="pink-text">AI research</span> and <span class="pink-text">software development</span>. 
                    I enjoy building things that turn ideas into products that I or other people can actually use. 
                </p>
                <br />
				<p>
					Outside of research, I like building small websites, games, tools, and other things that give me an excuse to learn something <span class="cyan-text">new</span>.
				</p>

				<div class="facts">
                    <div>
						<span>01</span>
						<h3>AI Research</h3>
						<p>Exploring how neural networks learn.</p>
					</div>

					<div>
						<span>02</span>
						<h3>Software Development</h3>
						<p>Learning, experimenting, and building practical products.</p>
					</div>

					<div>
						<span>03</span>
						<h3>Creative Work</h3>
						<p>Making things that feel like mine, including some music composition.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="timeline">
		<div class="container">
			<div class="section-label">A LITTLE HISTORY</div>

			<div class="timeline-list">
                <div class="item">
					<span>NOW</span>
					<div>
						<h3>What's next?</h3>
						<p>Still figuring that part out.</p>
					</div>
				</div>

                <div class="item">
					<span>2026</span>
					<div>
						<h3>rawsie.dev</h3>
						<p>Started building and putting my websites, projects, and ideas out into the world.</p>
					</div>
				</div>

				<div class="item">
					<span>2025</span>
					<div>
						<h3>AI research</h3>
						<p>My first real exposure to AI research, and the beginning of wanting to understand what happens beyond simply using AI.</p>
					</div>
				</div>

				<div class="item">
                    <span>2024</span>
                    <div>
                        <h3>A new environment</h3>
                        <p>
                            Joined High School of the Gifted and started taking my interest in computer science more seriously.
                        </p>
                    </div>
                </div>

                <div class="item">
                    <span>2019</span>
                    <div>
                        <h3>A small turning point</h3>
                        <p>Won my first competitive programming prize. It was small, but it made me realize I wanted to keep going.</p>
                    </div>
                </div>

                <div class="item">
                    <span>2017</span>
                    <div>
                        <h3>A new beginning</h3>
                        <p>My first real exposure to a computer. I had no idea what I was doing, but I've been hooked ever since.</p>
                    </div>
                </div>
            </div>
		</div>
	</section>
</main>

<Footer />

<style>
	.about {
		padding: 80px 0 150px;
		background: #0b0b12;
	}

	.container {
		width: min(1100px, calc(100% - 40px));
		margin: auto;

		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: 100px;
	}

	.photo {
		position: relative;

		aspect-ratio: 1;

		display: flex;
		align-items: center;
		justify-content: center;

		overflow: hidden;
        isolation: isolate;

		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 24px;

		background: #0b0b12;
	}

	.orb {
        position: absolute;

        width: 280px;
        height: 280px;

        border-radius: 50%;
        filter: blur(50px);
        z-index: 0;
    }

    .orb.cyan {
        top: -40px;
        left: -40px;
        background: rgba(91, 228, 255, 0.15);
    }

    .orb.pink {
        right: -40px;
        bottom: -40px;
        background: rgba(255, 205, 254, 0.15);
    }

	.text .lead {
		margin-top: 0;

		color: white;

		font-size: 27px;
		line-height: 1.45;

	}

	.text > p {
		color: #888895;
		font-size: 16px;
		line-height: 1.8;
	}

	.facts {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15px;

		margin-top: 60px;
	}

	.facts > div {
		padding-top: 20px;

		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.facts span {
		color: #5be4ff;
		font-size: 10px;
	}

	.facts h3 {
		margin: 15px 0 8px;

		color: white;
		font-size: 15px;
	}

	.facts p {
		margin: 0;
		color: #686875;
		font-size: 12px;
		line-height: 1.5;
	}

	.timeline {
		padding: 0px 0;
		background: #0b0b12;
	}

	.section-label {
		margin-bottom: 50px;

		color: #686875;
		font-size: 18px;
		letter-spacing: 0.15em;
	}

	.timeline-list {
		max-width: 800px;
	}

	.item {
		display: grid;
		grid-template-columns: 100px 1fr;
		gap: 30px;

		padding: 30px 0;

		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.item > span {
		color: #5be4ff;
		font-size: 12px;
	}

	.item h3 {
		margin: 0 0 8px;

		color: white;
		font-size: 20px;
	}

	.item p {
		margin: 0;

		color: #686875;
		font-size: 14px;
	}

	@media (max-width: 750px) {
		.container {
			grid-template-columns: 1fr;
			gap: 50px;
		}

		.facts {
			grid-template-columns: 1fr;
		}
	}
</style>