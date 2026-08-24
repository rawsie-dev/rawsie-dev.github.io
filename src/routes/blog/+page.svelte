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
    <div class="mx-auto max-w-6xl px-6">

		<!-- Featured Posts -->
		{#if data.featuredPosts.length > 0}
			<section class="mb-20">
				<div class="mb-8 flex items-center gap-4">
					<span class="text-sm font-medium text-[#5be4ff]">FEATURED</span>
					<div class="h-px flex-1 bg-[#27272a]"></div>
				</div>

				<div class="grid gap-6 sm:grid-cols-2">
					{#each data.featuredPosts as post (post.slug)}
						<a
							href={resolve(`/blog/${post.slug}`)}
							class="group rounded-2xl border border-[#27272a] p-6 transition-all hover:border-[#5be4ff]/40 hover:bg-[#5be4ff]/5"
						>
							<time
								datetime={post.metadata.date}
								class="text-sm text-[#71717a]"
							>
								{new Date(post.metadata.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>

							<h2 class="mt-3 text-2xl font-semibold tracking-tight text-[#f5f5fa] transition-colors group-hover:text-[#5be4ff]">
								{post.metadata.title}
							</h2>

							<p class="mt-2 leading-relaxed text-[#a1a1aa]">
								{post.metadata.description}
							</p>

							{#if post.metadata.tags}
								<div class="mt-4 flex flex-wrap gap-2">
									{#each post.metadata.tags as tag (tag)}
										<span class="rounded-full border border-[#5be4ff]/20 bg-[#5be4ff]/5 px-3 py-1 text-xs font-medium text-[#5be4ff]">
											{tag}
										</span>
									{/each}
								</div>
							{/if}
						</a>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Normal Posts -->
        <section>
            <div class="mb-8 flex items-center gap-4">
                <span class="text-sm font-medium text-[#5be4ff]">ALL POSTS</span>
                <div class="h-px flex-1 bg-[#27272a]"></div>
            </div>
            {#if data.posts.length === 0}
                <p class="text-[#71717a]">
                    No posts yet.
                </p>
            {:else}
                <div class="space-y-4">
                    {#each data.posts as post (post.slug)}
                        <a
                            href={resolve(`/blog/${post.slug}`)}
                            class="group block rounded-2xl border border-[#27272a] p-6 transition-all hover:border-[#5be4ff]/40 hover:bg-[#5be4ff]/5"
                        >
                            <article>
                                <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <time
                                        datetime={post.metadata.date}
                                        class="order-1 shrink-0 text-sm text-[#71717a] sm:order-2"
                                    >
                                        {new Date(post.metadata.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>

                                    <div class="order-2 max-w-3xl sm:order-1">
                                        <h2 class="text-2xl font-semibold tracking-tight text-[#f5f5fa] transition-colors group-hover:text-[#5be4ff]">
                                            {post.metadata.title}
                                        </h2>

                                        <p class="mt-2 leading-relaxed text-[#a1a1aa]">
                                            {post.metadata.description}
                                        </p>

                                        {#if post.metadata.tags}
                                            <div class="mt-4 flex flex-wrap gap-2">
                                                {#each post.metadata.tags as tag (tag)}
                                                    <span class="rounded-full border border-[#5be4ff]/20 bg-[#5be4ff]/5 px-3 py-1 text-xs font-medium text-[#5be4ff]">
                                                        {tag}
                                                    </span>
                                                {/each}
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            </article>
                        </a>
                    {/each}
                </div>
            {/if}
        </section>
	</div>
</main>

<Footer />