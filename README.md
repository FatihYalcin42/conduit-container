# Conduit Container

Containerized Conduit-style application scaffold with a frontend, a WSGI-based backend, and a PostgreSQL database.
This repository is designed for local Docker development first and can later be deployed to a cloud VM for the final submission.

## Table of Contents
- [Quickstart](#quickstart)
- [VM Deployment](#vm-deployment)
- [Overview](#overview)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)

## Quickstart
### Prerequisites
- Docker
- Docker Compose

### Setup
1. Clone the repository.
2. Copy `.env.example` to `.env`.
3. Review the values in `.env`.
4. Start the application:

```bash
docker compose up --build
```

### Open the application
- Frontend: `http://localhost:8282`
- Backend health check: `http://localhost:8000/health`
- Database health check: `http://localhost:8000/db-health`

## VM Deployment
### Prepare the server
1. Connect to the VM through SSH.
2. Clone the repository or pull the latest branch state.
3. Copy `.env.example` to `.env` on the server:

```bash
cp .env.example .env
```

### Start the stack on the VM
```bash
docker compose up --build -d
```

### Verify the deployment
```bash
docker compose ps
docker compose logs frontend
docker compose logs backend
docker compose logs db
```

### Open the deployed application
- Frontend: `http://<VM-IP>:8282`
- Backend health check: `http://<VM-IP>:8000/health`

### Notes
- `localhost:8282` works only on the machine where Docker is running.
- From your local computer, use the public VM IP instead of `localhost`.
- If the page is not reachable externally, check the VM firewall and allow port `8282/tcp`.

## Overview
The project is split into three services:
- `frontend` serves the browser UI through Nginx.
- `backend` exposes HTTP endpoints through Gunicorn and Flask.
- `db` provides PostgreSQL persistence.

The frontend reaches the backend through `/api`, so the setup stays portable between local Docker and a later VM deployment.

## Requirements
- Docker Engine with Compose support
- A modern browser
- Free local ports for:
  - `8282` for the frontend
  - `8000` for the backend
  - `5432` for PostgreSQL

## Project Structure
```text
.
├── backend/
│   ├── app/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── wsgi.py
├── frontend/
│   ├── public/
│   ├── scripts/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf.template
│   └── package.json
├── docker-compose.yaml
└── .env.example
```

## Usage
### Start the stack
```bash
docker compose up --build
```

### Stop the stack
```bash
docker compose down
```

### Rebuild after configuration or code changes
```bash
docker compose up --build
```

### Update the VM after new commits
```bash
git pull
docker compose up --build -d
```

### View logs
```bash
docker compose logs frontend
docker compose logs backend
docker compose logs db
```

### Save logs to a file
```bash
docker logs <container-name> > my-container-logs.txt
```

### What you should see
- The frontend page should load on port `8282`.
- The `Backend Health` card should show `Online`.
- The `Database Health` card should show `Online`.

## API Reference
### `GET /health`
Returns the backend service status and environment.

Example response:
```json
{
  "environment": "development",
  "service": "conduit-backend",
  "status": "ok"
}
```

### `GET /db-health`
Checks whether the backend can connect to PostgreSQL.

Example response:
```json
{
  "database": {
    "database_name": "conduit",
    "version": "PostgreSQL ..."
  },
  "status": "ok"
}
```

## Environment Variables
All relevant runtime values are centralized through `.env` and reused by Docker Compose, the backend container, and the frontend build configuration.

- `APP_NAME`: Backend service name shown in the health response
- `APP_ENV`: Runtime environment label such as `development`
- `APP_HOST`: Backend bind host
- `BACKEND_PORT`: Backend container and host port
- `FRONTEND_PORT`: Frontend host port
- `POSTGRES_DB`: PostgreSQL database name
- `POSTGRES_USER`: PostgreSQL username
- `POSTGRES_PASSWORD`: PostgreSQL password
- `POSTGRES_HOST`: PostgreSQL host name inside Docker
- `POSTGRES_PORT`: PostgreSQL host/container port mapping
- `POSTGRES_SSLMODE`: PostgreSQL SSL mode
- `API_BASE_URL`: Frontend API base path, default `/api`
- `GUNICORN_WORKERS`: Number of Gunicorn workers
