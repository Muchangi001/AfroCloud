<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';

	type ArtPiece = {
		id: number;
		title: string;
		description: string;
		image_urls: string[];
		artist_id: string;
	};

	let artPieces: ArtPiece[] = [];
	let loading = true;

	onMount(async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (user) {
			const { data, error } = await supabase
				.from('art')
				.select('*')
				.eq('artist_id', user.id);
			if (data) {
				artPieces = data;
			}
		}
		loading = false;
	});
</script>

<div class="section">
	<h2>Your Art</h2>
	{#if loading}
		<p>Loading your masterpieces...</p>
	{:else}
		<div class="cards-grid">
			{#each artPieces as art}
				<div class="card">
					<h3>{art.title}</h3>
					<p>{art.description}</p>
					{#each art.image_urls as imageUrl}
						<img src={imageUrl} alt={art.title} style="max-width: 100%;" />
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>