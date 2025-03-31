// Import required packages
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 8080;

// Setup CORS to allow cross-origin requests (for React frontend)
app.use(cors());

// Log all incoming HTTP requests
app.use(morgan("dev"));

// -----------------------------
// Prometheus Metrics Setup
// -----------------------------

// Create a registry and enable default metrics (CPU, memory, etc.)
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Expose metrics at /metrics endpoint
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// -----------------------------
// Roman Numeral Conversion Logic
// -----------------------------

// Converts a number (1–3999) into Roman numeral string
function toRoman(num) {
  if (num < 1 || num > 3999) return null;

  const map = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];

  let result = "";
  for (let [value, numeral] of map) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

// -----------------------------
// API Route: /romannumeral
// -----------------------------

// Example: GET /romannumeral?query=2024
app.get("/romannumeral", (req, res) => {
  const query = parseInt(req.query.query);

  // Validate input range
  if (!query || isNaN(query) || query < 1 || query > 3999) {
    return res.status(400).send("Invalid input. Must be between 1 and 3999.");
  }

  // Convert and respond
  const output = toRoman(query);
  res.json({ input: query.toString(), output });
});

// -----------------------------
// Start Server (when not in test mode)
// -----------------------------

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

// Export app for testing
module.exports = app;
