import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    assetsInclude: ['.png'],
    server: {
        host: true,
        port: 8001,
    },
});
