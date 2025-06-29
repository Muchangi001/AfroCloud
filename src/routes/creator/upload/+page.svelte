<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let title = '';
	let description = '';
	let files: FileList | null = null;
	let isUploading = false;

	async function uploadArt() {
		isUploading = true;
		const {
			data: { user }
		} = await supabase.auth.getUser();

		if (user && files && files.length > 0 && files.length <= 3) {
			const imageUrls = [];
			for (const file of files) {
				const { data, error } = await supabase.storage
					.from('art-images')
					.upload(`${user.id}/${file.name}`, file);
				if (data) {
					const {
						data: { publicUrl }
					} = supabase.storage.from('art-images').getPublicUrl(data.path);
					imageUrls.push(publicUrl);
				}
			}

			if (imageUrls.length > 0) {
				await supabase.from('art').insert([
					{
						artist_id: user.id,
						title,
						description,
						image_urls: imageUrls
					}
				]);
			}
		}
		isUploading = false;
		goto('/creator');
	}
</script>

<div class="section">
	<h2>Upload New Art</h2>
	<form on:submit|preventDefault={uploadArt}>
		<input type="text" bind:value={title} placeholder="Art Title" required />
		<textarea bind:value={description} placeholder="Short Description" required></textarea>
		<input
			type="file"
			on:change={(e) => (files = e.currentTarget.files)}
			multiple
			accept="image/*"
			required
		/>
		<button type="submit" disabled={isUploading}>
			{isUploading ? 'Uploading...' : 'Upload'}
		</button>
	</form>
</div>