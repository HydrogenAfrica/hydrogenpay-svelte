import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
const pkg = require("./package.json");
export default {
    input: "src/lib/hydrogenPaySvelte.svelte",
    output: [
        { file: pkg.module, format: "es" },
        { file: pkg.main, format: "umd", name: "Name" },
    ],
    plugins: [svelte(), resolve()],
};
