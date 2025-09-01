# Deploying to Render

This repository contains two parts:
- `frontend/` — Vite + React app (build outputs to `frontend/dist`).
- `server/` — Express API (runs `server/src/index.js`).

render.yaml is provided for a two-service setup:
- Static site: builds `frontend` and publishes `frontend/dist`.
- Web service: runs `server` with `npm start`.

Steps:
1. On Render, create a new service and choose GitHub repo; or push this repo and import.
2. Use the provided `render.yaml` for automatic service creation.
3. Set environment variables in Render Dashboard (MONGO_URI, JWT_SECRET).
4. If the Mongo credentials were ever exposed, rotate them in MongoDB Atlas.

Notes:
- The server will try to serve the frontend if `server/frontend/dist` exists — useful for single-service deploys.
- Keep real secrets out of the repo; use Render environment variables or a secrets manager.
- See [SECURITY.md](./SECURITY.md) for security guidelines and audit information.