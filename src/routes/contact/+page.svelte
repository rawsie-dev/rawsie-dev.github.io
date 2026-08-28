<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<svelte:head>
	<title>Contact — Rawsie</title>
</svelte:head>

<Navbar />

<main>
	<PageHeader
		title="Let's make<br /><span class='pink'>something.</span>"
		description="Have an idea, want to collaborate, or just want to say hello?"
	/>

	<section class="contact">
		<div class="container">
			<div class="main-contact">
                <span class="label">HAVE SOMETHING IN MIND?</span>

                <a class="email" href="mailto:me@rawsie.dev">
                    <span class="email-text">me@rawsie.dev</span>
                    <span class="email-arrow">↗</span>
                </a>

                <p class="email-note">Usually replying within a day or two.</p>
            </div>

            <div class="contact-topics">
                <div class="section-label">WHAT CAN YOU CONTACT ME ABOUT?</div>

                <div class="topics">
                    <div class="topic">
                        <span class="topic-number">01</span>

                        <div>
                            <h3>Collaboration</h3>
                            <p>Research, software, or something weird.</p>
                        </div>
                    </div>

                    <div class="topic">
                        <span class="topic-number">02</span>

                        <div>
                            <h3>Projects</h3>
                            <p>Have an idea worth building?</p>
                        </div>
                    </div>

                    <div class="topic">
                        <span class="topic-number">03</span>

                        <div>
                            <h3>Just say hi</h3>
                            <p>No particular reason required.</p>
                        </div>
                    </div>
                </div>
            </div>

			<div class="socials">
                <div class="section-label">WAYS TO REACH ME</div>

                <a href="https://github.com/rawsie-dev" target="_blank" rel="noopener noreferrer">
                    <span class="social-number">01</span>

                    <span class="social-name">GitHub</span>

                    <span class="social-arrow">↗</span>
                </a>

                <a href="https://www.youtube.com/@RawsieDev" target="_blank" rel="noopener noreferrer">
                    <span class="social-number">02</span>

                    <span class="social-name">YouTube</span>

                    <span class="social-arrow">↗</span>
                </a>

                <a href="mailto:me@rawsie.dev">
                    <span class="social-number">03</span>

                    <span class="social-name">Email</span>

                    <span class="social-arrow">↗</span>
                </a>
            </div>
		</div>
	</section>
</main>

<Footer />

<style>
	.contact {
		padding: 50px 0 180px;

		background: #0b0b12;
	}

	.container {
		width: min(1100px, calc(100% - 40px));
		margin: auto;
	}

	.main-contact {
		padding: 60px 0;

		border-top: 1px solid rgba(255, 255, 255, 0.08);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.label {
		color: #686875;
		font-size: 16px;
		letter-spacing: 0.15em;
	}

	.email {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-top: 30px;
        padding: 10px 0;

        color: #5be4ff;

        font-family: 'Space Grotesk', sans-serif;
        font-size: clamp(30px, 6vw, 70px);
        font-weight: 500;
        letter-spacing: -0.05em;
        text-decoration: none;

        transition:
            color 0.25s ease,
            padding 0.25s ease;
    }

    .email:hover {
        padding-left: 10px;
        color: white;
    }

    .email-arrow {
        font-family: Inter, sans-serif;
        font-size: 30px;

        transition:
            transform 0.25s ease,
            color 0.25s ease;
    }

    .email:hover .email-arrow {
        color: #ffcdfe;
        transform: translate(5px, -5px);
    }

    .email-note {
        margin-top: 10px;

        color: #686875;
        font-size: 14px;
    }

    .topics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;

        background: rgba(255, 255, 255, 0.08);
    }

    .topic {
        min-height: 180px;
        padding: 28px;

        background: #0b0b12;

        transition:
            background 0.25s ease,
            transform 0.25s ease;
    }

    .topic:hover {
        background: rgba(91, 228, 255, 0.025);
        transform: translateY(-3px);
    }

    .topic-number {
        display: block;
        margin-bottom: 20px;

        color: #686875;
        font-size: 12px;
    }

    .topic h3 {
        margin: 0;

        color: #f5f5fa;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 21px;
        font-weight: 500;
    }

    .topic p {
        margin: 8px 0 0;

        color: #686875;
        font-size: 14px;
        line-height: 1.6;
    }

    @media (max-width: 700px) {
        .topics {
            grid-template-columns: 1fr;
        }

        .topic {
            min-height: auto;
        }

        .topic-number {
            margin-bottom: 25px;
        }
    }

	.socials {
        margin-top: 40px;
    }

    .socials .section-label {
        margin-bottom: 20px;
    }

    .socials a {
        position: relative;

        display: grid;
        grid-template-columns: 60px 1fr 30px;
        align-items: center;

        padding: 25px 0;

        border-bottom: 1px solid rgba(255, 255, 255, 0.07);

        color: white;

        font-size: 17px;
        text-decoration: none;

        transition:
            padding 0.25s ease,
            background 0.25s ease;
    }

    .socials a:first-of-type {
        border-top: 1px solid rgba(255, 255, 255, 0.07);
    }

    .socials a:hover {
        padding-left: 12px;
        padding-right: 12px;

        background: rgba(91, 228, 255, 0.025);
    }

    .social-number {
        color: #686875;
        font-size: 12px;

        transition: color 0.2s ease;
    }

    .social-name {
        transition:
            color 0.2s ease,
            transform 0.25s ease;
    }

    .social-arrow {
        justify-self: end;

        color: #686875;
        font-family: Inter, sans-serif;
        font-size: 18px;

        transition:
            color 0.2s ease,
            transform 0.25s ease;
    }

    .socials a:hover .social-number {
        color: #5be4ff;
    }

    .socials a:hover .social-name {
        color: #5be4ff;
        transform: translateX(5px);
    }

    .socials a:hover .social-arrow {
        color: #ffcdfe;
        transform: translate(4px, -4px);
    }

    .socials a::after {
        content: '';

        position: absolute;
        bottom: -1px;
        left: 0;

        width: 0;
        height: 1px;

        background: #5be4ff;

        transition: width 0.35s ease;
    }

    .socials a:hover::after {
        width: 100%;
    }
</style>