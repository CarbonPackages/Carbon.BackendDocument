module.exports = {
    plugins: {
        "postcss-nested": true,
        autoprefixer: true,
        cssnano: {
            preset: ["default", { discardComments: { removeAll: true } }],
        },
    },
};
