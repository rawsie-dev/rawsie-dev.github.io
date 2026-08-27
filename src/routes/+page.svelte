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

<div class="site">
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