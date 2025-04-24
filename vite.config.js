import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  server: {
    proxy: undefined, // Proxy removido, já que será consumido do backend remoto
  },
  plugins: [TanStackRouterVite(), react()],
  test: {
    environment: "happy-dom", // Configuração para ambiente de testes
  },
});
