<script>
    import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
	let { data } = $props();
    import { resolve } from '$app/paths';
</script>

<Navbar />

<svelte:head>
	<title>Blog — Rawsie</title>
	<meta
		name="description"
		content="A place for random thoughts about whatever happens to interest me and I find worth sharing."
	/>
</svelte:head>
<PageHeader title="Blog" description="A place for random thoughts about whatever happens to interest me and I find worth sharing."/>
<main>
	<div class="mx-auto max-w-5xl px-6 py-20">

		<!-- Posts -->
		<section>
			{#if data.posts.length === 0}
				<p class="text-[#71717a]">
					No posts yet.
				</p>
			{:else}
				<div class="divide-y divide-[#27272a]">
					{#each data.posts as post (post.slug)}
						<article class="group py-8 first:pt-0">
							<a href={resolve(`/blog/${post.slug}`)} class="block">
								<div
									class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
								>
									<div class="max-w-3xl">
										<h2
											class="text-2xl font-semibold tracking-tight text-[#f5f5fa] transition-colors group-hover:text-[#5be4ff]"
										>
											{post.metadata.title}
										</h2>

										<p class="mt-2 leading-relaxed text-[#a1a1aa]">
											{post.metadata.description}
										</p>

										{#if post.metadata.tags}
											<div class="mt-4 flex flex-wrap gap-2">
												{#each post.metadata.tags as tag (tag)}
													<span
														class="rounded-full border border-[#5be4ff]/20 bg-[#5be4ff]/5 px-3 py-1 text-xs font-medium text-[#5be4ff]"
													>
														{tag}
													</span>
												{/each}
											</div>
										{/if}
									</div>

									<time
										datetime={post.metadata.date}
										class="shrink-0 text-sm text-[#71717a]"
									>
										{new Date(post.metadata.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</time>
								</div>
							</a>
						</article>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</main>

<Footer />