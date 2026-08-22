<script>
	let mouseX = $state(50);
	let mouseY = $state(50);

    let gradientX = $state(50);

	/** @param {MouseEvent} event */
    function handleMouseMove(event) {
		mouseX = (event.clientX / window.innerWidth) * 100;
		mouseY = (event.clientY / window.innerHeight) * 100;

        gradientX = mouseX;
	}
</script>

<section
	class="hero"
	onmousemove={handleMouseMove}
	role="presentation"
>
	<div
		class="glow cyan"
		style={`left: ${mouseX * 0.25}%; top: ${mouseY * 0.25}%;`}
	></div>

	<div
		class="glow pink"
		style={`right: ${(100 - mouseX) * 0.2}%; bottom: ${(100 - mouseY) * 0.2}%;`}
	></div>

	<div class="hero-content">
		<p class="eyebrow">HELLO, I'M</p>

		<h1>RAWSIE</h1>

		<div class="line"></div>

		<p class="tagline">
			I build things with
			<span class="cyan-text">code</span>,
			<span class="cyan-text">AI</span>,
			and
			<span class="pink-text">curiosity</span>.
		</p>

		<div class="actions">
			<a href="#work" class="primary">View my work <span>↗</span></a>
			<a href="#about" class="secondary">About me</a>
		</div>
	</div>

	<div class="scroll">
		<span></span>
		SCROLL TO EXPLORE
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;

		display: flex;
		align-items: center;
		justify-content: center;

		overflow: hidden;

		background: #0b0b12;
	}

	.hero::before {
		content: '';

		position: absolute;
		inset: 0;

		background-image:
			linear-gradient(rgba(255, 255, 255, 0.018) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px);

		background-size: 80px 80px;

		mask-image: radial-gradient(circle at center, black, transparent 75%);
	}

	.hero-content {
		position: relative;
		z-index: 2;

		width: min(1000px, calc(100% - 40px));

		text-align: center;
	}

	.eyebrow {
		margin: 0 0 18px;

		font-size: 13px;
		letter-spacing: 0.25em;
		color: #a7a7b5;
	}

	h1 {
		margin: 0;

		font-size: clamp(80px, 17vw, 210px);
		line-height: 0.85;
		letter-spacing: -0.07em;

		font-weight: 800;

		color: white;

		text-shadow:
			0 0 80px rgba(91, 228, 255, 0.08),
			0 0 120px rgba(255, 205, 254, 0.05);
	}

	.line {
        width: 500px;
        height: 2px;

        margin: 38px auto 28px;

        background: repeating-linear-gradient(
            90deg,
            #5be4ff 0px,
            #00a8c9 50px,
            #ffcdfe 100px,
            #fcffa8 150px,
            #cdffd9 200px,
            #5be4ff 250px
        );

        background-size: 500px 100%;

        animation: gradient-shift 4s linear infinite;
    }

    @keyframes gradient-shift {
        from {
            background-position: 0 0;
        }

        to {
            background-position: -500px 0;
        }
    }

	.tagline {
		margin: auto;

		max-width: 650px;

		font-size: clamp(20px, 3vw, 30px);
		line-height: 1.4;

		color: #d0d0d8;
	}

	.actions {
		display: flex;
		justify-content: center;
		gap: 14px;

		margin-top: 40px;
	}

	.actions a {
		padding: 13px 20px;

		border-radius: 100px;

		font-size: 14px;
		text-decoration: none;

		transition:
			transform 0.2s ease,
			background 0.2s ease;
	}

	.primary {
		background: white;
		color: #0b0b12;
	}

	.primary:hover {
		transform: translateY(-2px);
	}

	.primary span {
		margin-left: 5px;
	}

	.secondary {
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: white;
	}

	.secondary:hover {
		background: rgba(255, 255, 255, 0.06);
		transform: translateY(-2px);
	}

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

	.scroll {
		position: absolute;
		bottom: 30px;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;

		font-size: 9px;
		letter-spacing: 0.2em;
		color: #686875;
	}

	.scroll span {
		width: 1px;
		height: 35px;

		background: linear-gradient(
			#5be4ff,
			transparent
		);
	}

	@media (max-width: 600px) {
		.actions {
			flex-direction: column;
			align-items: center;
		}

		.actions a {
			width: 180px;
			text-align: center;
		}
	}
</style>