<script>
	import { resolve } from '$app/paths';
</script>

<section
	class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0b12]"
	role="presentation"
>
	<!-- Background glows -->
	<div class="glow cyan"></div>
	<div class="glow pink"></div>

	<!-- Hero content -->
	<div class="relative z-2 w-[min(1000px,calc(100%-40px))] text-center">
		<p class="mb-4.5 text-[18px] tracking-[0.25em] text-[#a7a7b5]">
			HELLO, I'M
		</p>

		<h1
			class="rawsie-title m-0 text-[clamp(80px,17vw,210px)] font-extrabold leading-[0.85] tracking-[-0.07em] text-white [text-shadow:0_0_80px_rgba(91,228,255,0.08),0_0_120px_rgba(255,205,254,0.05)]"
		>
			RAWSIE
		</h1>

		<div class="rainbow-line"></div>

		<p
			class="mx-auto max-w-162.5 text-[clamp(20px,3vw,30px)] leading-[1.4] text-[#d0d0d8]"
		>
			I build things with
			<span class="text-[#5be4ff]">code</span>,
			<span class="text-[#5be4ff]">AI</span>,
			and
			<span class="text-[#ffcdfe]">curiosity</span>.
		</p>

		<div class="mt-10 flex justify-center gap-3.5 max-[600px]:flex-col max-[600px]:items-center">
			<a
				href="#projects"
				class="rounded-full bg-white px-5 py-3.25 text-[14px] text-[#0b0b12] no-underline transition-transform duration-200 ease-in-out hover:-translate-y-0.5 max-[600px]:w-45 max-[600px]:text-center"
			>
				View my projects
			</a>

			<a
				href={resolve('/about')}
				class="rounded-full border border-white/15 px-5 py-3.25 text-[14px] text-white no-underline transition-[background,transform] duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-white/6 max-[600px]:w-45 max-[600px]:text-center"
			>
				About me
			</a>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="absolute bottom-7.5 flex flex-col items-center gap-2.5 text-[9px] tracking-[0.2em] text-[#686875]"
	>
		<span class="h-8.75 w-px bg-linear-to-b from-[#5be4ff] to-transparent"></span>
		SCROLL TO EXPLORE
	</div>
</section>

<style>
	.glow {
		position: absolute;
		width: 500px;
		height: 500px;
		border-radius: 50%;
		filter: blur(120px);
		pointer-events: none;
		transition:
			left 1s ease,
			top 1s ease,
			right 1s ease,
			bottom 1s ease;
	}

	.glow.cyan {
		background: rgba(91, 228, 255, 0.09);
	}

	.glow.pink {
		background: rgba(255, 205, 254, 0.08);
	}

	.rawsie-title {
		background: linear-gradient(
			90deg,
			#5be4ff,
			#ffcdfE,
			#ffffff,
			#5be4ff,
			#ffcdfE,
			#5be4ff
		);
		background-size: 300% 100%;
		background-position: 0% 50%;

		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;

		animation: prism-roll 8s linear infinite;

		filter:
			drop-shadow(0 0 30px rgba(91, 228, 255, 0.12))
			drop-shadow(0 0 50px rgba(255, 205, 254, 0.08));
		}

		@keyframes prism-roll {
		0% {
			background-position: 0% 50%;
		}

		100% {
			background-position: 300% 50%;
		}
		}
</style>