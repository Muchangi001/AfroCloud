<script lang="ts">
	import '../app.css';
    import { dev } from '$app/environment';
    import { injectAnalytics } from '@vercel/analytics/sveltekit'; // Import Vercel Analytics
 
injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<div class="container">
	<slot />
</div>