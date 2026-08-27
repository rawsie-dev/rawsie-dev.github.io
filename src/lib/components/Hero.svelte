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

		<div class="rawsie-wrap">
	<svg
		class="rawsie-svg"
		viewBox="0 0 900 220"
		preserveAspectRatio="xMidYMid meet"
		aria-label="RAWSIE"
		role="img"
	>
		<defs>
			<linearGradient id="rawsie-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
				<stop offset="0%" stop-color="#5be4ff" />
				<stop offset="35%" stop-color="#ffcdfe" />
				<stop offset="55%" stop-color="#ffffff" />
				<stop offset="75%" stop-color="#5be4ff" />
				<stop offset="100%" stop-color="#ffcdfe" />
			</linearGradient>

			<filter id="rawsie-glow" x="-50%" y="-50%" width="200%" height="200%">
				<feGaussianBlur stdDeviation="7" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<!-- Drawing strokes -->
		<g transform="translate(23 0)">
			<g class="rawsie-draw">
				<text x="80"  y="155">R</text>
				<text x="215" y="155">A</text>
				<text x="325" y="155">W</text>
				<text x="495" y="155">S</text>
				<text x="611" y="155">I</text>
				<text x="654" y="155">E</text>
			</g>

			<!-- Finished lettering -->
			<g class="rawsie-fill">
				<text x="80"  y="155">R</text>
				<text x="215" y="155">A</text>
				<text x="325" y="155">W</text>
				<text x="495" y="155">S</text>
				<text x="611" y="155">I</text>
				<text x="654" y="155">E</text>
			</g>
		</g>
	</svg>
</div>

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

	.rawsie-draw text {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-weight: 900;
		font-size: 185px;

		fill: transparent;
		stroke: #5be4ff;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;

		filter: url(#rawsie-glow);

		/*
		* Huge dash length ensures the entire glyph
		* is available to be revealed.
		*/
		stroke-dasharray: 5000;
		stroke-dashoffset: 5000;

		/*
		* VERY slow drawing.
		*/
		animation:
			rawsie-letter-write 5s linear forwards, /* 5 */
			rawsie-pen-glow 5s ease-in-out forwards;
	}


	/* =========================================
	LETTER START TIMES
	========================================= */

	/* R */
	.rawsie-draw text:nth-child(1) {
		animation-delay: 3s, 3s;
	}

	/* A — 2.2 seconds of overlap with R */
	.rawsie-draw text:nth-child(2) {
		animation-delay: 3.3s, 3.3s;
	}

	/* W — overlaps A and R */
	.rawsie-draw text:nth-child(3) {
		animation-delay: 3.6s, 3.6s;
	}

	/* S */
	.rawsie-draw text:nth-child(4) {
		animation-delay: 4.3s, 4.3s;
	}

	/* I */
	.rawsie-draw text:nth-child(5) {
		animation-delay: 5.4s, 5.4s;
	}

	/* E */
	.rawsie-draw text:nth-child(6) {
		animation-delay: 4.7s, 4.7s;
	}


	/* =========================================
	FINISHED LETTERS
	========================================= */

	.rawsie-fill text {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-weight: 900;
		font-size: 185px;

		fill: url(#rawsie-gradient);
		fill-opacity: 0;

		stroke: transparent;

		animation: rawsie-fill-in 0.6s ease forwards;
	}

	/*
	* Each fill appears right as its
	* corresponding 3-second drawing finishes.
	*/

	.rawsie-fill text:nth-child(1) {
		animation-delay: 4.3s;
	}

	.rawsie-fill text:nth-child(2) {
		animation-delay: 4.5s;
	}

	.rawsie-fill text:nth-child(3) {
		animation-delay: 5.8s;
	}

	.rawsie-fill text:nth-child(4) {
		animation-delay: 6.0s;
	}

	.rawsie-fill text:nth-child(5) {
		animation-delay: 6.2s;
	}

	.rawsie-fill text:nth-child(6) {
		animation-delay: 6.4s;
	}


	/* =========================================
	DRAW ANIMATION
	========================================= */

	@keyframes rawsie-letter-write {
		0% {
			stroke-dashoffset: 5000;
		}

		100% {
			stroke-dashoffset: 0;
		}
	}


	@keyframes rawsie-fill-in {
		0% {
			fill-opacity: 0;
		}

		100% {
			fill-opacity: 1;
		}
	}


	@keyframes rawsie-pen-glow {
		0% {
			filter:
				url(#rawsie-glow)
				drop-shadow(0 0 5px rgba(91, 228, 255, 0.2));
		}

		50% {
			filter:
				url(#rawsie-glow)
				drop-shadow(0 0 30px rgba(91, 228, 255, 0.8))
				drop-shadow(0 0 50px rgba(255, 205, 254, 0.5));
		}

		100% {
			filter:
				url(#rawsie-glow)
				drop-shadow(0 0 30px rgba(91, 228, 255, 0.12))
				drop-shadow(0 0 50px rgba(255, 205, 254, 0.08));
		}
	}
</style>