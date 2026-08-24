<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import BlogPreview from '$lib/components/BlogPreview.svelte';
	import ProjectsPreview from '$lib/components/ProjectsPreview.svelte';

	let { data } = $props();

	// import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Rawsie</title>
	<meta
		name="description"
		content="Rawsie's personal website — projects, research, blogs and sometimes random things."
	/>
</svelte:head>

<div class="site">
	<Navbar />
	<main>
		<Hero />
		<BlogPreview featuredPosts={data.featuredPosts} recentPosts={data.recentPosts} />
		<ProjectsPreview featuredProjects={data.featuredProjects} />
	</main>

</div>

<Footer />