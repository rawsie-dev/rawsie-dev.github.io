<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
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
	description="Learn more about me, my interest, background and the things I build."
/>

<main>
	<!-- About -->
	<section class="bg-[#0b0b12] px-5 pb-37.5 pt-20 max-[750px]:pb-25 max-[750px]:pt-15">
		<div class="mx-auto grid w-full max-w-275 grid-cols-[0.8fr_1.2fr] gap-25 max-[750px]:relative max-[750px]:block max-[750px]:min-h-175">

			<!-- Logo / Visual -->
			<div
				class="relative flex aspect-square isolate items-center justify-center overflow-hidden rounded-3xl border borborder-white/8-[#0b0b12] max-[750px]:absolute max-[750px]:inset-0 max-[750px]:h-full max-[750px]:w-full max-[750px]:rounded-none max-[750px]:border-0 max-[750px]:opacity-[0.16] max-[750px]:pointer-events-none"
			>
				<Logo class="relative z-1 h-full w-full text-[#5be4ff] max-[750px]:h-[55%] max-[750px]:w-[55%]" />

				<div
					class="absolute -left-10 -top-10 z-0 h-70 w-[28w-70ded-full bg-[rgba(91,228,255,0.15)] blur-[50px]"
				></div>

				<div
					class="absolute -bottom-10 -right-10 z-0 h-70 w-[28w-70ded-full bg-[rgba(255,205,254,0.15)] blur-[50px]"
				></div>
			</div>

			<!-- Text -->
			<div class="relative z-1 max-[750px]:px-0 max-[750px]:py-7.5">
				<p class="mb-6 mt-0 text-[27px] font-bold leading-[1.45] text-white">
					Heya! I'm <span class="text-[#5be4ff]">Rawsie</span>
				</p>

				<div class="space-y-6 text-base leading-[1.8] text-[#888895]">
					<p>
						I'm a student, researcher, and occasional music artist who enjoys understanding
						how things work, finding ways to improve them, and creating things that reflect
						who I am.
					</p>

					<p>
						I am interested in
						<span class="text-[#FFCDFE]">AI research</span>,
						<span class="text-[#FFCDFE]">software development</span>
						and
						<span class="text-[#FFCDFE]">creative music work</span>
						&mdash; a combination you would not expect at first.
					</p>

					<p>
						I enjoy building things that turn ideas into products that I or other people can
						actually use. I love seeing some kind of materialisation of my work into something
						tangible.
					</p>

					<p>
						Outside of research, I like building small websites, games, tools, and other things
						that give me an excuse to learn something new. I also occasionally dabble in some
						music composition just because I feel like it.
					</p>
				</div>
			</div>
		</div>

		<!-- Facts -->
		<div class="mx-auto w-full max-w-275">
			<div class="mt-15 grid grid-cols-3 gap-3.75 max-[750px]:grid-cols-1">
				<div class="border-t border-white/10 pt-5">
					<span class="text-[12px] text-[#5be4ff]">01</span>
					<h3 class="mb-2 mt-3.75 text-[15px] text-white">AI Research</h3>
					<p class="m-0 text-[12px] leading-normal text-[#686875]">
						Exploring how neural networks learn.
					</p>
				</div>

				<div class="border-t border-white/10 pt-5">
					<span class="text-[12px] text-[#5be4ff]">02</span>
					<h3 class="mb-2 mt-3.75 text-[15px] text-white">Software Development</h3>
					<p class="m-0 text-[12px] leading-normal text-[#686875]">
						Learning, experimenting, and building practical products.
					</p>
				</div>

				<div class="border-t border-white/10 pt-5">
					<span class="text-[12px] text-[#5be4ff]">03</span>
					<h3 class="mb-2 mt-3.75 text-[15px] text-white">Creative Work</h3>
					<p class="m-0 text-[12px] leading-normal text-[#686875]">
						Making things that feel like mine, including some music composition.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Timeline -->
	<section class="bg-[#0b0b12] px-5">
		<div class="mx-auto w-full max-w-275">
			<div class="mb-12.5 text-[18px] tracking-[0.15em] text-[#686875]">
				A LITTLE HISTORY
			</div>

			<div class="max-w-200">
				<!-- Now -->
				<div class="grid grid-cols-[100px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[60px_1fr] max-[750px]:gap-5">
					<span class="text-[12px] text-[#5be4ff]">NOW</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">What's next?</h3>
						<p class="m-0 text-[14px] text-[#686875]">Still figuring that part out.</p>
					</div>
				</div>

				<!-- 2026 -->
				<div class="grid grid-cols-[100px_1fr] gap-7.5 border-t  border-white/8 py-7.5 max-[750px]:grid-cols-[60px_1fr] max-[750px]:gap-5">
					<span class="text-[12px] text-[#5be4ff]">2026</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">rawsie.dev</h3>
						<p class="m-0 text-[14px] text-[#686875]">
							Started building and putting my websites, projects, and ideas out into the world.
						</p>
					</div>
				</div>

				<!-- 2025 -->
				<div class="grid grid-cols-[100px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[60px_1fr] max-[750px]:gap-5">
					<span class="text-[12px] text-[#5be4ff]">2025</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">AI research</h3>
						<p class="m-0 text-[14px] text-[#686875]">
							My first real exposure to AI research, and the beginning of wanting to understand
							what happens beyond simply using AI.
						</p>
					</div>
				</div>

				<!-- 2024 -->
				<div class="grid grid-cols-[100px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[60px_1fr] max-[750px]:gap-5">
					<span class="text-[12px] text-[#5be4ff]">2024</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">A new environment</h3>
						<p class="m-0 text-[14px] text-[#686875]">
							Joined High School of the Gifted and started taking my interest in computer
							science more seriously.
						</p>
					</div>
				</div>

				<!-- 2019 -->
				<div class="grid grid-cols-[100px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[60px_1fr] max-[750px]:gap-5">
					<span class="text-[12px] text-[#5be4ff]">2019</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">A small turning point</h3>
						<p class="m-0 text-[14px] text-[#686875]">
							Won my first competitive programming prize. It was small, but it made me realize
							I wanted to keep going.
						</p>
					</div>
				</div>

				<!-- 2017 -->
				<div class="grid grid-cols-[100px_1fr] gap-7.5 border-t border-white/8 py-7.5 max-[750px]:grid-cols-[60px_1fr] max-[750px]:gap-5">
					<span class="text-[12px] text-[#5be4ff]">2017</span>

					<div>
						<h3 class="mb-2 mt-0 text-[20px] text-white">A new beginning</h3>
						<p class="m-0 text-[14px] text-[#686875]">
							My first real exposure to a computer. I had no idea what I was doing, but I've
							been hooked ever since.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<Footer />