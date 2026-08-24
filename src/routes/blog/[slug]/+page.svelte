<script>
    import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { data } = $props();
    import { resolve } from '$app/paths';
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
			href={resolve("/blog")}
			class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#71717a] transition-colors hover:text-[#5be4ff]"
		>
			← Back to blog
		</a>

		<p
			class="text-sm font-medium uppercase tracking-[0.2em]"
			style="color: #5be4ff;"
		>
			{new Date(data.metadata.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</p>

		<h1
			class="mt-4 text-4xl font-bold tracking-tight text-[#f5f5fa] sm:text-5xl"
		>
			{data.metadata.title}
		</h1>

		<p class="mt-5 text-lg leading-relaxed text-[#a1a1aa]">
			{data.metadata.description}
		</p>

		{#if data.metadata.tags}
			<div class="mt-6 flex flex-wrap gap-2">
				{#each data.metadata.tags as tag (tag)}
					<span
						class="rounded-full border border-[#5be4ff]/20 bg-[#5be4ff]/5 px-3 py-1 text-xs font-medium text-[#5be4ff]"
					>
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</header>

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