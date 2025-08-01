FROM python:3.13-slim

RUN apt-get update && apt-get install -y \
  gcc \
  python3-dev \
  libffi-dev \
  && rm -rf /var/lib/apt/lists/*

COPY . /app

WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "controller.main:app", "--host", "0.0.0.0", "--port", "8000"]