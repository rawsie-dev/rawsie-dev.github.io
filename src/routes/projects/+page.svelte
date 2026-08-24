<script>
    import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import PageHeader from '$lib/components/PageHeader.svelte';
	let { data } = $props();
    import { resolve } from '$app/paths';
</script>

<Navbar />

<svelte:head>
	<title>Projects &mdash; Rawsie</title>
	<meta
		name="description"
		content="A collection of projects, experiments, and things I've built while exploring ideas that interest me."
	/>
</svelte:head>
<PageHeader title="Projects" description="A collection of projects, experiments, and things I've built while exploring ideas that interest me."/>

<main>
	<div class="mx-auto max-w-6xl px-6 py-10">

		<!-- Featured Projects -->
		{#if data.featuredProjects.length > 0}
            <section class="mb-24">
                <div class="mb-8 flex items-center gap-4">
                    <span class="text-sm font-medium text-[#5be4ff]">FEATURED</span>
                    <div class="h-px flex-1 bg-[#27272a]"></div>
                </div>

                <div class="space-y-6">
                    {#each data.featuredProjects as project (project.slug)}
                        <a
                            href={resolve(`/projects/${project.slug}`)}
                            class="group block rounded-2xl border border-[#27272a] p-8 transition-all duration-300 hover:border-[#5be4ff]/40 hover:bg-[#5be4ff]/[0.03] sm:p-10"
                        >
                            <!-- Header -->
                            <div class="flex items-start justify-between gap-6">
                                <time
                                    datetime={project.metadata.date}
                                    class="text-sm text-[#71717a]"
                                >
                                    {new Date(project.metadata.date).toLocaleDateString('en-US', {
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
                                class="mt-8 max-w-4xl text-4xl font-bold tracking-tight text-[#f5f5fa] transition-colors duration-300 group-hover:text-[#5be4ff] sm:text-5xl"
                            >
                                {project.metadata.title}
                            </h2>

                            <!-- Description -->
                            <p class="mt-5 max-w-2xl text-lg leading-relaxed text-[#a1a1aa]">
                                {project.metadata.description}
                            </p>

                            <!-- Summary -->
                            {#if project.metadata.summary}
                                <p class="mt-8 max-w-3xl text-base leading-7 text-[#d4d4d8] whitespace-pre-line">
                                    {project.metadata.summary}
                                </p>
                            {/if}

                            <!-- Divider -->
                            <div class="my-10 h-px bg-[#27272a]"></div>

                            <!-- Bottom -->
                            <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                                {#if project.metadata.tags}
                                    <div class="flex flex-wrap gap-2">
                                        {#each project.metadata.tags as tag (tag)}
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

		<!-- All Projects -->
		<section>
			<div class="mb-8 flex items-center gap-4">
				<span class="text-sm font-medium text-[#5be4ff]">ALL PROJECTS</span>
				<div class="h-px flex-1 bg-[#27272a]"></div>
			</div>

			{#if data.projects.length === 0}
				<p class="text-[#71717a]">
					No projects yet.
				</p>
			{:else}
				<div class="space-y-4">
					{#each data.projects as project (project.slug)}
						<a
							href={resolve(`/projects/${project.slug}`)}
							class="group block rounded-2xl border border-[#27272a] p-6 transition-all hover:border-[#5be4ff]/40 hover:bg-[#5be4ff]/5"
						>
							<article>
								<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
									<time
										datetime={project.metadata.date}
										class="order-1 shrink-0 text-sm text-[#71717a] sm:order-2"
									>
										{new Date(project.metadata.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric'
										})}
									</time>

									<div class="order-2 max-w-3xl sm:order-1">
										<h2 class="text-2xl font-semibold tracking-tight text-[#f5f5fa] transition-colors group-hover:text-[#5be4ff]">
											{project.metadata.title}
										</h2>

										<p class="mt-2 leading-relaxed text-[#a1a1aa]">
											{project.metadata.description}
										</p>

										{#if project.metadata.tags}
											<div class="mt-4 flex flex-wrap gap-2">
												{#each project.metadata.tags as tag (tag)}
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