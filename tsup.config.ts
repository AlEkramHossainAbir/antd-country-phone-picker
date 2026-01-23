import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';

// CSS Modules plugin that processes :global() syntax and outputs both JS and CSS
const cssModulesPlugin = {
  name: 'css-modules',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(build: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    build.onLoad({ filter: /\.module\.css$/ }, async (args: any) => {
      const css = await fs.promises.readFile(args.path, 'utf8');
      
      // Convert :global() syntax to regular CSS for distribution
      // This fixes the "global is not recognized as a valid pseudo-class" error
      let processedCSS = css;
      
      // Replace :global(.selector) with just .selector
      processedCSS = processedCSS.replace(/:global\(([^)]+)\)/g, '$1');
      
      // Replace :global at start of selector (e.g., :global(.class) or :global([attr]))
      processedCSS = processedCSS.replace(/:global\s*/g, '');
      
      // Extract class names from original CSS for the JS module
      const classNames = css.match(/\.[\w-]+/g) || [];
      const classNamesObject: Record<string, string> = {};
      
      classNames.forEach((className) => {
        const name = className.slice(1); // Remove leading dot
        classNamesObject[name] = name;
      });
      
      // Write processed CSS to dist folder (will be overwritten by tsup's CSS output)
      // This ensures the distributed CSS doesn't have :global() syntax
      const outputPath = path.join(process.cwd(), 'dist', 'index.css');
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, processedCSS);
      
      // Return JS module that exports class names
      const jsContent = `
        const styles = ${JSON.stringify(classNamesObject)};
        export default styles;
      `;
      
      return {
        contents: jsContent,
        loader: 'js',
      };
    });
  },
};

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    compilerOptions: {
      incremental: false,
    },
  },
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
  esbuildPlugins: [cssModulesPlugin],
});
