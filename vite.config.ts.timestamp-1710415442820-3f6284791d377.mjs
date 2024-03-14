// vite.config.ts
import { defineConfig } from "file:///Users/haoxiong.gao/myproject/fireballs-react/node_modules/vite/dist/node/index.js";
import react from "file:///Users/haoxiong.gao/myproject/fireballs-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///Users/haoxiong.gao/myproject/fireballs-react/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgr from "file:///Users/haoxiong.gao/myproject/fireballs-react/node_modules/vite-plugin-svgr/dist/index.js";
import { viteStaticCopy } from "file:///Users/haoxiong.gao/myproject/fireballs-react/node_modules/vite-plugin-static-copy/dist/index.js";
import { obfuscator } from "file:///Users/haoxiong.gao/myproject/fireballs-react/node_modules/rollup-obfuscator/dist/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/haoxiong.gao/myproject/fireballs-react";
var splitToChunks = true;
var vite_config_default = ({ mode }) => {
  const isDev = mode === "development";
  const plugins = [
    react(
      isDev ? {
        babel: {
          plugins: [
            [
              "babel-plugin-styled-components",
              {
                ssr: false,
                pure: true,
                displayName: true,
                fileName: true,
                minify: false
              }
            ]
          ]
        }
      } : void 0
    ),
    tsconfigPaths(),
    svgr(),
    viteStaticCopy({
      targets: [{
        src: "node_modules/map-fonts/*",
        dest: "map-styles/fonts"
      }, {
        src: "node_modules/mapbox-gl/dist/mapbox-gl-csp-worker.js",
        dest: ".",
        rename: "worker.js"
      }]
    })
  ];
  if (!isDev) {
    plugins.push(
      obfuscator({
        options: {
          optionsPreset: "high-obfuscation"
        }
      })
    );
  }
  const cnf = {
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src"),
        "~@": resolve(__vite_injected_original_dirname, "src")
      }
    },
    plugins,
    optimizeDeps: {
      exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"]
    },
    server: {
      port: 5174,
      // host: '127.0.0.1',
      // https: true,
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp"
      }
    }
  };
  if (splitToChunks) {
    const names = [];
    cnf.build = {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const packageName = id.toString().split("node_modules/")[1].split("/")[0].toString();
              let index = names.indexOf(packageName);
              if (index === -1) {
                index = names.push(packageName) - 1;
              }
              return `pack${index}`;
            }
          }
        }
      }
    };
  }
  return defineConfig(cnf);
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaGFveGlvbmcuZ2FvL215cHJvamVjdC9maXJlYmFsbHMtcmVhY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9oYW94aW9uZy5nYW8vbXlwcm9qZWN0L2ZpcmViYWxscy1yZWFjdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaGFveGlvbmcuZ2FvL215cHJvamVjdC9maXJlYmFsbHMtcmVhY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCB7dml0ZVN0YXRpY0NvcHl9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5JztcbmltcG9ydCB7IG9iZnVzY2F0b3IgfSBmcm9tICdyb2xsdXAtb2JmdXNjYXRvcic7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQge3Jlc29sdmV9IGZyb20gXCJwYXRoXCI7XG5cbmNvbnN0IHNwbGl0VG9DaHVua3MgPSB0cnVlO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgKHttb2RlfSkgPT4ge1xuICBjb25zdCBpc0RldiA9IG1vZGUgPT09ICdkZXZlbG9wbWVudCc7XG5cbiAgY29uc3QgcGx1Z2lucyA9IFtcbiAgICByZWFjdChcbiAgICAgIGlzRGV2ID8ge1xuICAgICAgICBiYWJlbDoge1xuICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgXCJiYWJlbC1wbHVnaW4tc3R5bGVkLWNvbXBvbmVudHNcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNzcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHVyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtaW5pZnk6IGZhbHNlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9IDogdW5kZWZpbmVkXG4gICAgKSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgc3ZncigpLFxuICAgIHZpdGVTdGF0aWNDb3B5KHtcbiAgICAgIHRhcmdldHM6IFt7XG4gICAgICAgIHNyYzogJ25vZGVfbW9kdWxlcy9tYXAtZm9udHMvKicsXG4gICAgICAgIGRlc3Q6ICdtYXAtc3R5bGVzL2ZvbnRzJ1xuICAgICAgfSwge1xuICAgICAgICBzcmM6ICdub2RlX21vZHVsZXMvbWFwYm94LWdsL2Rpc3QvbWFwYm94LWdsLWNzcC13b3JrZXIuanMnLFxuICAgICAgICBkZXN0OiAnLicsXG4gICAgICAgIHJlbmFtZTogJ3dvcmtlci5qcydcbiAgICAgIH1dXG4gICAgfSlcbiAgXTtcblxuICBpZiAoIWlzRGV2KSB7XG4gICAgcGx1Z2lucy5wdXNoKFxuICAgICAgb2JmdXNjYXRvcih7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBvcHRpb25zUHJlc2V0OiAnaGlnaC1vYmZ1c2NhdGlvbidcbiAgICAgICAgfVxuICAgICAgfSBhcyBPcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIGNvbnN0IGNuZiA9IHtcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAgICd+QCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2lucyxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGV4Y2x1ZGU6IFtcIkBmZm1wZWcvZmZtcGVnXCIsIFwiQGZmbXBlZy91dGlsXCJdLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA1MTc0LFxuICAgICAgLy8gaG9zdDogJzEyNy4wLjAuMScsXG4gICAgICAvLyBodHRwczogdHJ1ZSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDcm9zcy1PcmlnaW4tT3BlbmVyLVBvbGljeVwiOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgIFwiQ3Jvc3MtT3JpZ2luLUVtYmVkZGVyLVBvbGljeVwiOiBcInJlcXVpcmUtY29ycFwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9XG5cbiAgaWYgKHNwbGl0VG9DaHVua3MpIHtcbiAgICBjb25zdCBuYW1lcyA9IFtdO1xuICAgIGNuZi5idWlsZCA9IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OntcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgICAgY29uc3QgcGFja2FnZU5hbWUgPSBpZC50b1N0cmluZygpLnNwbGl0KCdub2RlX21vZHVsZXMvJylbMV0uc3BsaXQoJy8nKVswXS50b1N0cmluZygpO1xuICAgICAgICAgICAgICBsZXQgaW5kZXggPSBuYW1lcy5pbmRleE9mKHBhY2thZ2VOYW1lKTtcbiAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gbmFtZXMucHVzaChwYWNrYWdlTmFtZSkgLSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBgcGFjayR7aW5kZXh9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGVmaW5lQ29uZmlnKGNuZik7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5VCxTQUFRLG9CQUFtQjtBQUNwVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxVQUFVO0FBQ2pCLFNBQVEsc0JBQXFCO0FBQzdCLFNBQVMsa0JBQWtCO0FBRTNCLFNBQVEsZUFBYztBQVB0QixJQUFNLG1DQUFtQztBQVN6QyxJQUFNLGdCQUFnQjtBQUd0QixJQUFPLHNCQUFRLENBQUMsRUFBQyxLQUFJLE1BQU07QUFDekIsUUFBTSxRQUFRLFNBQVM7QUFFdkIsUUFBTSxVQUFVO0FBQUEsSUFDZDtBQUFBLE1BQ0UsUUFBUTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ0wsU0FBUztBQUFBLFlBQ1A7QUFBQSxjQUNFO0FBQUEsY0FDQTtBQUFBLGdCQUNFLEtBQUs7QUFBQSxnQkFDTCxNQUFNO0FBQUEsZ0JBQ04sYUFBYTtBQUFBLGdCQUNiLFVBQVU7QUFBQSxnQkFDVixRQUFRO0FBQUEsY0FDVjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsSUFBSTtBQUFBLElBQ047QUFBQSxJQUNBLGNBQWM7QUFBQSxJQUNkLEtBQUs7QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFNBQVMsQ0FBQztBQUFBLFFBQ1IsS0FBSztBQUFBLFFBQ0wsTUFBTTtBQUFBLE1BQ1IsR0FBRztBQUFBLFFBQ0QsS0FBSztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1YsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0g7QUFFQSxNQUFJLENBQUMsT0FBTztBQUNWLFlBQVE7QUFBQSxNQUNOLFdBQVc7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0YsQ0FBWTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBRUEsUUFBTSxNQUFNO0FBQUEsSUFDVixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLFFBQzdCLE1BQU0sUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDaEM7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLGtCQUFrQixjQUFjO0FBQUEsSUFDNUM7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQTtBQUFBO0FBQUEsTUFHTixTQUFTO0FBQUEsUUFDUCw4QkFBOEI7QUFBQSxRQUM5QixnQ0FBZ0M7QUFBQSxNQUNsQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSSxlQUFlO0FBQ2pCLFVBQU0sUUFBUSxDQUFDO0FBQ2YsUUFBSSxRQUFRO0FBQUEsTUFDVixlQUFlO0FBQUEsUUFDYixRQUFPO0FBQUEsVUFDTCxhQUFhLElBQUk7QUFDZixnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLG9CQUFNLGNBQWMsR0FBRyxTQUFTLEVBQUUsTUFBTSxlQUFlLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTO0FBQ25GLGtCQUFJLFFBQVEsTUFBTSxRQUFRLFdBQVc7QUFDckMsa0JBQUksVUFBVSxJQUFJO0FBQ2hCLHdCQUFRLE1BQU0sS0FBSyxXQUFXLElBQUk7QUFBQSxjQUNwQztBQUNBLHFCQUFPLE9BQU8sS0FBSztBQUFBLFlBQ3JCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPLGFBQWEsR0FBRztBQUN6QjsiLAogICJuYW1lcyI6IFtdCn0K
