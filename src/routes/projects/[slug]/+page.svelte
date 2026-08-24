<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
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

	const status = $derived(
		statusStyles[data.metadata.status] ?? statusStyles.Archived
	);
</script>

<Navbar />

<svelte:head>
	<title>{data.metadata.title} &mdash; Rawsie</title>

	<meta
		name="description"
		content={data.metadata.description}
	/>
</svelte:head>

<article class="mx-auto max-w-5xl px-6 py-20">
	<!-- Header -->
	<header class="mb-12">
		<a
			href={resolve("/projects")}
			class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#71717a] transition-colors hover:text-[#5be4ff]"
		>
			← Back to projects
		</a>

		<p
			class="text-sm font-medium uppercase tracking-[0.2em]" style="color: #5be4ff;"
		>
			{new Date(data.metadata.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

		<div class="mt-4 flex flex-wrap items-center gap-4">
			<h1
				class="text-4xl font-bold tracking-tight text-[#f5f5fa] sm:text-5xl" style="color: {status.text};"
			>
				{data.metadata.title}
			</h1>

			{#if data.metadata.status}
				<span
					class="shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium"
					style="
						color: {status.text};
						border-color: {status.border};
						background-color: {status.background};
					"
				>
					{data.metadata.status}
				</span>
			{/if}
		</div>

		<p class="mt-5 text-lg leading-relaxed text-[#a1a1aa]">
			{data.metadata.description}
		</p>

		{#if data.metadata.summary}
			<div class="mt-8 max-w-3xl">
				<p class="whitespace-pre-line text-base leading-7 text-[#d4d4d8]">
					{data.metadata.summary}
				</p>
			</div>
		{/if}

		<div class="mt-6 flex flex-wrap gap-2">
			{#if data.metadata.tags}
				<!-- <div class="mt-6 flex flex-wrap gap-2"> -->
					{#each data.metadata.tags as tag (tag)}
						<span class="rounded-full border border-[#5be4ff]/20 bg-[#5be4ff]/5 px-3 py-1 text-xs font-medium text-[#5be4ff]" >
							{tag}
						</span>
					{/each}
				<!-- </div> -->
			{/if}
		</div>
	</header>

	<div class="mt-8 border-y border-[#27272a]">
		{#if data.metadata.authors}
			<div class="flex flex-col gap-4 border-b border-[#27272a] py-4 sm:flex-row sm:items-center">
				<span class="flex gap-1 w-20 text-xs font-medium uppercase tracking-[0.15em] text-[#71717a]">
					Author <svg
							class="h-3.5 w-3.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
					>
						<path d="M20 21a8 8 0 0 0-16 0" />
						<circle cx="12" cy="7" r="4" />
					</svg>
				</span>

				<div class="flex flex-wrap gap-x-4 gap-y-1">
					{#each data.metadata.authors as author (author)}
						<span class="text-sm text-[#d4d4d8]">
							{author}
						</span>
					{/each}
				</div>
			</div>
		{/if}

		{#if data.metadata.links}
			<div class="flex flex-col gap-4 py-4 sm:flex-row sm:items-center">
				<span class="flex gap-1 w-20 text-xs font-medium uppercase tracking-[0.15em] text-[#71717a]">
					Links <svg
							class="h-3.5 w-3.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
							<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
						</svg>
				</span>

				<div class="flex flex-wrap gap-x-5 gap-y-2">
					{#each data.metadata.links as link (link.url)}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="group inline-flex items-center gap-1.5 text-sm text-[#d4d4d8] transition-colors hover:text-[#5be4ff]"
						>
							<span>{link.name}</span>
							<span class="text-[#71717a] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
								↗
							</span>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<div class="h-px bg-[#27272a]"></div>

	<!-- Markdown -->
	<div
		class="prose prose-lg mt-12 max-w-none
			prose-headings:font-['Space_Grotesk']
			prose-headings:text-[#f5f5fa]
			prose-p:text-[#a1a1aa]
			prose-strong:text-[#f5f5fa]
			prose-a:text-[#5be4ff]
			prose-a:no-underline
			hover:prose-a:underline
			prose-li:text-[#a1a1aa]
			prose-blockquote:border-[#5be4ff]
			prose-blockquote:text-[#a1a1aa]
			prose-code:text-pink-200
			prose-code:before:content-none
			prose-code:after:content-none
			prose-pre:rounded-xl
			prose-pre:border
			prose-pre:border-[#27272a]
			prose-pre:bg-[#111118]"
	>
		{#if data.content}
			{@const PostContent = data.content}
			<PostContent />
		{/if}
	</div>
</article>

<Footer />