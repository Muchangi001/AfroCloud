<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/stores';

	async function signInWithGoogle() {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${$page.url.origin}/auth/callback`
			}
		});
	}
</script>

<style>
	.hero {
		text-align: center;
		padding: 6rem 2rem;
		background: linear-gradient(135deg, #1a0e0a, #2d1810);
		color: #f4f1eb;
	}
	.hero h1 {
		font-size: 3.5rem;
		background: linear-gradient(45deg, #DAA520, #FF8C00);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.hero-subtitle {
		font-size: 1.5rem;
		margin: 1rem 0;
		color: #DAA520;
	}
	.hero-description {
		max-width: 800px;
		margin: 0 auto 2rem;
		font-size: 1.2rem;
		line-height: 1.8;
	}
	.cta-btn {
		padding: 0.9rem 2rem;
		background: linear-gradient(45deg, #DAA520, #FF8C00);
		border-radius: 50px;
		font-size: 1.1rem;
		color: #1a0e0a;
		font-weight: 600;
		border: none;
		cursor: pointer;
		transition: 0.3s ease;
	}
	.cta-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 25px rgba(218, 165, 32, 0.4);
	}
	.section {
		padding: 4rem 2rem;
		max-width: 1000px;
		margin: 0 auto;
	}
	.section h2 {
		font-size: 2rem;
		color: #DAA520;
		margin-bottom: 1rem;
	}
	.section p {
		font-size: 1.1rem;
		line-height: 1.7;
		margin-bottom: 1.5rem;
	}
</style>

<div class="hero">
	<h1>🎨 AfroCloud</h1>
	<p class="hero-subtitle">Nurturing African Art and Culture</p>
	<p class="hero-description">
		AfroCloud is the online companion to <strong>AfroBase</strong> — a powerful platform where African artists can showcase their work to the world, while culture is preserved and celebrated both online and offline.
	</p>
	<p class="hero-description">
		Whether you’re an artist looking to share your vision, or a cultural guardian protecting your roots — AfroCloud is your digital stage, and AfroBase is your local archive.
	</p>
	<div class="cta-section">
		<button on:click={signInWithGoogle} class="cta-btn">🎨 Join as Artist</button>
	</div>
</div>

<!-- AfroBase Description -->
<section class="section">
	<h2>🛖 What is AfroBase?</h2>
	<p>
		AfroBase is an <strong>offline-first intranet</strong> platform that runs on local hotspots — like cybercafés, schools, or community centers — allowing users to view, share, and upload African art and cultural content without the internet.
	</p>
	<p>
		Think of it as Africa's <strong>local internet for culture</strong>: a decentralized system where proverbs, paintings, wisdom, and stories live forever — even in places without Wi-Fi.
	</p>
</section>

<!-- AfroCloud Description -->
<section class="section">
	<h2>☁️ What is AfroCloud?</h2>
	<p>
		AfroCloud is the online portal for AfroBase. It gives African artists global reach, remote visibility, and future monetization opportunities. Artists can sign in with Google, upload their creations, and become discoverable around the world.
	</p>
	<p>
		AfroCloud and AfroBase work together — bridging digital access <b>online and offline</b>, ensuring no artist is left behind and no culture is forgotten.
	</p>
</section>

<!-- Mission Section -->
<section class="section">
	<h2>🌍 Our Mission</h2>
	<p>
		We aim to <strong>preserve African heritage</strong> and <strong>empower local creators</strong> using a two-layer system:
	</p>
	<ul>
		<li>📶 <strong>AfroBase (Offline):</strong> Node-based cultural servers serving communities directly without internet.</li>
		<li>🌐 <strong>AfroCloud (Online):</strong> A web-based global portal where artists can shine and culture thrives.</li>
	</ul>
</section>

<!-- Call to Action -->
<section class="section">
	<h2>🚀 Join the Movement</h2>
	<p>
		Whether you're an artist, a culture lover, or a sponsor — you can help build Africa’s digital memory.
	</p>
	<div class="cta-section">
		<button class="cta-btn">🚀 Get Started</button>
		<!--<button on:click={signInWithGoogle} class="cta-btn">🚀 Get Started</button>-->
	</div>
</section>
