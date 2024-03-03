// vite.config.ts
import { defineConfig } from "file:///Users/gomap/space/project/fireballs-react/node_modules/vite/dist/node/index.js";
import react from "file:///Users/gomap/space/project/fireballs-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///Users/gomap/space/project/fireballs-react/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgr from "file:///Users/gomap/space/project/fireballs-react/node_modules/vite-plugin-svgr/dist/index.js";
import { viteStaticCopy } from "file:///Users/gomap/space/project/fireballs-react/node_modules/vite-plugin-static-copy/dist/index.js";
import { obfuscator } from "file:///Users/gomap/space/project/fireballs-react/node_modules/rollup-obfuscator/dist/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/gomap/space/project/fireballs-react";
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
    plugins
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ29tYXAvc3BhY2UvcHJvamVjdC9maXJlYmFsbHMtcmVhY3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9nb21hcC9zcGFjZS9wcm9qZWN0L2ZpcmViYWxscy1yZWFjdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZ29tYXAvc3BhY2UvcHJvamVjdC9maXJlYmFsbHMtcmVhY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCB7dml0ZVN0YXRpY0NvcHl9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5JztcbmltcG9ydCB7IG9iZnVzY2F0b3IgfSBmcm9tICdyb2xsdXAtb2JmdXNjYXRvcic7XG5pbXBvcnQgT3B0aW9ucyBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQge3Jlc29sdmV9IGZyb20gXCJwYXRoXCI7XG5cbmNvbnN0IHNwbGl0VG9DaHVua3MgPSB0cnVlO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgKHttb2RlfSkgPT4ge1xuICBjb25zdCBpc0RldiA9IG1vZGUgPT09ICdkZXZlbG9wbWVudCc7XG5cbiAgY29uc3QgcGx1Z2lucyA9IFtcbiAgICByZWFjdChcbiAgICAgIGlzRGV2ID8ge1xuICAgICAgICBiYWJlbDoge1xuICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgXCJiYWJlbC1wbHVnaW4tc3R5bGVkLWNvbXBvbmVudHNcIixcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNzcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHVyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtaW5pZnk6IGZhbHNlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICB9IDogdW5kZWZpbmVkXG4gICAgKSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgc3ZncigpLFxuICAgIHZpdGVTdGF0aWNDb3B5KHtcbiAgICAgIHRhcmdldHM6IFt7XG4gICAgICAgIHNyYzogJ25vZGVfbW9kdWxlcy9tYXAtZm9udHMvKicsXG4gICAgICAgIGRlc3Q6ICdtYXAtc3R5bGVzL2ZvbnRzJ1xuICAgICAgfSwge1xuICAgICAgICBzcmM6ICdub2RlX21vZHVsZXMvbWFwYm94LWdsL2Rpc3QvbWFwYm94LWdsLWNzcC13b3JrZXIuanMnLFxuICAgICAgICBkZXN0OiAnLicsXG4gICAgICAgIHJlbmFtZTogJ3dvcmtlci5qcydcbiAgICAgIH1dXG4gICAgfSlcbiAgXTtcblxuICBpZiAoIWlzRGV2KSB7XG4gICAgcGx1Z2lucy5wdXNoKFxuICAgICAgb2JmdXNjYXRvcih7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBvcHRpb25zUHJlc2V0OiAnaGlnaC1vYmZ1c2NhdGlvbidcbiAgICAgICAgfVxuICAgICAgfSBhcyBPcHRpb25zKVxuICAgIClcbiAgfVxuXG4gIGNvbnN0IGNuZiA9IHtcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAgICd+QCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2lucyxcbiAgfVxuXG4gIGlmIChzcGxpdFRvQ2h1bmtzKSB7XG4gICAgY29uc3QgbmFtZXMgPSBbXTtcbiAgICBjbmYuYnVpbGQgPSB7XG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDp7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBhY2thZ2VOYW1lID0gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbmFtZXMuaW5kZXhPZihwYWNrYWdlTmFtZSk7XG4gICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IG5hbWVzLnB1c2gocGFja2FnZU5hbWUpIC0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gYHBhY2ske2luZGV4fWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlZmluZUNvbmZpZyhjbmYpO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1QsU0FBUSxvQkFBbUI7QUFDM1UsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sVUFBVTtBQUNqQixTQUFRLHNCQUFxQjtBQUM3QixTQUFTLGtCQUFrQjtBQUUzQixTQUFRLGVBQWM7QUFQdEIsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTSxnQkFBZ0I7QUFHdEIsSUFBTyxzQkFBUSxDQUFDLEVBQUMsS0FBSSxNQUFNO0FBQ3pCLFFBQU0sUUFBUSxTQUFTO0FBRXZCLFFBQU0sVUFBVTtBQUFBLElBQ2Q7QUFBQSxNQUNFLFFBQVE7QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNMLFNBQVM7QUFBQSxZQUNQO0FBQUEsY0FDRTtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxLQUFLO0FBQUEsZ0JBQ0wsTUFBTTtBQUFBLGdCQUNOLGFBQWE7QUFBQSxnQkFDYixVQUFVO0FBQUEsZ0JBQ1YsUUFBUTtBQUFBLGNBQ1Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLElBQUk7QUFBQSxJQUNOO0FBQUEsSUFDQSxjQUFjO0FBQUEsSUFDZCxLQUFLO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixTQUFTLENBQUM7QUFBQSxRQUNSLEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxNQUNSLEdBQUc7QUFBQSxRQUNELEtBQUs7QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNWLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNIO0FBRUEsTUFBSSxDQUFDLE9BQU87QUFDVixZQUFRO0FBQUEsTUFDTixXQUFXO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxlQUFlO0FBQUEsUUFDakI7QUFBQSxNQUNGLENBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUVBLFFBQU0sTUFBTTtBQUFBLElBQ1YsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxRQUM3QixNQUFNLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ2hDO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBRUEsTUFBSSxlQUFlO0FBQ2pCLFVBQU0sUUFBUSxDQUFDO0FBQ2YsUUFBSSxRQUFRO0FBQUEsTUFDVixlQUFlO0FBQUEsUUFDYixRQUFPO0FBQUEsVUFDTCxhQUFhLElBQUk7QUFDZixnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLG9CQUFNLGNBQWMsR0FBRyxTQUFTLEVBQUUsTUFBTSxlQUFlLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTO0FBQ25GLGtCQUFJLFFBQVEsTUFBTSxRQUFRLFdBQVc7QUFDckMsa0JBQUksVUFBVSxJQUFJO0FBQ2hCLHdCQUFRLE1BQU0sS0FBSyxXQUFXLElBQUk7QUFBQSxjQUNwQztBQUNBLHFCQUFPLE9BQU8sS0FBSztBQUFBLFlBQ3JCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPLGFBQWEsR0FBRztBQUN6QjsiLAogICJuYW1lcyI6IFtdCn0K
