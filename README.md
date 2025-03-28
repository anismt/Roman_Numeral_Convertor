# Adobe GenStudio Engineering Test – Roman Numeral Converter

This full-stack project converts whole numbers (1–3999) into Roman numerals via a RESTful API with a React UI built using Adobe Spectrum.

🧱 Tech Stack
Backend: FastAPI (Python)

Frontend: React + TypeScript + Adobe Spectrum

Containerized: Docker + Docker Compose

🚀 How to Run
Clone this repo

Run: docker compose up --build

Frontend: http://localhost:3000
Backend: http://localhost:8080/romannumeral?query=123

📊 Observability
Logs: Python logging module

Metrics: Prometheus /metrics endpoint

Tracing: [Optional: OpenTelemetry or manual logging]

✅ Testing
Run backend tests with: pytest