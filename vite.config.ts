import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: [""],
		host: true, // Allow access from any host
		port: 5176, // Default Vite port
	}
});
