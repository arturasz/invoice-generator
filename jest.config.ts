module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts",
        "!**/vendor/**",
    ],
    coverageDirectory: "coverage",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": [
            "babel-jest",
            { configFile: "./babel.config.testing.js" },
        ],
    },

    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/coverage",
        "package.json",
        "package-lock.json",
        "reportWebVitals.ts",
        "setupTests.ts",
        "index.tsx",
    ],
    // setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
