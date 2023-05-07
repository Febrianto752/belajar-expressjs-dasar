export default {
  collectCoverage: true,
  coverageProvider: "v8",
  // collectCoverageFrom: ["src/**/*.{js,jsx}", "vendor/**/*.{js,jsx}"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  verbose: true,
};
