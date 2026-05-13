import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/glace-dashboard.js",
  output: {
    file: "dist/glace-dashboard.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [resolve(), terser()],
};
