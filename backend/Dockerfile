FROM python:3.8-alpine
EXPOSE 8000
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ADD requirements.txt .
RUN python -m pip install -r requirements.txt
WORKDIR /app
ADD . /app
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi"]