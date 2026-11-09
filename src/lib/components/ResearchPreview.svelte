<script>
	import { resolve } from '$app/paths';

	let { featuredResearch = [] } = $props();
</script>

<main>
    <section 
        class="mx-auto max-w-6xl px-8 py-10 border border-[#f5f5f5]/20 rounded-3xl transition-all duration-300 hover:border-[#FF9F43]/40 hover:bg-[#FF9F43]/3 group/research hover:-translate-y-4"
        role="link"
        id="projects"
        tabindex="0"
        
        onclick={(event) => {
            const target = event.target;
            if (target instanceof Element && target.closest('a')) return;
            window.location.href = resolve('/research');
        }}

        onkeydown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.location.href = resolve('/research');
            }
        }}
    >
        <div class="mb-10">
            <p class="text-sm font-medium uppercase tracking-widest text-[#f5f5f5]">
                Questions I've explored and investigated.
            </p>

            <h2 class="mt-2 text-4xl font-semibold tracking-tight text-[#f5f5f5] transition-colors duration-300 group-hover/research:text-[#FF9F43] sm:text-5xl">
                Research
            </h2>
        </div>
    
        <!-- Featured Research -->
		{#if featuredResearch.length > 0}
            <section class="mb-8">
                <div class="mb-8 flex items-center gap-4">
                    <span class="text-sm font-medium text-[#5be4ff]">FEATURED</span>
                    <div class="h-px flex-1 bg-[#27272a]"></div>
                </div>

                <div class="space-y-6">
                    {#each featuredResearch as post (post.slug)}
                        <a
                            href={resolve(`/research/${post.slug}`)}
                            class="group block rounded-2xl border border-[#27272a] p-8 transition-all duration-300 hover:border-[#5be4ff]/40 hover:bg-[#5be4ff]/3 sm:p-10 hover:-translate-y-2"
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
                                    class="text-xl text-[#71717a] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#5be4ff]"
                                >
                                    ↗
                                </span>
                            </div>

                            <!-- Title -->
                            <h2
                                class="mt-8 max-w-4xl text-4xl font-bold tracking-tight text-[#f5f5f5] transition-colors duration-300 group-hover:text-[#5be4ff] sm:text-5xl"
                            >
                                {post.metadata.title}
                            </h2>

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


        {#if featuredResearch.length === 0}
            <div class="py-20 text-center">
                <p class="text-[#a1a1aa]">
                    No featured research yet.
                </p>
            </div>
        {/if}

        <div class="mt-8 text-center">
            <a
                href={resolve("/research")}
                class="text-sm font-medium text-[#5be4ff] transition-colors hover:text-[#f5f5f5]"
            >
                View all research →
            </a>
        </div>
    </section>
</main>