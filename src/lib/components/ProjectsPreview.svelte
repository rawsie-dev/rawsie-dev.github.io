<script lang="ts">
	import { resolve } from '$app/paths';

	let { featuredProjects = [] } = $props();

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

<main>
    <section 
        class="mx-auto max-w-6xl px-8 py-10 border border-[#f5f5f5]/20 rounded-3xl transition-all duration-300 hover:border-[#38BFA7]/40 hover:bg-[#38BFA7]/3 group/projects hover:-translate-y-4"
        role="link"
        id="projects"
        tabindex="0"
        
        onclick={(event) => {
            const target = event.target;
            if (target instanceof Element && target.closest('a')) return;
            window.location.href = resolve('/projects');
        }}

        onkeydown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.location.href = resolve('/projects');
            }
        }}
    >

        <div class="mb-10">
            <p class="text-sm font-medium uppercase tracking-widest text-[#f5f5f5]">
                Things I've built and experimented with.
            </p>

            <h2 class="mt-2 text-4xl font-semibold tracking-tight text-[#f5f5f5] transition-colors duration-300 group-hover/projects:text-[#38BFA7] sm:text-5xl">
                Projects
            </h2>
        </div>
    
        <!-- Featured Projects -->
		{#if featuredProjects.length > 0}
            <section class="mb-8">
                <div class="mb-8 flex items-center gap-4">
                    <span class="text-sm font-medium text-[#5be4ff]">FEATURED</span>
                    <div class="h-px flex-1 bg-[#27272a]"></div>
                </div>

                <div class="space-y-6">
                    {#each featuredProjects as post (post.slug)}
                        {@const status = statusStyles[post.metadata.status] ?? statusStyles.Archived}
                        <a
                            href={resolve(`/projects/${post.slug}`)}
                            class="group block rounded-2xl border p-8 transition-all duration-300 sm:p-10 hover:-translate-y-2"
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
                                    class="text-xl text-[#71717a] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#5be4ff]"
                                >
                                    ↗
                                </span>
                            </div>

                            <!-- Title -->
                            <h2
                                class="mt-8 max-w-4xl text-4xl font-bold tracking-tight text-[#f5f5f5] transition-colors duration-300 group-hover:text-(--status-color) sm:text-5xl" style={`--status-color: ${status.text}`}
                            >
                                {post.metadata.title}

                                {#if post.metadata.status}
                                        <span
                                            class="inline-block -translate-y-3 rounded-full border px-3 py-1.5 text-xs font-medium"
                                            style="
                                                color: {status.text};
                                                border-color: {status.border};
                                                background-color: {status.background};
                                            "
                                        >
                                            {post.metadata.status}
                                        </span>
                                    {/if}
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
                                    View project →
                                </span>
                            </div>
                        </a>
                    {/each}
                </div>
            </section>
        {/if}

        {#if featuredProjects.length === 0}
            <div class="py-20 text-center">
                <p class="text-[#a1a1aa]">
                    No featured projects yet.
                </p>
            </div>
        {/if}

        <div class="mt-8 text-center">
            <a
                href={resolve("/projects")}
                class="text-sm font-medium text-[#5be4ff] transition-colors hover:text-[#f5f5f5]"
            >
                View all projects →
            </a>
        </div>
    </section>
</main>