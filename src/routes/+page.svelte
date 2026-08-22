<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Footer from '$lib/components/Footer.svelte';
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
	</main>

</div>

<Footer />