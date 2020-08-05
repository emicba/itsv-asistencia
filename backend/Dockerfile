FROM python:3.8-alpine
EXPOSE 8000
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ADD requirements.txt .
RUN apk update && \
  apk add mariadb-dev gcc musl-dev --no-cache --quiet
RUN python -m pip install -r requirements.txt
RUN apk del gcc musl-dev
WORKDIR /app
ADD . /app
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi"]