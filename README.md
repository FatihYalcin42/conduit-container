# Conduit Container

## Table of Contents
- [Overview](#overview)
- [Repository Structure](#repository-structure)
- [Quickstart](#quickstart)
- [Usage](#usage)
- [Environment Variables](#environment-variables)

## Overview
This repository contains the containerized structure for a Conduit-style application.
It is split into a backend service, a frontend service, and a PostgreSQL database service.

## Repository Structure
```text
.
├── backend
│   ├── app
│   ├── Dockerfile
│   ├── requirements.txt
│   └── wsgi.py
├── frontend
│   ├── public
│   ├── src
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── docs
├── docker-compose.yaml
└── .env.example
```

## Quickstart
### Prerequisites
- Docker
- Docker Compose

### Start
1. Copy `.env.example` to `.env`.
2. Review the environment variables.
3. Run `docker compose up --build`.

## Usage
The current files provide the initial project skeleton only.
You can replace the placeholder backend and frontend implementations with the final application code.
Adjust ports, build steps, runtime commands, and service configuration as needed for the final submission.

## Environment Variables
- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `BACKEND_PORT`
- `FRONTEND_PORT`
- `API_BASE_URL`

