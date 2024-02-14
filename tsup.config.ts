import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    fontfaceobserver: './src/observer.js',
  },
  format: ['esm'],
  bundle: true,
});
