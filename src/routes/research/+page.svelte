<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
	let { data } = $props();
    import { resolve } from '$app/paths';

    const statusStyles: Record<string, {
        text: string;
        border: string;
        background: string;
    }> = {
        Completed: {
            text: '#86efac',
            border: '#86efac40',
            background: '#86efac08'
        },
        Ongoing: {
            text: '#fde68a',
            border: '#fde68a40',
            background: '#fde68a08'
        },
        Archived: {
            text: '#71717a',
            border: '#71717a40',
            background: '#71717a08'
        }
    };
</script>

<Navbar />

<svelte:head>
	<title>Research &mdash; Rawsie</title>
	<meta
		name="description"
		content="A collection of research, experiments, and ideas I've explored while learning more about AI and computer science."
	/>
</svelte:head>
<PageHeader title="Research" description="A collection of research, experiments, and ideas I've explored while learning more about AI and computer science."/>

<main>
	<div class="mx-auto max-w-6xl px-6 py-10">

		<!-- Featured Research -->
		{#if data.featuredResearch.length > 0}
            <section class="mb-24">
                <div class="mb-8 flex items-center gap-4">
                    <span class="text-sm font-medium text-[#5be4ff]">FEATURED</span>
                    <div class="h-px flex-1 bg-[#27272a]"></div>
                </div>

                <div class="space-y-6">
                    {#each data.featuredResearch as post (post.slug)}
                        {@const status = statusStyles[post.metadata.status] ?? statusStyles.Archived}
                        <a
                            href={resolve(`/research/${post.slug}`)}
                            class="group block rounded-2xl border p-8 transition-all duration-300 sm:p-10"
                            style="
                                border-color: {status.border};
                                background-color: {status.background};
                            "
                        >
                        
                            <!-- Header -->
                            <div class="flex items-start justify-between gap-6">
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
                                <span
                                    class="text-xl text-[#71717a] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                    style="--status-color: {status.text}"
                                >
                                    ↗
                                </span>
                            </div>

                            <!-- Title -->
                            <div class="flex flex-wrap items-center gap-4">
                                <h2
                                    class="mt-8 max-w-4xl text-4xl font-bold tracking-tight text-[#f5f5fa] transition-colors duration-300 group-hover:text-(--status-color) sm:text-5xl" style={`--status-color: ${status.text}`}
                                >
                                    {post.metadata.title}
                                </h2>
                                {#if post.metadata.status}
                                    <span
                                        class="translate-y-4 rounded-full border px-3 py-1.5 text-xs font-medium"
                                        style="
                                            color: {status.text};
                                            border-color: {status.border};
                                            background-color: {status.background};
                                        "
                                    >
                                        {post.metadata.status}
                                    </span>
                                {/if}
                            </div>

                            <!-- Description -->
                            <p class="mt-5 max-w-2xl text-lg leading-relaxed text-[#a1a1aa]">
                                {post.metadata.description}
                            </p>

                            <!-- Summary -->
                            {#if post.metadata.summary}
                                <p class="mt-8 max-w-3xl text-base leading-7 text-[#d4d4d8] whitespace-pre-line">
                                    {post.metadata.summary}
                                </p>
                            {/if}

                            <!-- Divider -->
                            <div class="my-10 h-px bg-[#27272a]"></div>

                            <!-- Bottom -->
                            <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                                {#if post.metadata.tags}
                                    <div class="flex flex-wrap gap-2">
                                        {#each post.metadata.tags as tag (tag)}
                                            <span
                                                class="rounded-full border border-[#5be4ff]/20 bg-[#5be4ff]/5 px-3 py-1 text-xs font-medium text-[#5be4ff]"
                                            >
                                                {tag}
                                            </span>
                                        {/each}
                                    </div>
                                {/if}

                                <span
                                    class="shrink-0 text-sm text-[#71717a] transition-colors group-hover:text-[#5be4ff]"
                                >
                                    View research →
                                </span>
                            </div>
                        </a>
                    {/each}
                </div>
            </section>
        {/if}

		<!-- All Research -->
		<section>
			<div class="mb-8 flex items-center gap-4">
				<span class="text-sm font-medium text-[#5be4ff]">ALL PROJECTS</span>
				<div class="h-px flex-1 bg-[#27272a]"></div>
			</div>

			{#if data.research.length === 0}
				<p class="text-[#71717a]">
					No research yet.
				</p>
			{:else}
				<div class="space-y-4">
					{#each data.research as post (post.slug)}
						{@const status = statusStyles[post.metadata.status] ?? statusStyles.Archived}

                        <a
                            href={resolve(`/research/${post.slug}`)}
                            class="group block rounded-2xl border p-6 transition-all duration-300"
                            style="
                                border-color: {status.border};
                                background-color: {status.background};
                            "
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
                                        <div class="flex flex-wrap items-center gap-3">
                                            <h2 class="text-2xl font-semibold tracking-tight text-[#f5f5fa] transition-colors group-hover:text-(--status-color)" style={`--status-color: ${status.text}`}>
                                                {post.metadata.title}
                                            </h2>
                                            {#if post.metadata.status}
                                                <span
                                                    class="rounded-full border px-3 py-1 text-xs font-medium"
                                                    style="
                                                        color: {status.text};
                                                        border-color: {status.border};
                                                        background-color: {status.background};
                                                    "
                                                >
                                                    {post.metadata.status}
                                                </span>
                                            {/if}
                                        </div>

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