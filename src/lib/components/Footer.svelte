<footer id="contact">
	<div class="container">
		<!-- <div class="big">
			Let's build
			<span>something.</span>
		</div>

		<a class="email" href="mailto:me@rawsie.dev">
			me@rawsie.dev ↗
		</a> -->

		<div class="bottom">
			<div>
				RAWSIE
			</div>

			<div class="links">
				<a href="https://github.com/rawsie-dev">GitHub</a>
				<!-- <a href="#">LinkedIn</a> -->
				<a href="mailto:me@rawsie.dev">Email</a>
			</div>

			<div class="copyright">
				© 2026
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		padding: 130px 0 35px;

		background: #0b0b12;

		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.container {
		width: min(1100px, calc(100% - 40px));
		margin: auto;
	}

	.big {
		font-size: clamp(55px, 10vw, 120px);
		line-height: 0.9;
		letter-spacing: -0.06em;

		color: white;
	}

	.big span {
		color: #ffcdfe;
	}

	.email {
		display: inline-block;

		margin-top: 45px;

		color: #5be4ff;

		font-size: 18px;
		text-decoration: none;
	}

	.email:hover {
		text-decoration: underline;
	}

	.bottom {
		display: grid;
		grid-template-columns: 1fr auto 1fr;

		align-items: center;

		padding-top: 25px;

		border-top: 1px solid rgba(255, 255, 255, 0.07);

		font-size: 11px;
		color: #686875;
	}

	.links {
		display: flex;
		gap: 25px;
	}

	.links a {
		color: #686875;
		text-decoration: none;
	}

	.links a:hover {
		color: white;
	}

	.copyright {
		text-align: right;
	}

	@media (max-width: 600px) {
		.bottom {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.links {
			order: 2;
		}

		.copyright {
			text-align: left;
			order: 3;
		}
	}
</style>