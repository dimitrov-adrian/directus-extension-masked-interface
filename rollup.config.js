import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import rollupJson from "@rollup/plugin-json";
import vue from "rollup-plugin-vue";

export default {
	input: "src/index.js",
	output: {
		format: "es",
		file: "dist/extensions/interfaces/masked-input/index.js"
	},
	plugins: [terser(), resolve(), commonjs(), rollupJson(), vue()]
};
