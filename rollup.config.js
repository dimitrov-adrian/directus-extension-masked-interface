// Need custom rollup until, get official support for rollup JSON
// in @directus/extension-sdk

import rollupJson from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import styles from "rollup-plugin-styles";
import vue from "rollup-plugin-vue";
import { APP_SHARED_DEPS } from "@directus/shared/constants";
import packageJson from "./package.json";

export default {
	input: packageJson["directus:extension"].source,
	output: {
		format: "es",
		file: packageJson["directus:extension"].path,
	},
	external: APP_SHARED_DEPS,
	plugins: [
		vue({ preprocessStyles: true }),
		styles(),
		nodeResolve(),
		commonjs({ esmExternals: true, sourceMap: false }),
		//terser(),
		rollupJson(),
	],
};
