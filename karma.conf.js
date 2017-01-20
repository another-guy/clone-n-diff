module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts" },
            { pattern: "testing/**/*.ts" }
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"],
        },
        reporters: [
            "dots",
            "progress",
            "karma-typescript"
        ],
        browsers: ["Chrome"]
    });
};