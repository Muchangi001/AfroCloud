<script lang="ts">
	import { onMount } from 'svelte';
	import { EditIcon, Trash2Icon } from 'svelte-feather-icons';
	import { supabase } from '$lib/supabaseClient';

	type ArtPiece = {
		id: number;
		title: string;
		description: string;
		image_urls: string[];
		created_at: string; // Added for more detail
	};

	let artPieces: ArtPiece[] = [];
	let loading = true;
	let userName = 'Artist';

	let session: any = null;

	// Dummy Data inspired by Kenyan art and culture
	const dummyArtPieces: ArtPiece[] = [
		{
			id: 1,
			title: 'Maasai Moran',
			description: 'A vibrant portrait capturing the stoic dignity of a Maasai warrior.',
			image_urls: ['https://via.placeholder.com/400x300.png/DAA520/1a0e0a?text=Moran'],
			created_at: '2025-06-15T10:00:00Z'
		},
		{
			id: 2,
			title: 'Nairobi Matatu',
			description:
				'The chaotic beauty of Nairobi\'s public transport, captured in a riot of color and detail.',
			image_urls: [
				'https://via.placeholder.com/400x300.png/FF8C00/1a0e0a?text=Matatu+Art+1',
				'https://via.placeholder.com/400x300.png/CD853F/1a0e0a?text=Matatu+Art+2'
			],
			created_at: '2025-05-28T14:30:00Z'
		},
		{
			id: 3,
			title: 'Gikuyu Wisdom',
			description: 'An abstract piece representing the depth of Gikuyu proverbs and stories.',
			image_urls: ['https://via.placeholder.com/400x300.png/2d1810/f4f1eb?text=Wisdom'],
			created_at: '2025-04-10T09:00:00Z'
		},
        {
			id: 4,
			title: 'Rift Valley Sunset',
			description: 'The breathtaking hues of a sunset over the Great Rift Valley.',
			image_urls: [
                'https://via.placeholder.com/400x300.png/DAA520/1a0e0a?text=Sunset+1',
                'https://via.placeholder.com/400x300.png/FF8C00/1a0e0a?text=Sunset+2',
                'https://via.placeholder.com/400x300.png/CD853F/1a0e0a?text=Sunset+3',
            ],
			created_at: '2025-06-25T18:45:00Z'
		}
	];

	onMount(async () => {
		// In a real scenario, you would fetch user data here.
		const { data: { session: sess } } = await supabase.auth.getSession();
		session = sess;
		// For now, we use a timeout to simulate loading.
		setTimeout(() => {
			artPieces = dummyArtPieces;
			loading = false;
		}, 1000); // Simulate network delay
	});

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-KE', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Creator Dashboard - AfroCloud</title>
</svelte:head>

<style>
	.welcome-header {
		padding: 40px 0;
		text-align: center;
		border-bottom: 1px solid rgba(218, 165, 32, 0.2);
		margin-bottom: 40px;
	}
	.welcome-header h2 {
		font-size: 2.5rem;
		color: #daa520;
	}
	.welcome-header p {
		font-size: 1.2rem;
		color: #f4f1eb;
		margin-top: 10px;
	}
	.art-card {
		background: rgba(218, 165, 32, 0.05);
		border: 1px solid rgba(218, 165, 32, 0.2);
		border-radius: 15px;
		overflow: hidden;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
	}
	.art-card:hover {
		transform: translateY(-10px);
		border-color: #daa520;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}
	.image-carousel {
		display: flex;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		border-bottom: 1px solid rgba(218, 165, 32, 0.2);
	}
	.image-carousel img {
		width: 100%;
		height: auto;
		object-fit: cover;
		scroll-snap-align: start;
	}
	.card-content {
		padding: 25px;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	.card-content h3 {
		font-size: 1.5rem;
		color: #daa520;
		margin-bottom: 10px;
	}
	.card-content p {
		flex-grow: 1;
		margin-bottom: 20px;
	}
	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #cd853f;
		font-size: 0.9rem;
	}
	.card-actions {
		display: flex;
		gap: 15px;
	}
	.card-actions button {
		background: none;
		border: none;
		color: #cd853f;
		cursor: pointer;
		transition: color 0.3s ease;
	}
	.card-actions button:hover {
		color: #daa520;
	}

	/* Skeleton Loader for a better loading experience */
	.skeleton-card {
		background: rgba(218, 165, 32, 0.05);
		border: 1px solid rgba(218, 165, 32, 0.2);
		border-radius: 15px;
		overflow: hidden;
	}
	.skeleton-image {
		height: 250px;
		background: rgba(218, 165, 32, 0.1);
		animation: pulse 1.5s infinite ease-in-out;
	}
	.skeleton-content {
		padding: 25px;
	}
	.skeleton-title {
		height: 24px;
		width: 60%;
		background: rgba(218, 165, 32, 0.1);
		border-radius: 4px;
		margin-bottom: 15px;
		animation: pulse 1.5s infinite ease-in-out;
	}
	.skeleton-text {
		height: 16px;
		width: 90%;
		background: rgba(218, 165, 32, 0.1);
		border-radius: 4px;
		animation: pulse 1.5s infinite ease-in-out;
	}
	@keyframes pulse {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}
</style>

<div class="welcome-header">
	<h2>Welcome, {userName}!</h2>
	<p>Here are your creative masterpieces. Manage your gallery with pride.</p>
</div>

<div class="section">
	<h2>Your Art</h2>

	{#if loading}
		<div class="cards-grid">
			{#each { length: 4 } as _}
				<div class="skeleton-card">
					<div class="skeleton-image"></div>
					<div class="skeleton-content">
						<div class="skeleton-title"></div>
						<div class="skeleton-text"></div>
					</div>
				</div>
			{/each}
		</div>
	{:else if artPieces.length === 0}
		<div class="card" style="text-align: center; padding: 50px;">
			<h3>Your gallery is empty!</h3>
			<p>It's time to upload your first piece of art and share your vision.</p>
			<a href="/creator/upload" class="cta-btn" style="margin-top: 20px;">Upload Now</a>
		</div>
	{:else}
		<div class="cards-grid">
			{#each artPieces as art (art.id)}
				<div class="art-card">
					<div class="image-carousel">
						{#each art.image_urls as imageUrl}
							<img src={imageUrl} alt={art.title} />
						{/each}
					</div>
					<div class="card-content">
						<h3>{art.title}</h3>
						<p>{art.description}</p>
						<div class="card-footer">
							<span>Uploaded: {formatDate(art.created_at)}</span>
							<div class="card-actions">
								<button title="Edit"><EditIcon size="20" /></button>
								<button title="Delete"><Trash2Icon size="20" /></button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>