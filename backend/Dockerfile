FROM python:3.12-slim AS builder

WORKDIR /app

ARG APP_PORT=8000

ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3.12-slim

WORKDIR /app

ARG APP_PORT=8000

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV APP_HOST=0.0.0.0
ENV APP_PORT=${APP_PORT}
ENV GUNICORN_WORKERS=2

COPY --from=builder /install /usr/local
COPY . .

EXPOSE ${APP_PORT}

CMD ["sh", "-c", "gunicorn --workers ${GUNICORN_WORKERS} --bind ${APP_HOST}:${APP_PORT} wsgi:app"]
