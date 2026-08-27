<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import BlogPreview from '$lib/components/BlogPreview.svelte';
	import ProjectsPreview from '$lib/components/ProjectsPreview.svelte';
	import ResearchPreview from '$lib/components/ResearchPreview.svelte';

	let { data } = $props();

	// import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Rawsie</title>
	<meta
		name="description"
		content="Rawsie's personal website, including projects, researches, blogs, random thoughts, contact info and more."
	/>
</svelte:head>

<div class="site relative">

	<div class="pointer-events-none absolute inset-0 overflow-hidden z-10">
		<div class="glow cyan absolute left-1/2 top-127.5 -translate-x-1/2 -translate-y-1/2"></div>
		<div class="glow pink absolute left-1/2 top-155 -translate-x-1/2 -translate-y-1/2"></div>
	</div>

	<Navbar />
	<main>
		<Hero />
		<div class="my-20 h-px bg-[#27272a]"></div>
		<BlogPreview featuredPosts={data.featuredPosts} recentPosts={data.recentPosts} />
		<div class="my-20 h-px bg-[#27272a]"></div>
		<ProjectsPreview featuredProjects={data.featuredProjects} />
		<div class="my-20 h-px bg-[#27272a]"></div>
		<ResearchPreview featuredResearch={data.featuredResearch} />
		<div class="my-10 h-px"></div>
	</main>

</div>

<Footer />

<style>
    .glow {
		position: absolute;
		width: 900px;
		height: 900px;
		border-radius: 50%;
		pointer-events: none;
	}

	.glow.cyan {
		background: radial-gradient(
			circle,
			rgba(91, 228, 255, 0.07) 0%,
			rgba(91, 228, 255, 0.035) 30%,
			rgba(91, 228, 255, 0.01) 55%,
			transparent 75%
		);
	}

	.glow.pink {
		background: radial-gradient(
			circle,
			rgba(255, 205, 254, 0.06) 0%,
			rgba(255, 205, 254, 0.03) 30%,
			rgba(255, 205, 254, 0.01) 55%,
			transparent 75%
		);
	}

</style>