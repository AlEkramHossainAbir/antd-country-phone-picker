import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['components/CountryPhoneInput/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'antd', '@ant-design/icons'],
  treeshake: true,
  minify: false,
  outDir: 'dist',
  // Keep 'use client' directive for Next.js App Router compatibility
  banner: {
    js: "'use client';",
  },
});
