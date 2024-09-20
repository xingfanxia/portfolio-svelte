import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
  ssr : {
    noExternal: ['three']
  },
	server: {
		fs: {
			// Allow access to files from the project root.
			allow: ['..']
		}
	}
});
