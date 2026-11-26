<script>
	import { Copy, Check } from '@lucide/svelte';

	let copied = $state(false);

	async function copyDiscord() {
		await navigator.clipboard.writeText('rawsie.dev');
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

<footer id="contact" class="border-t border-white/7 bg-[#0b0b12] px-5 pb-8">
	<div class="mx-auto w-full max-w-275">
		<div
			class="grid grid-cols-1 items-center gap-5 pt-6
			       text-[11px] text-[#686875]
			       sm:grid-cols-[1fr_auto_1fr] sm:gap-0"
		>
			<div class="font-medium tracking-wide">
				RAWSIE
			</div>

			<div class="order-2 flex gap-6 sm:order-0">
				<a href="mailto:me@rawsie.dev" class="transition-colors duration-200 hover:text-white">
					Email
				</a>

				<a href="https://github.com/rawsie-dev" target="_blank" rel="noopener noreferrer" class="transition-colors duration-200 hover:text-white">
					GitHub
				</a>

				<a href="https://www.youtube.com/@RawsieDev" target="_blank" rel="noopener noreferrer" class="transition-colors duration-200 hover:text-white">
					YouTube
				</a>

				<a href="https://bsky.app/profile/rawsie.dev" target="_blank" rel="noopener noreferrer" class="transition-colors duration-200 hover:text-white">
					Bluesky
				</a>

				<button type="button" onclick={copyDiscord} class="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white" title="Copy Discord username">
					Discord: rawsie.dev
					{#if copied}
						<Check size={12} />
					{:else}
						<Copy size={12} />
					{/if}
				</button>
			</div>

			<div class="order-3 sm:text-right">
				© {new Date().getFullYear()}
			</div>
		</div>
	</div>
</footer>
