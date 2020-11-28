FROM python:3.8-alpine
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY requirements.txt .
RUN apk update && \
    apk add mariadb-dev gcc musl-dev --no-cache --quiet
RUN python -m pip install -r requirements.txt
RUN apk del gcc musl-dev
COPY . ./
EXPOSE 8000
ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
