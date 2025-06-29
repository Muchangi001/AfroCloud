<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/stores'; // 1. Import the page store
    
	async function signInWithGoogle() {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				// 2. Add the redirectTo option
				redirectTo: `${$page.url.origin}/auth/callback`
			}
		});
	}
</script>

<div class="hero">
	<h1>🎨 AfroCloud</h1>
	<p class="hero-subtitle">Empowering Kenyan Artists</p>
	<div class="cta-section">
		<button on:click={signInWithGoogle} class="cta-btn">Join as Artist</button>
	</div>
</div>