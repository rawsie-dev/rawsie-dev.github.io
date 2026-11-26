<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>About &mdash; Rawsie</title>
	<meta
		name="description"
		content="Learn more about me, my interest, background and the things I build."
	/>
</svelte:head>

<Navbar />

<PageHeader
	title="About Me"
	description="Learn more about me, my interests, background and the things I build."
/>

<main>
	<!-- About -->
	<section class="bg-[#0b0b12] px-5 pb-15 pt-10 max-[750px]:pb-10 max-[750px]:pt-8">
		<div class="mx-auto grid w-full max-w-275 grid-cols-[0.8fr_1.2fr] gap-25 max-[750px]:relative max-[750px]:block max-[750px]:min-h-175">

			<!-- Logo / Visual -->
			<div class="relative flex aspect-square isolate items-center justify-center overflow-hidden rounded-3xl border border-white/8 max-[750px]:absolute max-[750px]:inset-0 max-[750px]:h-full max-[750px]:w-full max-[750px]:rounded-none max-[750px]:border-0 max-[750px]:opacity-[0.16] max-[750px]:pointer-events-none">
				<Logo class="relative z-1 h-full w-full text-[#5be4ff] max-[750px]:h-[55%] max-[750px]:w-[55%]" />

				<div class="absolute -left-10 -top-10 z-0 h-70 w-70 rounded-full bg-[rgba(91,228,255,0.15)] blur-[50px]"></div>

				<div class="absolute -bottom-10 -right-10 z-0 h-70 w-70 rounded-full bg-[rgba(255,205,254,0.15)] blur-[50px]"></div>
			</div>

			<!-- Text -->
			<div class="relative z-1 max-[750px]:px-0 max-[750px]:py-7.5">
				<p class="mb-6 mt-0 text-[27px] font-bold leading-[1.45] text-white">
					Heya! I'm <span class="text-[#5be4ff]">Rawsie</span>
				</p>

				<div class="space-y-6 text-base leading-[1.8] text-[#a6a6b5]">
					<p>
						I'm a student, researcher, and occasional music artist who enjoys understanding how things work and making things of my own.
					</p>

					<p>
						I am particularly interested in
						<span class="text-[#FFCDFE]">AI research</span>,
						<span class="text-[#FFCDFE]">software development</span>
						and
						<span class="text-[#FFCDFE]">music composition</span>, which is a combination you would not expect at first.
					</p>

					<p>
						I especially enjoy turning ideas into products that I or other people can actually use. There's something satisfying about seeing an idea take shape into something tangible.
					</p>

					<p>
						Outside of research, I spend time building small websites, games, tools, playing piano and occasionally dabbling in some music composition.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- few things about me -->
	<section class="bg-[#0b0b12] px-5 pb-15">
		<div class="mx-auto w-full max-w-275">
			<div class="mb-3 text-[18px] tracking-widest text-[#a3a3b6]">
				A few things about me
			</div>
			<div class="mt-3 grid grid-cols-2 gap-3.75 max-[750px]:grid-cols-1">
				<div class="about-card border-t border-white/10 pt-5 pb-5">
					<h3 class="mb-2 mt-3.75 text-[18px] text-white">Music person</h3>
					<p class="m-0 text-[14px] leading-normal text-[#a3a3b6]">
						I've been playing piano for years, but only started composing my own music more recently.
					</p>
				</div>

				<div class="about-card border-t border-white/10 pt-5 pb-5">
					<h3 class="mb-2 mt-3.75 text-[18px] text-white">Math nerd wannabe</h3>
					<p class="m-0 text-[14px] leading-normal text-[#a3a3b6]">
						I'm not the best at math, but I find abstract concepts like topology, enormous numbers (Graham's number, TREE(3), and so on), and problems like the Collatz Conjecture fascinating.
					</p>
				</div>

				<div class="about-card border-t border-white/10 pt-5 pb-5">
					<h3 class="mb-2 mt-3.75 text-[18px] text-white">Wplace</h3>
					<p class="m-0 text-[14px] leading-normal text-[#a3a3b6]">
						I occasionally enjoy pixel painting on <a href="https://wplace.live" class="text-[#5be4ff] transition-colors duration-200 hover:underline" target="_blank" rel="noopener noreferrer">Wplace</a>.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Timeline -->
	<section class="bg-[#0b0b12] px-5 pb-15">
		<div class="mx-auto w-full max-w-275">
			<div class="mb-3 text-[18px] tracking-[0.15em] text-[#a3a3b6]">
				THE JOURNEY SO FAR
			</div>

			<div class="max-w-200">
				<!-- Now -->
				<div class="about-card grid grid-cols-[110px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[65px_1fr] max-[750px]:gap-4">
					<span class="pt-1 text-[15px] font-medium tracking-[0.3em] text-[#5be4ff]">NOW</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">What's next?</h3>
						<p class="m-0 text-[14px] text-[#a3a3b6]">Still figuring that part out.</p>
					</div>
				</div>

				<!-- 2026 -->
				<div class="about-card grid grid-cols-[110px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[65px_1fr] max-[750px]:gap-4">
					<span class="pt-1 text-[15px] font-medium tracking-[0.3em] text-[#5be4ff]">2026</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">rawsie.dev</h3>
						<p class="m-0 text-[14px] text-[#a3a3b6]">
							Started building and putting my websites, projects, and ideas out into the world, particularly through this nifty website <a href={resolve(`/`)} class="text-[#5be4ff] transition-colors duration-200 hover:underline" target="_blank" rel="noopener noreferrer">rawsie.dev</a>.
						</p>
					</div>
				</div>

				<!-- 2025 -->
				<div class="about-card grid grid-cols-[110px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[65px_1fr] max-[750px]:gap-4">
					<span class="pt-1 text-[15px] font-medium tracking-[0.3em] text-[#5be4ff]">2025</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">First AI Research</h3>
						<p class="m-0 text-[14px] text-[#a3a3b6]">
							My first real exposure to AI research, exploring lightweight synthetic image detection. Eventually got the paper published at MediaEval 2025. 
							More info can be found <a href={resolve(`/research/synthetic-image-detection`)} class="text-[#5be4ff] transition-colors duration-200 hover:underline" target="_blank" rel="noopener noreferrer">here</a>.
						</p>
					</div>
				</div>

				<!-- 2024 -->
				<div class="about-card grid grid-cols-[110px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[65px_1fr] max-[750px]:gap-4">
					<span class="pt-1 text-[15px] font-medium tracking-[0.3em] text-[#5be4ff]">2024</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">A New Environment</h3>
						<p class="m-0 text-[14px] text-[#a3a3b6]">
							Joined VNU-HCM High School of the Gifted (PTNK) and started taking my interest in Computer
							Science more seriously.
						</p>
					</div>
				</div>

				<!-- 2019 -->
				<div class="about-card grid grid-cols-[110px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[65px_1fr] max-[750px]:gap-4">
					<span class="pt-1 text-[15px] font-medium tracking-[0.3em] text-[#5be4ff]">2019</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">A Small Turning Point</h3>
						<p class="m-0 text-[14px] text-[#a3a3b6]">
							Won my first competitive programming prize. It was small, but it made me realize
							Computer Science was something I wanted to pursue.
						</p>
					</div>
				</div>

				<!-- 2017 -->
				<div class="about-card grid grid-cols-[110px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[65px_1fr] max-[750px]:gap-4">
					<span class="pt-1 text-[15px] font-medium tracking-[0.3em] text-[#5be4ff]">2017</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">A New Beginning</h3>
						<p class="m-0 text-[14px] text-[#a3a3b6]">
							My first real exposure to a computer. I had no idea what I was doing, but I've
							been hooked ever since.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="bg-[#0b0b12] px-5 pb-15">
		<div class="mx-auto w-full max-w-275">
			<div class="mb-1 text-[18px] tracking-[0.15em] text-[#a3a3b6]">
				CURRENTLY
			</div>
			<div class="mt-3 grid grid-cols-2 gap-3.75 max-[750px]:grid-cols-1">
				<div class="about-card border-t border-white/10 pt-5 pb-5">
					<h3 class="mb-2 mt-3.75 text-[18px] text-white">Writing music</h3>
					<p class="m-0 text-[14px] leading-normal text-[#a3a3b6]">
						Working on new songs and experimenting with more unique musical ideas.
					</p>
				</div>

				<div class="about-card border-t border-white/10 pt-5 pb-5">
					<h3 class="mb-2 mt-3.75 text-[18px] text-white">Building</h3>
					<p class="m-0 text-[14px] leading-normal text-[#a3a3b6]">
						Developing <a href={resolve(`/`)} class="text-[#5be4ff] transition-colors duration-200 hover:underline" target="_blank" rel="noopener noreferrer">rawsie.dev</a> and working on personal software projects.
					</p>
				</div>

				<div class="about-card border-t border-white/10 pt-5 pb-5">
					<h3 class="mb-2 mt-3.75 text-[18px] text-white">Applying</h3>
					<p class="m-0 text-[14px] leading-normal text-[#a3a3b6]">
						Making my way through the university application season.
					</p>
				</div>
			</div>
		</div>
	</section>

	

</main>

<Footer />

<style>
	.about-card {
		transition:
			transform 180ms ease-out,
			border-color 180ms ease-out;
	}

	.about-card:hover {
		transform: translateY(-4px);
		border-color: rgb(255 255 255 / 0.2);
	}

	@media (prefers-reduced-motion: reduce) {
		.about-card {
			transition: none;
		}

		.about-card:hover {
			transform: none;
		}
	}
</style>
