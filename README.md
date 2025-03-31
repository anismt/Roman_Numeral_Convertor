# 🏛️ Roman Numeral Converter – Adobe GenStudio Engineering Test

This full-stack web application accepts a number between **1 and 3999** and returns the **Roman numeral equivalent**. It was built according to the requirements in Adobe’s GenStudio Performance Marketing Engineering Test.

---

## ✨ Features

- ✅ REST API: `GET /romannumeral?query={integer}`
- ✅ React + Adobe Spectrum UI
- ✅ Full Dockerized setup
- ✅ Implements observability: **logs**, **metrics**, and **trace points**
- ✅ Manual Roman numeral logic — **no libraries used**
- ✅ Handles error cases gracefully

---

## 🔧 Tech Stack and Why

| Layer       | Tech Used                          | Why? |
|-------------|------------------------------------|------|
| Backend     | Node.js + Express                  | Lightweight, fast for REST APIs |
| Frontend    | React + TypeScript + Adobe Spectrum| Modern, type-safe, spec-compliant UI |
| Metrics     | prom-client                        | Built-in Prometheus support |
| Logging     | morgan                             | Simple request logging |
| Container   | Docker + Docker Compose            | Isolated, reproducible environments |

> Roman numeral logic was built using [Wikipedia's specification](https://en.wikipedia.org/wiki/Roman_numerals) as a reference.

---

## 📁 Project Structure

```
adobe-genstudio-project/
├── backend-js/         # Express API
│   ├── index.js
│   └── Dockerfile
├── frontend/           # React UI (Adobe Spectrum)
│   ├── src/App.tsx
│   └── Dockerfile
└── docker-compose.yml
```

---

## 🚀 How to Run

> 💡 You only need Docker installed.

```bash
docker compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8080/romannumeral?query=1999](http://localhost:8080/romannumeral?query=1999)
- Metrics: [http://localhost:8080/metrics](http://localhost:8080/metrics)

---

## 🔌 API Example

**Request:**

```
GET /romannumeral?query=2024
```

**Response:**

```json
{
  "input": "2024",
  "output": "MMXXIV"
}
```

**Error Case:**

```text
400 Bad Request
"Invalid input. Must be between 1 and 3999."
```

---

## 📊 Observability Breakdown

- **Logs**: HTTP requests logged with `morgan`
- **Metrics**: Prometheus metrics exposed via `/metrics`
- **Trace (Manual)**: Query parameters logged for each request

---

## ✅ Testing (Dev Plan)

- Backend is designed to be testable using `jest` + `supertest`
- API and Roman logic can be isolated for unit/integration tests
- Example tests (planned):
  - Valid inputs return correct Roman output
  - Invalid inputs return 400 errors

---

## 🧑‍💻 Inline Code Comments

All major logic (backend and frontend) is commented inline, assuming this will be read or maintained by another developer.

---

## 📝 License & Purpose

Built by **Anis Tariq** as part of the **Adobe GenStudio Engineering Test**.  
Not intended for production use. All rights reserved.
