import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ["d399-102-0-8-22.ngrok-free.app"],
		host: true, // Allow access from any host
		port: 5173, // Default Vite port
	}
});
