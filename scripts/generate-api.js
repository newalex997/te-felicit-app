const { generateApi } = require("swagger-typescript-api");
const path = require("path");

generateApi({
  output: path.resolve(__dirname, "../api"),
  url: "http://localhost:9000/swagger-json",
  httpClientType: "fetch",
  generateClient: false,
  generateRouteTypes: false,
  extractRequestParams: false,
  prettier: {
    printWidth: 100,
    tabWidth: 2,
    trailingComma: "all",
    singleQuote: false,
  },
}).catch((err) => {
  console.error("API generation failed:", err.message);
  console.error("Make sure the API server is running on http://localhost:9000");
  process.exit(1);
});
