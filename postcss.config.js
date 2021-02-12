module.exports = {
    plugins: {
        "postcss-nested": true,
        autoprefixer: true,
        cssnano: {
            preset: ["default", { mergeRules: false, discardComments: { removeAll: true } }],
        },
    },
};
