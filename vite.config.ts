import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    // Preserve root-relative image, CSS, and script paths in the production build.
    {
      name: 'copy-unbundled-assets',
      apply: 'build',
      closeBundle() {
        const distDir = path.join(projectRoot, 'dist');
        const assetDirectories = [
          { source: path.join(projectRoot, 'src/assets'), destination: path.join(distDir, 'src/assets') },
          { source: path.join(projectRoot, 'assets'), destination: path.join(distDir, 'assets') },
        ];

        for (const directory of assetDirectories) {
          if (fs.existsSync(directory.source)) {
            fs.cpSync(directory.source, directory.destination, {
              recursive: true,
              force: true,
            });
          }
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.join(projectRoot, 'index.html'),
        about: path.join(projectRoot, 'about.html'),
        facilities: path.join(projectRoot, 'facilities.html'),
        gallery: path.join(projectRoot, 'gallery.html'),
        contact: path.join(projectRoot, 'contact.html'),
      },
    },
  },
  server: {
    // HMR can be disabled in constrained editing environments when requested.
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
