<script>
	import { resolve } from '$app/paths';

	let { featuredPosts = [], recentPosts = [] } = $props();
</script>

<main>
    <section class="mx-auto max-w-6xl px-6 py-20">
        <div class="mb-10">
            <p class="text-sm font-medium uppercase tracking-widest text-[#5be4ff]">
                A place for random thoughts.
            </p>

            <h2 class="mt-2 text-4xl font-semibold tracking-tight text-[#f5f5fa] sm:text-5xl">
                Blog
            </h2>
        </div>
    
        <!-- Featured Posts -->
        {#if featuredPosts.length > 0}
            <section class="mx-auto max-w-6xl">
                <div class="mb-8 flex items-center gap-4">
                    <span class="text-sm font-medium text-[#5be4ff]">
                        FEATURED
                    </span>

                    <div class="h-px flex-1 bg-[#27272a]"></div>
                </div>

                <div class="grid gap-6 sm:grid-cols-2">
                    {#each featuredPosts as post (post.slug)}
                        <a
                            href={resolve(`/blog/${post.slug}`)}
                            class="group block rounded-2xl border border-[#27272a] p-6 transition-all hover:border-[#5be4ff]/40 hover:bg-[#5be4ff]/5"
                        >
                            <time datetime={post.metadata.date} class="text-sm text-[#71717a]">
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
        {#if recentPosts.length > 0}
            <section class="mx-auto max-w-6xl py-20">
                <div class="mb-8 flex items-center gap-4">
                    <span class="text-sm font-medium text-[#5be4ff]">
                        LATEST POSTS
                    </span>

                    <div class="h-px flex-1 bg-[#27272a]"></div>
                </div>

                <div class="space-y-4">
                    {#each recentPosts as post (post.slug)}
                        <a
                            href={resolve(`/blog/${post.slug}`)}
                            class="group block rounded-2xl border border-[#27272a] p-6 transition-all hover:border-[#5be4ff]/40 hover:bg-[#5be4ff]/5"
                        >
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
                        </a>
                    {/each}
                </div>

                <div class="mt-8 text-center">
                    <a
                        href={resolve("/blog")}
                        class="text-sm font-medium text-[#5be4ff] transition-colors hover:text-[#f5f5fa]"
                    >
                        View all posts →
                    </a>
                </div>
            </section>
        {/if}
    </section>
</main>