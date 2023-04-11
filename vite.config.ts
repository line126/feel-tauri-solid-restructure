import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [solidPlugin()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 30405,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    /**
     * 默认： dist
     * 相对于 项目根目录
     */
    outDir: '../dist',
  },
  root: 'src-fe',
  /**
   * 默认： "public"
   * 该值可以是文件系统的绝对路径，也可以是相对于项目根目录的相对路径。
   *
   * 默认是 <root>/public
   * 因为修改了 root dir 所以 publicDir 也需要修改
   */
  publicDir: '../public',
}));
