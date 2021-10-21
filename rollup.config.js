import path from "path";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";

const filenames = ["Document.pcss", "Editable.pcss", "Editable.js"];

module.exports = filenames.map((filename) => {
    const baseFilename = filename.substring(0, filename.lastIndexOf("."));
    const isCSS = filename.endsWith(".pcss");
    const targetType = isCSS ? "css" : "js";
    const inputFilename = path.join("Resources/Private/Assets", filename);
    const outputFilename = path.join("Resources/Public", `${baseFilename}.${targetType}`);

    return {
        input: inputFilename,
        watch: {
            include: "Resources/Private/**",
        },
        onwarn: (warning, warn) => {
            if (warning.code === "FILE_NAME_CONFLICT" && isCSS) {
                return;
            }
            warn(warning);
        },
        plugins: [
            resolve({
                module: true,
                jsnext: true,
                preferBuiltins: false,
            }),
            babel({
                exclude: "node_modules/**",
                babelHelpers: "bundled",
            }),
            terser({
                output: {
                    comments: false,
                },
            }),
            postcss({
                extract: isCSS,
                sourceMap: false,
            }),
        ],
        output: {
            sourcemap: false,
            file: outputFilename,
            format: "iife",
            name: baseFilename,
        },
    };
});
